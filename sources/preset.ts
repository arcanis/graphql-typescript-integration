import * as addPlugin                 from '@graphql-codegen/add';
import {Types}                        from '@graphql-codegen/plugin-helpers';
import * as typedDocumentNodePlugin   from '@graphql-codegen/typed-document-node';
import * as typescriptOperationPlugin from '@graphql-codegen/typescript-operations';
import * as typescriptPlugin          from '@graphql-codegen/typescript';

import * as dtsGenPlugin              from './plugin';
import {processSources}               from './processSources';

export const preset: Types.OutputPreset<{
  packageName: string;
}> = {
  buildGeneratesSection: options => {
    if (!options?.config?.pluckConfig?.skipIndent)
      throw new Error(`Configuration error: When using graphql-typescript-integration, you must set the "skipIndent" setting to true inside the "pluckConfig" root field.`);

    const packageName = options.presetConfig.packageName ?? `@app/gql`;

    const sourcesWithOperations = processSources(options.documents);
    const sources = sourcesWithOperations.map(({source}) => source);

    const pluginMap = {
      ...options.pluginMap,
      [`add`]: addPlugin,
      [`typescript`]: typescriptPlugin,
      [`typescript-operations`]: typescriptOperationPlugin,
      [`typed-document-node`]: typedDocumentNodePlugin,
      [`gen-dts`]: dtsGenPlugin,
    };

    const plugins = [
      {[`add`]: {content: `/* eslint-disable */`}},
      {[`typescript`]: {}},
      {[`typescript-operations`]: {}},
      {[`typed-document-node`]: {}},
      ...options.plugins,
    ];

    const genDtsPlugins = [
      {[`gen-dts`]: {sourcesWithOperations, packageName}},
    ];

    return [{
      filename: `${options.baseOutputDir}/graphql.ts`,
      plugins,
      pluginMap,
      schema: options.schema,
      config: options.config,
      documents: sources,
    }, {
      filename: `${options.baseOutputDir}/index.ts`,
      plugins: genDtsPlugins,
      pluginMap,
      schema: options.schema,
      config: options.config,
      documents: sources,
    }];
  },
};
