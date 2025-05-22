import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.tsx",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL ?? "",
  },
} satisfies Config;
