import { consola } from "consola";

function main() {
  consola.box("web_crawler");

  const args = process.argv.slice(2);

  if (args.length !== 1) {
    consola.error(new Error("one url required"));
    process.exit(1);
  }

  const [baseUrl] = args;
  consola.start(`crawling ${baseUrl}`);
}

main();
