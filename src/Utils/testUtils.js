import React from 'react';

import { render as RTL } from '@testing-library/react';
import { ColorModeProvider, CSSReset, theme, ThemeProvider } from '@chakra-ui/core';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const render = (component, option = {}) => {
  const queryCache = new QueryCache();
  return RTL(
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ReactQueryCacheProvider queryCache={queryCache}>{component}</ReactQueryCacheProvider>
      </ColorModeProvider>
    </ThemeProvider>,
    option,
  );
};

const renderWithRouter = (component, option = {}) => {
  const queryCache = new QueryCache();
  const history = createMemoryHistory();

  return RTL(
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Router history={history}>
          <ReactQueryCacheProvider queryCache={queryCache}>{component}</ReactQueryCacheProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>,
    option,
  );
};

export { render, renderWithRouter };
