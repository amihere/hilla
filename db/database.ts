import { drizzle } from "drizzle-orm/libsql";

export function getDb() {
	const db = drizzle({
		connection: {
			url: process.env.DB_URL || "",
			authToken: process.env.DB_AUTH_TOKEN || "",
		},
	});
	return db;
}
