import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import PostList from './PostList';
import * as reactQuery from 'react-query';
import { useColorMode, useTheme } from '@chakra-ui/core';

import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { renderWithRouter } from '../Utils/testUtils';

// jest.mock('react-query');

const server = setupServer(
  rest.get('http://localhost:3002/posts', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', title: 'API Test title 1' },
        { id: '2', title: 'API Test title 2' },
        { id: '3', title: 'API Test title 3' },
        { id: '4', title: 'API Test title 4' },
      ]),
    );
  }),
);

describe('Post list', () => {
  let useQuery = null;

  beforeAll(() => {
    useQuery = jest.spyOn(reactQuery, 'useQuery');
    server.listen();
  });

  beforeEach(() => {
    useQuery.mockClear();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('when Post list Render', () => {
    useQuery.mockReturnValue({
      isLoading: true,
      error: false,
      data: null,
    });

    useColorMode.mockReturnValue({ colorMode: 'light' });
    useTheme.mockReturnValue({});

    renderWithRouter(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);
    const loadingText = screen.queryByText('Loading..');
    expect(loadingText).toBeInTheDocument();
  });

  it('When is loading false and data is available', () => {
    useQuery.mockReturnValue({
      isLoading: false,
      error: false,
      data: {
        data: [
          { id: '1', title: 'Test title 1' },
          { id: '2', title: 'Test title 2' },
          { id: '3', title: 'Test title 3' },
          { id: '4', title: 'Test title 4' },
        ],
      },
    });

    useColorMode.mockReturnValue({ colorMode: 'light' });
    useTheme.mockReturnValue({});

    renderWithRouter(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);

    const itemListElement = screen.queryAllByTestId('list-item').map((item) => item.textContent);

    expect(itemListElement).toMatchInlineSnapshot(`
      Array [
        "Test title 1",
        "Test title 2",
        "Test title 3",
        "Test title 4",
      ]
    `);
  });

  it('When API Call Made', async () => {
    useQuery.mockRestore();
    useColorMode.mockReturnValue({ colorMode: 'light' });
    useTheme.mockReturnValue({});
    renderWithRouter(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading..'));
    const listItemElement = screen.queryAllByTestId('list-item').map((item) => item.textContent);
    expect(listItemElement).toMatchInlineSnapshot(`
      Array [
        "API Test title 1",
        "API Test title 2",
        "API Test title 3",
        "API Test title 4",
      ]
    `);
  });
});
