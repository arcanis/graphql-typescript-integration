import type {Source}                                                                                                                         from '@graphql-tools/utils';
import crypto                                                                                                                                from 'crypto';
import {DocumentNode, FragmentDefinitionNode, GraphQLObjectType, GraphQLSchema, OperationDefinitionNode, TypeInfo, visit, visitWithTypeInfo} from 'graphql';

export type Operation = {
  initialName: string;
  uniqueName: string;
  definition: OperationDefinitionNode | FragmentDefinitionNode;
};

export type SourceWithOperations = {
  source: Source;
  operations: Array<Operation>;
};

// Graphile automatically adds `id` fields to the top-level types
const DISABLED_AUTO_ID_TYPES = new Set([
  `Mutation`,
  `Query`,
  `Subscription`,
]);

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
const makeWriteable = <T>(val: T): Writeable<T> => val as any;

export function processSources(sources: Array<Source>, {schema}: {schema: GraphQLSchema}) {
  const typeInfo = new TypeInfo(schema);

  const fullHashes = new Map<string, Source>();
  const filteredSources: Array<Source> = [];

  for (const source of sources) {
    if (!source)
      continue;

    const hash = crypto.createHash(`sha256`).update(source.rawSDL!).digest(`hex`);
    if (fullHashes.has(hash))
      continue;

    fullHashes.set(hash, source);
    filteredSources.push(source);
  }

  let hashLength = 0;

  findHashSize:
  for (let t = 1; t <= 32; ++t) {
    const seen = new Set<string>();
    for (const hash of fullHashes.keys()) {
      const sub = hash.substr(0, t);
      if (seen.has(sub)) {
        continue findHashSize;
      } else {
        seen.add(sub);
      }
    }

    hashLength = t;
    break;
  }

  const subHashes = new Map<string, Source>();
  for (const [hash, record] of fullHashes)
    subHashes.set(hash.substr(0, hashLength), record);

  const sourcesWithOperations: Array<SourceWithOperations> = [];

  for (const [hash, source] of subHashes) {
    const {document} = source;
    if (!document)
      continue;

    const operations: Array<Operation> = [];
    const remappedFragments = new Map<string, string>();

    for (const definition of document.definitions ?? []) {
      if (!definition)
        continue;

      if (definition.kind !== `OperationDefinition` && definition.kind !== `FragmentDefinition`)
        continue;

      if (definition.name?.kind !== `Name`)
        continue;

      // The leading 'X' in front of the hash is to prevent graphql-code-generator
      // from accidentally uppercasing the first letter of the hash.
      const initialName = definition.name.value;
      const uniqueName = `${initialName}_X${hash}_`;
      makeWriteable(definition.name).value = uniqueName;

      if (definition.kind === `FragmentDefinition`)
        remappedFragments.set(initialName, uniqueName);

      operations.push({
        initialName,
        uniqueName,
        definition,
      });
    }

    if (operations.length === 0)
      continue;

    visit(document!, visitWithTypeInfo(typeInfo, {
      SelectionSet: node => {
        const type = typeInfo.getParentType();
        if (!(type instanceof GraphQLObjectType))
          return;

        if (DISABLED_AUTO_ID_TYPES.has(type.name))
          return;

        const fields = type.getFields();
        if (!Object.prototype.hasOwnProperty.call(fields, `id`))
          return;

        makeWriteable(node.selections).push({
          kind: `Field`,
          name: {
            kind: `Name`,
            value: `id`,
          },
        });
      },

      FragmentSpread: node => {
        const initialName = node.name.value;
        const uniqueName = remappedFragments.get(initialName);

        if (typeof uniqueName !== `undefined`) {
          makeWriteable(node.name).value = uniqueName;
        }
      },
    }));

    sourcesWithOperations.push({
      source,
      operations,
    });
  }

  return sourcesWithOperations;
}
