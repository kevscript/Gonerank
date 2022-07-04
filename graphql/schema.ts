import { makeSchema } from "nexus";
import { join } from "path";
import * as ApiTypes from "./types";
import NexusPrismaScalars from "nexus-prisma/scalars";

const PrismaScalars = {
  types: [NexusPrismaScalars],
};

export const schema = makeSchema({
  types: [PrismaScalars.types, ApiTypes],
  nonNullDefaults: {
    input: false,
    output: true,
  },
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "graphql", "generated", "schema.graphql"),
  },
  contextType: {
    module: join(process.cwd(), "graphql", "context.ts"),
    export: "Context",
    alias: "ctx",
  },
});
