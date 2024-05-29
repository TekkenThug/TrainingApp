import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import swaggerDef from "@/docs/swagger";

const router = Router();

const specs = swaggerJSDoc({
  ...swaggerDef,
  apis: ["src/docs/*.yml", "src/routes/v1/**/api.yaml"],
});

router.use("/", swaggerUI.serve);
router.get(
  "/",
  swaggerUI.setup(specs, {
    explorer: true,
  }),
);

export default router;
