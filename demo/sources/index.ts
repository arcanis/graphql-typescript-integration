/* eslint-disable @typescript-eslint/no-unused-vars */

import {gql} from '@app/gql';

const {NotFound, Foo, Bar} = gql(`#graphql
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

  subscription TweetSubscription {
    tweets {
      body
    }
  }
`);
