# graphql-typescript-integration

This package is a [preset](https://www.graphql-code-generator.com/docs/presets/presets-index) for [graphql-code-generator](https://www.graphql-code-generator.com/). It automatically generates TypeScript definitions for your GraphQL queries and injects the plumbing required to make the gql queries work at runtime. It can be seen as an alternative to [graphql-let](https://github.com/piglovesyou/graphql-let).

## Features

- You can directly use the result of the `gql(...)` function call, which will be correctly typed and will return the compiled documents.

- You can use the same query name in different files. Graphtype will automatically hash and deduplicate them.

- Integrated with graphql-code-generator, so you can generate other files, benefit from watch mode, etc.

## Install

1. Install the dependencies:

```
yarn add -D graphql-code-generator graphql-typescript-integration
```

2. Setup your code generator in `codegen.yml`:

```yaml
# Classic graphql-code-generator config. Check their documentation:
# https://www.graphql-code-generator.com/docs/getting-started/codegen-config

# Important!
pluckConfig:
  skipIndent: true

generates:
  ./folder/where/to/generate/types/:
    preset: graphql-typescript-integration
    presetConfig:
      packageName: "@app/gql"
    # Needed to workaround a graphql-code-generator limitation
    plugins:
      - graphql-typescript-integration/empty
```

## Usage

You can import the `gql` function from the generated folder. For instance, assuming your output folder is a subfolder named "gql":

```ts
import {gql} from './gql';

const {Foo} = gql(`#graphql
  query Foo {
    Tweets {
      id
    }
  }
`);
```

If you want to avoid having to refer to the output folder from a relative path, you can easily configure Yarn to do so:

```
yarn add @app/gql@link:./gql
```

This would let you do `import {gql} from '@app/gql'` from anywhere in your codebase.

## Limitations

- You can't use fragments. I don't use them at the moment, so I haven't looked into them. However, given that queries are properly typed, you'll know when you're passing incomplete data around, which will let you add the missing fields to your queries. Not exactly like fragments, but still a decent workaround at no cost.

- You must use the `const query = gql(...);` syntax (not the ``const query = gql`...`;`` one). This is because TypeScript isn't currently smart enough to pass forward tagged template parameters as their literal types (https://github.com/microsoft/TypeScript/issues/29432).

- You should indicate `#graphql` right after opening the GraphQL source literal (right after the opening quote, before even any line return). This is because otherwise vscode-graphql won't recognize the string as being GraphQL (they don't detect `gql` statements when used as regular function calls, unlike graphql-code-generator).

- You can only have a single `gql(...)` function call per file. This is because `graphql-tag-pluck`, the tool extracting these calls, concatenates all documents from a single file into a single one. As a result we end up generating a `gql` overload for the composite query, instead of one for each individual document.

## License (MIT)

> **Copyright © 2021 Mael Nison**
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
