import consola from "consola";
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

    if (URL.canParse(url)) {
      return url;
    } else {
      return new URL(url, baseURL).toString();
    }
  });
}

function inSameDomain(firstUrl, secondUrl) {
  return new URL(firstUrl).origin === new URL(secondUrl).origin;
}

export async function fetchHTML(url) {
  try {
    const response = await fetch(url);

    if (response.status >= 400) {
      consola.error(new Error(`status: ${response.status}`));
      return;
    }

    const contentHeader = response.headers.get("Content-Type");
    if (!contentHeader.startsWith("text/html")) {
      return;
    }
    return response.text();
  } catch (error) {
    throw new Error(error);
  }
}

export async function crawlPage(baseUrl, currentUrl, pages = {}) {
  if (!inSameDomain(baseUrl, currentUrl)) {
    return pages;
  }

  const newCurrentUrl = normalizeURL(currentUrl);

  if (pages[newCurrentUrl]) {
    pages[newCurrentUrl]++;
    return pages;
  } else {
    pages[newCurrentUrl] = 1;
  }
  try {
    const html = await fetchHTML(currentUrl);
    const urls = getURLsFromHTML(html, currentUrl);

    urls.forEach((url) => crawlPage(baseUrl, url, pages));

    return pages;
  } catch (error) {
    consola.error(new Error(error.message));
    return pages;
  }
}
