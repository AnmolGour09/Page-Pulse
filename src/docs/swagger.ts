import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Page Plus API",
      version: "1.0.0",
      description: "Website Audit API",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
      },
    ],
  },

  apis:
    process.env.NODE_ENV === "production"
      ? [path.join(__dirname, "../routes/*.js")]
      : [path.join(process.cwd(), "src/routes/*.ts")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;