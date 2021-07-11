/* eslint-disable */
import * as graphql from './graphql';

const documents = {
  "#graphql\n  fragment TweetFragment on Tweet {\n    id\n  }\n\n  query Foo {\n    Tweets {\n      ...TweetFragment\n    }\n  }\n\n  query Bar {\n    Tweets {\n      ...TweetFragment\n      body\n    }\n  }\n": {
    TweetFragment: graphql.TweetFragment_Xc_FragmentDoc,
    Foo: graphql.Foo_Xc_Document,
    Bar: graphql.Bar_Xc_Document,
  },
};

export function gql(source: "#graphql\n  fragment TweetFragment on Tweet {\n    id\n  }\n\n  query Foo {\n    Tweets {\n      ...TweetFragment\n    }\n  }\n\n  query Bar {\n    Tweets {\n      ...TweetFragment\n      body\n    }\n  }\n"): (typeof documents)["#graphql\n  fragment TweetFragment on Tweet {\n    id\n  }\n\n  query Foo {\n    Tweets {\n      ...TweetFragment\n    }\n  }\n\n  query Bar {\n    Tweets {\n      ...TweetFragment\n      body\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
