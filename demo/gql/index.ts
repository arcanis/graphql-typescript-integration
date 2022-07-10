/* eslint-disable */
import * as graphql from './graphql';

const documents = {
  "#graphql\n  fragment TweetFragment on Tweet {\n    id\n  }\n\n  query Foo {\n    Tweets {\n      ...TweetFragment\n    }\n  }\n\n  query Bar {\n    Tweets {\n      ...TweetFragment\n      body\n    }\n  }\n\n  subscription TweetSubscription {\n    tweets {\n      body\n    }\n  }\n": {
    TweetFragment: graphql.TweetFragment_X6_FragmentDoc,
    Foo: graphql.Foo_X6_Document,
    Bar: graphql.Bar_X6_Document,
    TweetSubscription: graphql.TweetSubscription_X6_Document,
  },
};

export function gql(source: "#graphql\n  fragment TweetFragment on Tweet {\n    id\n  }\n\n  query Foo {\n    Tweets {\n      ...TweetFragment\n    }\n  }\n\n  query Bar {\n    Tweets {\n      ...TweetFragment\n      body\n    }\n  }\n\n  subscription TweetSubscription {\n    tweets {\n      body\n    }\n  }\n"): (typeof documents)["#graphql\n  fragment TweetFragment on Tweet {\n    id\n  }\n\n  query Foo {\n    Tweets {\n      ...TweetFragment\n    }\n  }\n\n  query Bar {\n    Tweets {\n      ...TweetFragment\n      body\n    }\n  }\n\n  subscription TweetSubscription {\n    tweets {\n      body\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
