import { JSDOM } from "jsdom";

export function normalizeURL(str) {
  const url = new URL(str);
  const domain = url.hostname;
  let path = url.pathname;

  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return domain + path;
}

export function getURLsFromHTML(html, baseURL) {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const links = document.querySelectorAll("a");

  return Array.from(links).map((link) => {
    let url = link.getAttribute("href");

    if (url.startsWith("/")) {
      return baseURL + url;
    }
    return url;
  });
}
