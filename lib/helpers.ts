import { format, formatDistanceToNow } from "date-fns";

const decimalFormatter = new Intl.NumberFormat("en-UK", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
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
