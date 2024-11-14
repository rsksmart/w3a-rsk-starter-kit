import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatAdress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
