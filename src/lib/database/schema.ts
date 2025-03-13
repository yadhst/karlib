import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { type InferSelectModel } from "drizzle-orm";

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
