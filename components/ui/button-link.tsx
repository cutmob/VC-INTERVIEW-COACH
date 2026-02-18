import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-150";

  const styles =
    variant === "primary"
      ? "bg-wood-600 text-white shadow-md shadow-wood-200 hover:bg-wood-700 hover:shadow-wood-300 dark:bg-wood-400 dark:shadow-wood-400/40 dark:hover:bg-wood-300 dark:hover:shadow-wood-300/60"
      : "border border-zinc-200 bg-white text-zinc-700 shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-white/10 dark:bg-transparent dark:text-wood-700 dark:hover:border-white/20 dark:hover:text-wood-900";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
