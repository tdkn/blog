import { format, formatDistance, parseISO } from "date-fns";

export const formatDate = (dateStr: Date | string, formatStr = "MMMM d, yyyy") => {
  if (typeof dateStr === "string") {
    return format(parseISO(dateStr), formatStr);
  }
    return format(dateStr, formatStr);
  
};

export const formatTimeAgo = (dateStr: Date | string) => {
  if (typeof dateStr === "string") {
    return formatDistance(parseISO(dateStr), new Date(), { addSuffix: true });
  }
    return formatDistance(dateStr, new Date(), { addSuffix: true });
  
};
