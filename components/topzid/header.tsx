"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Learn", href: "#learn" },
  { label: "About", href: "#about" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="hdr">
      <div className="wrap">
        <Link href="/" className="logo" aria-label="TOPZID home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Topzidlogo.png" alt="" width={28} height={28} />
          TOPZID
        </Link>

        <nav id="tz-nav" className={`nav${open ? " is-open" : ""}`} aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={close}>
              {n.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={close}>
            Start a project
          </a>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="tz-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
