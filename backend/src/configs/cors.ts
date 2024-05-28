import { CorsOptions } from "cors";
import config from "@/configs/config.ts";

const options: CorsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    if ((origin && config.appWhitelist.includes(origin)) || (!origin && config.env === "dev")) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
};

export default options;
