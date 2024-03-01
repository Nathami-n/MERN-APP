import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import path from "path";
import { appendFile, mkdir } from "fs/promises";
import fs from "fs";
const cwd = process.cwd();

const eventLogger = async (message, file) => {
  const dateItem = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const id = uuid();
  const logItem = `${dateItem}\t ${id}\t ${message}\n`;

  try {
    if (!fs.existsSync(path.resolve(cwd, "api", "logs"))) {
      await mkdir(path.resolve(cwd, "api", "logs"));
    }
    await appendFile(path.resolve(cwd, "api", "logs", file), logItem);
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  eventLogger(
    `${req.method}\t ${req.headers.origin}\t ${req.url}`,
    "reqLog.txt"
  );
  next();
};

export { logger, eventLogger };
