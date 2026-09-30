"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <>
      <header className="nav" id="nav">
        <a href="#top" className="nav__logo" data-magnet>
          A<em>L</em>
        </a>
        <nav className="nav__links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--sm" data-magnet>
          <span>Let’s talk</span>
        </a>
        <button className="nav__burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <i />
          <i />
        </button>
      </header>
      <div className="menu">
        {[...NAV, { href: "#contact", label: "Contact" }].map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
      </div>
    </>
  );
}
