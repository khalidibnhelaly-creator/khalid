"use client";

import Link from "next/link";
import { useState } from "react";

export type NavItem = { label: string; href: string; external?: boolean };

const DEFAULT_NAV: NavItem[] = [
  { label: "Studio", href: "#studio" },
  { label: "Ventures", href: "#ventures" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "AI Workshop ↗", href: "/ai", external: true },
];

const DEFAULT_LABELS = { menu: "Menu", close: "Close" };

export function SiteHeader({
  markHref = "#top",
  items = DEFAULT_NAV,
  labels = DEFAULT_LABELS,
}: {
  markHref?: string;
  items?: NavItem[];
  labels?: { menu: string; close: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="kh">
      <div className="k-container kh-inner">
        <a href={markHref} className="kh-mark">
          Khalid Bin Helaly<span>.</span>
        </a>

        <nav
          id="site-nav"
          className={`kh-nav${open ? " is-open" : ""}`}
          aria-label="Primary"
        >
          {items.map((item) =>
            item.external ? (
              <Link
                key={item.href}
                href={item.href}
                className="kh-ext"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <button
          type="button"
          className="kh-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? labels.close : labels.menu}
        </button>
      </div>
    </header>
  );
}
