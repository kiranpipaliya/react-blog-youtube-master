import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { render } from '../Utils/testUtils';
import PostEdit from './PostEdit';

import { createMemoryHistory } from 'history';

describe('Post Edit', () => {
  it('When form submit valid detail', () => {
    const history = createMemoryHistory(['/', '/posts']);
    history.push('/');
    const { debug } = render(
      <Router history={history}>
        <Switch>
          <Route exact path={'/'} component={<PostEdit />} />
          <Route exact path={'/posts'} render={() => <div>Post Created</div>} />
        </Switch>
      </Router>,
    );
    debug();
  });
});
