import { eventLogger } from "./EventLogger.js";
export const errorLogger = (err, req, res, next) => {
  eventLogger(` ${err.message}\t ${err.message}`, "errLog.txt");
  next();
};
