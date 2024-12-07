import { relations } from "drizzle-orm/relations";
import { party, candidate, medium, vote, race } from "./schema";

export const candidateRelations = relations(candidate, ({ one, many }) => ({
	party: one(party, {
		fields: [candidate.partyId],
		references: [party.id],
	}),
	votes: many(vote),
}));

export const partyRelations = relations(party, ({ many }) => ({
	candidates: many(candidate),
}));

export const voteRelations = relations(vote, ({ one }) => ({
	medium: one(medium, {
		fields: [vote.mediumId],
		references: [medium.id],
	}),
	race: one(race, {
		fields: [vote.raceId],
		references: [race.id],
	}),
	candidate: one(candidate, {
		fields: [vote.candidateId],
		references: [candidate.id],
	}),
}));

export const mediumRelations = relations(medium, ({ many }) => ({
	votes: many(vote),
}));

export const raceRelations = relations(race, ({ many }) => ({
	votes: many(vote),
}));
