/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Url: any;
};


export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTweet?: Maybe<Tweet>;
  deleteTweet?: Maybe<Tweet>;
  markTweetRead?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateTweetArgs = {
  body?: Maybe<Scalars['String']>;
};


export type MutationDeleteTweetArgs = {
  id: Scalars['ID'];
};


export type MutationMarkTweetReadArgs = {
  id: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  id?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['Date']>;
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Tweet?: Maybe<Tweet>;
  Tweets?: Maybe<Array<Maybe<Tweet>>>;
  TweetsMeta?: Maybe<Meta>;
  User?: Maybe<User>;
  Notifications?: Maybe<Array<Maybe<Notification>>>;
  NotificationsMeta?: Maybe<Meta>;
};


export type QueryTweetArgs = {
  id: Scalars['ID'];
};


export type QueryTweetsArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort_field?: Maybe<Scalars['String']>;
  sort_order?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryNotificationsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type Stat = {
  __typename?: 'Stat';
  views?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
  retweets?: Maybe<Scalars['Int']>;
  responses?: Maybe<Scalars['Int']>;
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['ID'];
  body?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  Author?: Maybe<User>;
  Stats?: Maybe<Stat>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  name?: Maybe<Scalars['String']>;
  avatar_url?: Maybe<Scalars['Url']>;
};

export type TweetFragment_Xc_Fragment = (
  { __typename?: 'Tweet' }
  & Pick<Tweet, 'id'>
);

export type Foo_Xc_QueryVariables = Exact<{ [key: string]: never; }>;


export type Foo_Xc_Query = (
  { __typename?: 'Query' }
  & { Tweets?: Maybe<Array<Maybe<(
    { __typename?: 'Tweet' }
    & Pick<Tweet, 'id'>
    & TweetFragment_Xc_Fragment
  )>>> }
);

export type Bar_Xc_QueryVariables = Exact<{ [key: string]: never; }>;


export type Bar_Xc_Query = (
  { __typename?: 'Query' }
  & { Tweets?: Maybe<Array<Maybe<(
    { __typename?: 'Tweet' }
    & Pick<Tweet, 'body' | 'id'>
    & TweetFragment_Xc_Fragment
  )>>> }
);

export const TweetFragment_Xc_FragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TweetFragment_Xc_"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tweet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<TweetFragment_Xc_Fragment, unknown>;
export const Foo_Xc_Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Foo_Xc_"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TweetFragment_Xc_"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},...TweetFragment_Xc_FragmentDoc.definitions]} as unknown as DocumentNode<Foo_Xc_Query, Foo_Xc_QueryVariables>;
export const Bar_Xc_Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bar_Xc_"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TweetFragment_Xc_"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},...TweetFragment_Xc_FragmentDoc.definitions]} as unknown as DocumentNode<Bar_Xc_Query, Bar_Xc_QueryVariables>;