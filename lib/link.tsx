"use client";

// Routing helpers for the Next.js site.
// (The single-file preview swaps this module for a hash-based version.)
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type Route = "home" | "about" | "services" | "contact";

export const hrefOf = (r: Route) => (r === "home" ? "/" : `/${r}`);

export function Link({
  to,
  className,
  children,
  onClick,
  "aria-current": ariaCurrent,
}: {
  to: Route;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page" | undefined;
}) {
  return (
    <NextLink href={hrefOf(to)} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </NextLink>
  );
}

export function useRoute(): Route {
  const p = usePathname() || "/";
  const seg = p.replace(/\/+$/, "").split("/")[1];
  return (seg || "home") as Route;
}
