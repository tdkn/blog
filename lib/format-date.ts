import { parseISO, format, formatDistance } from "date-fns";

export const formatDate = (
  dateStr: string,
  formatStr: string = "MMMM d, yyyy"
) => format(parseISO(dateStr), formatStr);

export const formatTimeAgo = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true });
