import { extendType, nonNull, objectType } from "nexus";
import { nexus } from "@formify/persistence";
import { isUser } from "../../lib/permissions";

const NexusUser = nexus.User;

const User = objectType({
  name: NexusUser.$name,
  description: NexusUser.$description,
  definition(t) {
    t.nonNull.field(NexusUser.id);
    t.nonNull.field(NexusUser.createdAt);
    t.nonNull.field(NexusUser.updatedAt);
    t.nonNull.field(NexusUser.organizations);
  },
});

const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: nonNull("User"),
      authorize: isUser,
      resolve: async (_parent, _args, { prisma, auth }) => {
        const user = await prisma.user.findFirstOrThrow();

        return user;
      },
    });
  },
});

const schema = [User, Query];

export default schema;
