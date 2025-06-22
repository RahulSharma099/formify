import { $settings } from "nexus-prisma";
$settings({
  checks: {
    PrismaClientOnContext: false,
  },
});

export * from "./lib/redis-client";
export { PrismaClient } from "@prisma/client";
export * from "@prisma/client";
export * from "./lib/redis";
export * as nexus from "nexus-prisma";
export * as nexusScalars from "nexus-prisma/scalars";
