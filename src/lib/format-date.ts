import { format, formatDistance, parseISO } from "date-fns";

export const formatDate = (
  dateStr: Date | string,
  formatStr = "MMMM d, yyyy",
) => {
  if (typeof dateStr === "string") {
    return format(parseISO(dateStr), formatStr);
  } else {
    return format(dateStr, formatStr);
  }
};

export const formatTimeAgo = (dateStr: Date | string) => {
  if (typeof dateStr === "string") {
    return formatDistance(parseISO(dateStr), new Date(), { addSuffix: true });
  } else {
    return formatDistance(dateStr, new Date(), { addSuffix: true });
  }
};
