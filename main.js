import { consola } from "consola";
import { crawlPage } from "./crawl.js";
import { generateReport } from "./report.js";

async function main() {
  consola.box("web_crawler");

  const args = process.argv.slice(2);

  if (args.length !== 1) {
    consola.error(new Error("one url required"));
    process.exit(1);
  }

  const [baseUrl] = args;
  consola.start(`crawling ${baseUrl}`);

  const pages = await crawlPage(baseUrl, baseUrl);
  console.log(generateReport(pages));
}

main();
