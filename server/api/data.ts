import { getDb } from "~/db/database";
import { candidate, medium, party } from "~/db/schema";

export default defineEventHandler(async (event) => {
	const db = await getDb();
	const media = await db.select().from(medium);
	// const candidates = await db.select().from(candidate);
	// const parties = await db.select().from(party);
	return { media };
});
