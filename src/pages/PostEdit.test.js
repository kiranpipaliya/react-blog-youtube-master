import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { render } from '../Utils/testUtils';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PostEdit from './PostEdit';
import userEvent from '@testing-library/user-event';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('http://localhost:3002/posts', (req, res, ctx) => {
    return res(ctx.json({ message: 'Post created successfully' }));
  }),
);

describe('Post Edit', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => server.close());

  it('When form submit valid detail', async () => {
    const history = createMemoryHistory(['/', '/posts']);
    const { debug } = render(
      <Router history={history}>
        <Switch>
          <Route exact path={'/'} component={() => <PostEdit />} />
          <Route exact path={'/posts'} render={() => <div>Post Created</div>} />
        </Switch>
      </Router>,
    );

    const title = screen.getByLabelText(/title/i);
    const dsc = screen.getByLabelText(/Description/i);

    userEvent.type(title, 'Dummy Title');
    userEvent.type(dsc, 'Dummy Description');

    const button = screen.getByText(/Add Blog/i);

    userEvent.click(button);

    await screen.findByText(/Post Created/i);

    expect(screen.getByText(/Post Created/i)).toBeInTheDocument();
  });
});
