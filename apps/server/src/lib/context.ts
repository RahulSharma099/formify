import { prisma } from "@formify/persistence";

export interface Context {
  prisma: typeof prisma;
}

export const context: Context = {
  prisma,
};
