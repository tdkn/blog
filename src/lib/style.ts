import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const classNames = (...values: ClassValue[]) => twMerge(clsx(values));
