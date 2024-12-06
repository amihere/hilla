export default defineEventHandler(async (event) => {
	await new Promise((r) => {
		setTimeout(r, 2000);
	});
	return { hello: "WORLD" };
});
