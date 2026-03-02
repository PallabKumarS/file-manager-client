import {
  FolderTree,
  FileImage,
  ShieldCheck,
  Zap,
  Search,
  Share2,
  HardDrive,
  RefreshCw,
} from "lucide-react";

const FEATURES = [
  {
    icon: FolderTree,
    title: "Nested Folder Trees",
    description:
      "Organise files in deeply nested folder hierarchies. Every folder can hold sub-folders and files with no limit on depth (based on your plan).",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: FileImage,
    title: "Multi-format Support",
    description:
      "Upload PDFs, images, audio, and video files. Filebox handles them all with automatic previews and intelligent type detection.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: ShieldCheck,
    title: "End-to-end Encryption",
    description:
      "All files are encrypted at rest and in transit using 256-bit AES encryption. Your data is private, always.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description:
      "Files are served from globally distributed edge nodes, giving you sub-100ms access times no matter where you are.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Find any file by name, type, date, or folder. Full-text search across PDF content means you never lose a document again.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Share2,
    title: "Shareable Links",
    description:
      "Generate time-limited or password-protected share links for individual files or entire folders in seconds.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: HardDrive,
    title: "Tiered Storage Plans",
    description:
      "Start free with 10 GB. Upgrade to Silver, Gold, or Diamond for more space, higher file limits, and advanced features.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    icon: RefreshCw,
    title: "Version History",
    description:
      "Accidentally overwrite a file? No problem. Filebox keeps version snapshots so you can restore any previous version.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Everything you need
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Built for people who care about their files
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Filebox is more than storage — it's a complete file management
            experience with the tools power users demand.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`group rounded-2xl border border-border/60 p-6 bg-card hover:border-border hover:shadow-md transition-all duration-200 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`h-10 w-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
              >
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
