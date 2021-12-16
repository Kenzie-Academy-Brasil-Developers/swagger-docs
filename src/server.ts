import express from "express";
const app = express();
app.use(express.json());

import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import { router } from "./routes";

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use("/api", router);
app.listen(3333, () => console.log("Server is running"));
