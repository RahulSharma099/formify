import { extendType, nonNull, objectType } from "nexus";
import { nexus } from "@formify/persistence";
import { createGraphQLError } from "graphql-yoga";
import { GraphQLError } from "graphql";

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
      authorize: () => true,
      resolve: async (_parent, _args, { prisma }) => {
        const user = await prisma.user.findFirstOrThrow();

        console.log("User found:", user);

        return user;
      },
    });
  },
});

const schema = [User, Query];

export default schema;
