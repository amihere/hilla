import { drizzle } from "drizzle-orm/libsql";
import { candidate, medium } from "./schema";
import { eq } from "drizzle-orm";
const config = useRuntimeConfig();

export async function getDb() {
	const db = drizzle({
		connection: {
			url: config.dbUrl,
			authToken: config.dbToken,
		},
	});
	// await q(db);
	return db;
}

// async function q(db: any) {
// 	await db
// 		.update(candidate)
// 		.set({
// 			photo:
// 				"https://cdn.modernghana.com/content__/640/457/1023202415834-sxoaredq5l-dr-bawumia.jpg",
// 			fullName: "MAHAMUDU BAWUMIA",
// 		})
// 		.where(eq(candidate.id, 1));
// }
