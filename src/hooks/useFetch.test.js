import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import useFetch from "./useFetch";
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const TODOS_API = "https://jsonplaceholder.typicode.com/todos";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "optio reprehenderit",
          body: "  rerum est autem sunt rem eveniet architecto",
        },
        {
          userId: 1,
          id: 2,
          title: "qui est esse",
          body: "debitis possimus qui neque nisi nulla",
        },
        {
          userId: 1,
          id: 3,
          title: " exercitationem repellat qui ipsa sit aut",
          body: "pariatur\nmolestiae porro eius odio et labore et velit aut",
        },
      ])
    );
  }),
  rest.get(TODOS_API, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          completed: true,
          id: 199,
          title: "numquam repellendus a magnam",
          userId: 10,
        },
      ])
    );
  })
);

describe("UseFetch", () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it("Should Fetch Api And Assign Data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch(API_URL));
    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "body": "  rerum est autem sunt rem eveniet architecto",
          "id": 1,
          "title": "optio reprehenderit",
          "userId": 1,
        },
        Object {
          "body": "debitis possimus qui neque nisi nulla",
          "id": 2,
          "title": "qui est esse",
          "userId": 1,
        },
        Object {
          "body": "pariatur
      molestiae porro eius odio et labore et velit aut",
          "id": 3,
          "title": " exercitationem repellat qui ipsa sit aut",
          "userId": 1,
        },
      ]
    `);
  });

  it("When Url Change Re Fetch Api And Assign Data", async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      (URL) => useFetch(URL),
      {
        initialProps: API_URL,
      }
    );

    await waitForNextUpdate();

    rerender(TODOS_API);

    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "completed": true,
          "id": 199,
          "title": "numquam repellendus a magnam",
          "userId": 10,
        },
      ]
    `);
  });
});
