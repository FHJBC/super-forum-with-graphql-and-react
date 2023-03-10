import dotenv from "dotenv";
import path from "path";

export const loadEnv = (relativePath: string = "/../../.env") => {
    // const errorHandler = require('errorhandler')
    // if (process.env.NODE_ENV === 'development') {
    //     app.use(errorHandler({
    //         dumpExceptions: true,
    //         showStack: true
    //     }))
    // } else if (process.env.NODE_ENV === 'production') {
    //     app.use(errorHandler())
    // }

  if (process.env.NODE_ENV === "development") {
    dotenv.config();
  } else {
    const envPath = path.join(__dirname, relativePath);
    const result = dotenv.config({
      path: envPath,
    });
    
    if (result.error) {
      throw result.error;
    }
  }
};
