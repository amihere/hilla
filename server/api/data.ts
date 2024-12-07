import { getDb } from "~/db/database";
import { candidate, medium, party } from "~/db/schema";

export default defineEventHandler(async (event) => {
	const db = await getDb();
	const candidates = await db.select().from(candidate);
	const media = await db.select().from(medium);
	const parties = await db.select().from(party);
	return { candidates, media, parties };
});
