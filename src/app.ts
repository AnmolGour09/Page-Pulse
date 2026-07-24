import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import auditRoutes from "./routes/audit.routes";
import { rateLimiter } from "./middleware/rateLimiter";
import { httpLogger } from "./middleware/logger";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(httpLogger);


// Health Check
app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});


// Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Rate limit ONLY API routes
app.use("/api", rateLimiter);

// Routes
app.use("/api/v1/audit", auditRoutes);

app.use(notFound);

app.use(errorHandler);
export default app;