import { describe, test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

describe("crawl", () => {
  describe("normalizeURL", () => {
    test("should return correct url", () => {
      const expected = "blog.boot.dev/path";

      const urls = [
        "https://blog.boot.dev/path/",
        "https://blog.boot.dev/path",
        "http://blog.boot.dev/path/",
        "http://blog.boot.dev/path",
      ];

      urls.forEach((url) => {
        expect(normalizeURL(url)).toEqual(expected);
      });
    });
  });
});
