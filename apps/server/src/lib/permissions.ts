import { Context } from "./context";

export function isUser(_: any, __: any, ctx: Context) {
  return Boolean(ctx.auth?.user);
}
