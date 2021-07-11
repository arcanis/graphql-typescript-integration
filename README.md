# graphql-typescript-integration

This package is a [preset](https://www.graphql-code-generator.com/docs/presets/presets-index) for [graphql-code-generator](https://www.graphql-code-generator.com/). It automatically generates TypeScript definitions for your GraphQL queries and injects the plumbing required to make the gql queries work at runtime. It can be seen as an alternative to [graphql-let](https://github.com/piglovesyou/graphql-let).

## Features

- You can (should) keep your GraphQL queries and mutations within your `.tsx` files, close from the components that will use them. However, unlike typical GraphQL type generations, you don't need to separately import the typed operations - they'll be transparently returned by the `gql(...)` function calls.

- You don't have to bother using unique fragment, query, and mutation names for each file; the preset will automatically hash them if needed. You can still share specific queries with multiple files by simply exporting it from a file that can be imported from (like you would with any other helper function).

- Integrated with graphql-code-generator, so you can generate other files, benefit from watch mode, etc.

## Why?

I was a bit frustrated to have to import my typed GraphQL hooks from another file, and to leave my `gql` definitions dangling:

```ts
import {useFoo} from './generated-hooks';

gql`
  query Foo {
    bar
  }
`;
```

So this tool lets you write the same thing, but in a single statement:

```ts
const {Foo} = gql(`#graphql
  query Foo {
    bar
  }
`);
```

I also didn't like that each operation had to be uniquely named not only within the same file, but also within the whole app - it felt like a step backward from encapsulation. This is addressed by hashing the operation names under the hood (cf the [generated output](https://github.com/arcanis/graphql-typescript-integration/blob/19a2e6b1f8949f12ab6e5120e002a30f79dbda41/demo/gql/index.ts#L4-L9)).

Finally, I wanted something relatively easy to setup and maintain because I don't have that much time 😛

## Install

1. Install the dependencies:

```
yarn add -D graphql-code-generator graphql-typescript-integration @graphql-typed-document-node/core
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
    # Needed to workaround a graphql-code-generator limitation
    plugins:
      - graphql-typescript-integration/empty
```

## Usage

You can import the `gql` function from the generated folder. For instance, assuming your output folder is a subfolder named "gql":

```ts
import {gql} from './gql';

const {GetTweets, CreateTweet} = gql(`#graphql
  query GetTweets {
    Tweets {
      id
    }
  }

  mutation CreateTweet {
    CreateTweet(body: "Hello") {
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

- ~~You can't use fragments. I don't use them at the moment, so I haven't looked into them. However, given that queries are properly typed, you'll know when you're passing incomplete data around, which will let you add the missing fields to your queries. Not exactly like fragments, but still a decent workaround.~~

  - You can now use fragments, as long as they're in the same file as the operations that use them. Note that this limitation is temporary, it's just that I haven't needed to use cross-files fragment so far.

- You must use the `const query = gql(...);` syntax (not the typical tagged template ``const query = gql`...`;`` one). This is because TypeScript isn't currently smart enough to forward tagged template parameters as their literal types (https://github.com/microsoft/TypeScript/issues/29432).

- You should indicate `#graphql` right after opening the GraphQL source literal (right after the opening quote, before even any line return). This is because otherwise vscode-graphql won't recognize the string as being GraphQL and won't highlight it (they don't detect `gql` statements when used as regular function calls, unlike graphql-code-generator).

- A contrario, you must **not** use the `/* GraphQL */` magic comment inside the `gql(...)` function call. This is because [graphql-tag-pluck](https://www.graphql-tools.com/docs/graphql-tag-pluck/), the tool extracting these calls, has a bug and will register the document twice - which brings us to the final limitation:

- You can only have a single `gql(...)` function call per file. This is because graphql-tag-pluck concatenates all documents from a single file into a single one, with no way to split them back. As a result we end up generating a `gql` overload for the composite query, instead of one for each individual document. It's however not a huge deal - just define multiple queries / mutations within the same `gql` call, and use destructuring to access them individually (cf example in the "Usage" section).

## License (MIT)

> **Copyright © 2021 Mael Nison**
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
