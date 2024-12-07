import { format, formatDistanceToNow } from "date-fns";

const decimalFormatter = new Intl.NumberFormat("en-UK", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 4,
});

export function formatDate(date: Date) {
	return format(date, "dd/MM/yyyy h:m a");
}
export function dateToNow(date: Date) {
	return formatDistanceToNow(date, {});
}
export function formatDecimal(num: number) {
	return decimalFormatter.format(num);
}
export function getInitials(name: string) {
	const nameParts = name.trim().split(" ");
	const initials = nameParts
		.map((part) => part.charAt(0).toUpperCase())
		.join("");
	return initials;
}
export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
