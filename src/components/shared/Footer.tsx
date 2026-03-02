import { FolderOpen, Github, Twitter, Linkedin } from "lucide-react";

const FOOTER_LINKS: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Documentation", "Help Center", "Status", "Contact"],
  Legal: ["Terms", "Privacy", "Cookies", "Security"],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20 px-4 sm:px-6 pt-10 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <FolderOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Filebox</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A modern cloud file manager that keeps your files organized and
              accessible from anywhere.
            </p>
            <div className="flex gap-3 mt-5">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {cat}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Filebox, Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Express &amp; PostgreSQL
          </p>
        </div>
      </div>
    </footer>
  );
}
