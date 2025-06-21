import { fieldAuthorizePlugin, makeSchema } from "nexus";
import path from "path";
import { nexusScalars } from "@formify/persistence";
import user from "./user/user.typedefs";
import organization from "./organization/organization.typedefs";

const shouldGenerateArtifacts = process.argv.includes("--nexus-exit");

const SCALARS = [
  nexusScalars.BigInt,
  nexusScalars.DateTime,
  nexusScalars.Json,
  nexusScalars.Decimal,
];

const SCHEMAS = [user, organization];

async function generateSchema() {
  const schema = makeSchema({
    types: [SCHEMAS, SCALARS],
    plugins: [
      fieldAuthorizePlugin({
        formatError: ({ error }) => new Error(`Error: ${error.message}`),
      }),
    ],
    outputs: {
      typegen: path.join(__dirname, "../generated/nexus-typegen.ts"),
      schema: path.join(__dirname, "../generated/schema.graphql"),
    },
    contextType: {
      module: require.resolve("../lib/context"),
      export: "Context",
    },
    shouldGenerateArtifacts,
    shouldExitAfterGenerateArtifacts: shouldGenerateArtifacts,
  });

  return schema;
}

if (shouldGenerateArtifacts) {
  console.log("Generating Nexus artifacts...");
  generateSchema();
}

export { generateSchema };
