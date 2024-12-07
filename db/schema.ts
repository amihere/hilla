import {
	sqliteTable,
	text,
	integer,
	numeric,
	foreignKey,
} from "drizzle-orm/sqlite-core";

export const party = sqliteTable("Party", {
	id: integer().primaryKey().notNull(),
	fullName: text("full_name", { length: 200 }),
	photo: text({ length: 1000 }),
	date: numeric(),
});

export const candidate = sqliteTable("Candidate", {
	id: integer().primaryKey().notNull(),
	fullName: text("full_name", { length: 200 }),
	partyId: integer("party_id").references(() => party.id),
	photo: text({ length: 1000 }),
	date: numeric(),
});

export const medium = sqliteTable("Medium", {
	id: integer().primaryKey().notNull(),
	fullName: text("full_name", { length: 200 }),
	photo: text({ length: 1000 }),
	date: numeric(),
});

export const vote = sqliteTable("Vote", {
	id: integer().primaryKey().notNull(),
	number: integer(),
	candidateId: integer("candidate_id").references(() => candidate.id),
	raceId: integer("race_id").references(() => race.id),
	mediumId: integer("medium_id").references(() => medium.id),
	date: numeric(),
});

export const race = sqliteTable("Race", {
	id: integer().primaryKey().notNull(),
	title: text({ length: 1000 }).notNull(),
	type: integer(),
	date: numeric(),
	regionId: integer("region_id"),
});

export const region = sqliteTable("Region", {
	id: integer().primaryKey().notNull(),
	title: text({ length: 50 }).notNull(),
	date: numeric(),
});
