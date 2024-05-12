export function normalizeURL(str) {
  const url = new URL(str);
  const domain = url.hostname;
  let path = url.pathname;

  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return domain + path;
}
