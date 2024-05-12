import { describe, test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl";

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

  describe("getURLsFromHTML", () => {
    test("should return correct urls", () => {
      const html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul>
        <li>
            <a href="/test">test</a>
        </li>
        <li>
            <a href="https://boot.dev/test">All</a>
        </li>
    </ul>
</body>
</html>`;
      const baseUrl = "https://boot.dev";
      const urls = getURLsFromHTML(html, baseUrl);

      urls.forEach((url) => {
        expect(url).toBe(baseUrl + "/test");
      });
    });
  });
});
