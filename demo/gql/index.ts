/* eslint-disable */
import * as graphql from './graphql';

const documents = {
  "#graphql\n  query Foo {\n    Tweets {\n      id\n    }\n  }\n\n  query Bar {\n    Tweets {\n      id\n      body\n    }\n  }\n": {
    Foo: graphql.Foo_X9_Document,
    Bar: graphql.Bar_X9_Document,
  },
};

export function gql(source: "#graphql\n  query Foo {\n    Tweets {\n      id\n    }\n  }\n\n  query Bar {\n    Tweets {\n      id\n      body\n    }\n  }\n"): (typeof documents)["#graphql\n  query Foo {\n    Tweets {\n      id\n    }\n  }\n\n  query Bar {\n    Tweets {\n      id\n      body\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
