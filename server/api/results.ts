import { and, eq } from "drizzle-orm";
import { getDb } from "~/db/database";
import { candidate, medium, party, race, vote } from "~/db/schema";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const selectedMedium = Number.parseInt(String(query.medium) || "1");
	console.log(selectedMedium);

	const db = await getDb();
	const results = await db
		.select({
			voteId: vote.id,
			candidateId: candidate.id,
			candidateName: candidate.fullName,
			partyId: party.id,
			partyName: party.fullName,
			votes: vote.number,
			candidateImg: candidate.photo,
			updatedAt: vote.date,
		})
		.from(vote)
		.where(and(eq(vote.raceId, 1), eq(vote.mediumId, selectedMedium)))
		.innerJoin(candidate, eq(vote.candidateId, candidate.id))
		.innerJoin(party, eq(candidate.partyId, candidate.partyId));
	return results;
});
