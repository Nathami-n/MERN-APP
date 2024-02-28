const allowedOrigins = ["http:localhost:5173"];

 export const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header("Origin") !== -1)) {
    corsOptions = { origin: true };
  } else {
    corsOptions: {
      origin: false;
    }
  }
  callback(null, corsOptions);
};
