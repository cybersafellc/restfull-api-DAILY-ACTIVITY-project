import logger from "../src/app/logging.js";

describe("logger testing", () => {
  it("error", () => {
    logger.error("error message test");
  });

  it("warn", () => {
    logger.warn("warn message test");
  });

  it("info", () => {
    logger.info("info message test");
  });
});
