/* eslint-disable @typescript-eslint/no-unused-vars */

import {gql} from '@app/gql';

const {Tweet, Foo, Bar} = gql(`#graphql
  fragment TweetFragment on Tweet {
    id
  }

  query Foo {
    Tweets {
      ...TweetFragment
    }
  }

  query Bar {
    Tweets {
      ...TweetFragment
      body
    }
  }
`);
