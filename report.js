import consola from "consola";

export function generateReport(pages) {
  consola.start("Starting report");
  const toIter = Object.entries(pages).sort((a, b) => {
    const [, aCount] = a;
    const [, bCount] = b;
    return bCount - aCount;
  });

  return toIter.reduce((acc, current) => {
    return `${acc ? acc : "Report:"}
    Found ${current[1]} internal links to ${current[1]}`;
  }, "");
}
