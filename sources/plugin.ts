import {PluginFunction}       from '@graphql-codegen/plugin-helpers';

import {SourceWithOperations} from './processSources';

const SUFFIXES = new Map([
  [`OperationDefinition`, `Document`],
  [`FragmentDefinition`, `FragmentDoc`],
] as const);

export const plugin: PluginFunction<{
  sourcesWithOperations: Array<SourceWithOperations>;
}> = (schema, sources, {sourcesWithOperations}) => [
  `import * as graphql from './graphql';\n`,
  `\n`,
  ...getDocumentRegistryChunk(sourcesWithOperations),
  `\n`,
  ...getGqlOverloadChunk(sourcesWithOperations),
  `\n`,
  `export function gql(source: string): unknown;\n`,
  `export function gql(source: string) {\n`,
  `  return (documents as any)[source] ?? {};\n`,
  `}\n`,
].join(``);

function getDocumentRegistryChunk(sourcesWithOperations: Array<SourceWithOperations>) {
  const lines: Array<string> = [];
  lines.push(`const documents = {\n`);

  for (const {source: {rawSDL}, operations} of sourcesWithOperations) {
    lines.push(`  ${JSON.stringify(rawSDL!)}: {\n`);

    for (const {initialName, uniqueName, definition} of operations)
      lines.push(`    ${initialName}: graphql.${uniqueName}${SUFFIXES.get(definition.kind)},\n`);


    lines.push(`  },\n`);
  }

  lines.push(`};\n`);

  return lines;
}

function getGqlOverloadChunk(sourcesWithOperations: Array<SourceWithOperations>) {
  const lines: Array<string> = [];

  // We intentionally don't use a <T extends keyof typeof documents> generic, because TS
  // would print very long `gql` function signatures (duplicating the source).
  for (const {source: {rawSDL}} of sourcesWithOperations)
    lines.push(`export function gql(source: ${JSON.stringify(rawSDL!)}): (typeof documents)[${JSON.stringify(rawSDL!)}];\n`);

  return lines;
}
