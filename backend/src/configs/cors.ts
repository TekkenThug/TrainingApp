import { CorsOptions } from "cors";
import config from "@/configs/config.ts";

const options: CorsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    if (origin && config.appWhitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
};

export default options;
