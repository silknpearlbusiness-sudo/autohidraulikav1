import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#folyamat", label: "Folyamat" },
  { href: "#csapat", label: "Csapatunk" },
  { href: "#velemenyek", label: "Vélemények" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
        scrolled ? "glass-strong" : "glass"
      }`}
      style={{ width: "calc(100% - 1.5rem)" }}
    >
      <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-soft">
          K
        </span>
        <span className="hidden sm:inline">kardánjavítás.hu</span>
      </a>
      <nav className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-white/60 hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="tel:+36706734444"
        className="glint group inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-soft transition-transform hover:scale-[1.03]"
      >
        <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline">+36 70 673 4444</span>
        <span className="sm:hidden">Hívás</span>
      </a>
    </header>
  );
}
