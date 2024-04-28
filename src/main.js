import web from "./app/web.js";
import http from "http";
import dotenv from "dotenv";
import { logger } from "./app/logging.js";
dotenv.config();

const server = http.createServer(web);
server.listen(process.env.APP_PORT, () => {
  logger.info("server running on port :3200");
});
