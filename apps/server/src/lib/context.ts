import { YogaInitialContext } from "graphql-yoga";
import { prisma } from "./db";
import { clerkClient } from "./clerkClient";
import { env } from "./env";

type RequestAuth = {
  user?: {
    id: string;
  };
};
export interface Context {
  prisma: typeof prisma;
  auth?: RequestAuth;
}

export async function resolveContext(
  ctx: YogaInitialContext
): Promise<Context> {
  const auth = await resolveRequestAuth(ctx);

  return {
    prisma,
    auth,
  };
}

async function resolveRequestAuth(
  ctx: YogaInitialContext
): Promise<RequestAuth | undefined> {
  try {
    const result =
      // @ts-ignore
      await clerkClient.authenticateRequest(ctx.request, {
        secretKey: env.CLERK_SECRET_KEY,
      });

    console.log("Authentication result:", result);
    console.log("Request headers:", ctx.request.headers.get("Authorization"));

    const isAuthenticated = result?.isAuthenticated ?? false;

    return isAuthenticated ? { user: { id: "1" } } : undefined;
  } catch (error) {
    console.error("Error resolving request auth:", error);
    return undefined;
  }
}
