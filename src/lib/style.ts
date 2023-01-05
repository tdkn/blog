import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const classNames = (...values: ClassValue[]) => twMerge(clsx(values));
