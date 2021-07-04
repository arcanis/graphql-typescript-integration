/* eslint-disable @typescript-eslint/no-unused-vars */

import {gql} from '@app/gql';

const {Foo, Bar} = gql(`#graphql
  query Foo {
    Tweets {
      id
    }
  }

  query Bar {
    Tweets {
      id
      body
    }
  }
`);
