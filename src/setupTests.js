// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
// Chakra ui Global mock
jest.mock('@chakra-ui/core', () => {
  const module = jest.requireActual('@chakra-ui/core');
  return {
    __esModule: true,
    ...module,
    useColorMode: jest.fn(),
    useTheme: jest.fn(),
  };
});
