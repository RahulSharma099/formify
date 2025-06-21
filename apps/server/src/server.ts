import express from "express";
import { createYoga } from "graphql-yoga";
import { env } from "./lib/env";
import api from "./api";
import { logger } from "./lib/logger";
import { generateSchema } from "./modules";
import { context } from "./lib/context";

async function runner() {
  const app = express();

  const yoga = createYoga({
    graphiql: env.isDev,
    schema: await generateSchema(),
    context,
    maskedErrors: false,
  });

  app.use("/graphql", yoga);
  app.use("/api", api);

  app.use("/health", (_, res) => {
    res.json({ message: "Always stay hydrated! 🥤", timestamp: Date.now() });
  });

  app.listen(env.PORT, () => {
    logger.info(`🎰 Running Formify server on port ${env.PORT}!`);
  });
}

process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
});

runner();
