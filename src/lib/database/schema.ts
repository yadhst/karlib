import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { type InferSelectModel } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

const RoleEnum = ["Admin", "Consultant", "User"] as const;

export type User = InferSelectModel<typeof user>;
export const user = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text("name").notNull(),
  image: text("image").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  role: text("role", { enum: RoleEnum }).default("User").notNull(),
  createdTimestamp: integer("createdTimestamp", {
    mode: "timestamp_ms",
  })
    .$default(() => new Date())
    .notNull(),
});

export const account = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => [
    primaryKey({
      columns: [table.provider, table.providerAccountId],
    }),
  ],
);

export const session = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationToken = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.identifier, table.token],
    }),
  ],
);

export const authenticator = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.credentialID],
    }),
  ],
);

export type Work = InferSelectModel<typeof work>;
export const work = sqliteTable("work", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description", { length: 256 }).notNull(),
  author: text("author").notNull(),
  cover: text("cover").notNull(),
  tags: text("tags", { mode: "json" })
    .$type<string[]>()
    .default(sql`(json_array())`)
    .notNull(),
  fileId: text("fileId").notNull(),
  publisherId: text("publisherId").references(() => user.id, {
    onDelete: "set null",
  }),
  createdTimestamp: integer("createdTimestamp", {
    mode: "timestamp_ms",
  })
    .$default(() => new Date())
    .notNull(),
  publishedTimestamp: integer("publishedTimestamp", { mode: "timestamp_ms" }),
  updatedTimestamp: integer("updatedTimestamp", { mode: "timestamp_ms" }),
});

export type Bookmark = InferSelectModel<typeof bookmark>;
export const bookmark = sqliteTable("bookmark", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  workId: text("workId")
    .references(() => work.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
});

export type History = InferSelectModel<typeof history>;
export const history = sqliteTable("history", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  workId: text("workId")
    .references(() => work.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  timestamp: integer("timestamp", { mode: "timestamp_ms" })
    .$default(() => new Date())
    .notNull(),
});
