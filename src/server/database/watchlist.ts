import {
  pgEnum,
  pgTable,
  serial,
  integer,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const mediaTypes = pgEnum("media_type", ["movie", "series"]);

export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  media_type: mediaTypes("media_type"),
});
