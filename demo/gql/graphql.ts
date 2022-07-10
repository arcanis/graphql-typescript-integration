/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  body?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteTweetArgs = {
  id: Scalars['ID'];
};


export type MutationMarkTweetReadArgs = {
  id: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Notifications?: Maybe<Array<Maybe<Notification>>>;
  NotificationsMeta?: Maybe<Meta>;
  Tweet?: Maybe<Tweet>;
  Tweets?: Maybe<Array<Maybe<Tweet>>>;
  TweetsMeta?: Maybe<Meta>;
  User?: Maybe<User>;
};


export type QueryNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryTweetArgs = {
  id: Scalars['ID'];
};


export type QueryTweetsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_field?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Stat = {
  __typename?: 'Stat';
  likes?: Maybe<Scalars['Int']>;
  responses?: Maybe<Scalars['Int']>;
  retweets?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  tweets?: Maybe<Tweet>;
};

export type Tweet = {
  __typename?: 'Tweet';
  Author?: Maybe<User>;
  Stats?: Maybe<Stat>;
  body?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatar_url?: Maybe<Scalars['Url']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  last_name?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type TweetFragment_X6_Fragment = { __typename?: 'Tweet', id: string };

export type Foo_X6_QueryVariables = Exact<{ [key: string]: never; }>;


export type Foo_X6_Query = { __typename?: 'Query', Tweets?: Array<{ __typename?: 'Tweet', id: string } | null> | null };

export type Bar_X6_QueryVariables = Exact<{ [key: string]: never; }>;


export type Bar_X6_Query = { __typename?: 'Query', Tweets?: Array<{ __typename?: 'Tweet', body?: string | null, id: string } | null> | null };

export type TweetSubscription_X6_SubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TweetSubscription_X6_Subscription = { __typename?: 'Subscription', tweets?: { __typename?: 'Tweet', body?: string | null, id: string } | null };

export const TweetFragment_X6_FragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TweetFragment_X6_"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tweet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<TweetFragment_X6_Fragment, unknown>;
export const Foo_X6_Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Foo_X6_"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TweetFragment_X6_"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},...TweetFragment_X6_FragmentDoc.definitions]} as unknown as DocumentNode<Foo_X6_Query, Foo_X6_QueryVariables>;
export const Bar_X6_Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bar_X6_"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TweetFragment_X6_"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},...TweetFragment_X6_FragmentDoc.definitions]} as unknown as DocumentNode<Bar_X6_Query, Bar_X6_QueryVariables>;
export const TweetSubscription_X6_Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TweetSubscription_X6_"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TweetSubscription_X6_Subscription, TweetSubscription_X6_SubscriptionVariables>;