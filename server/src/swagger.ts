import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const swaggerDocument = YAML.load(
    path.join(__dirname, "../docs/openapi.yaml")
);

const swagger = (app: Application): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default swagger;
