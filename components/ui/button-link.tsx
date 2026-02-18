import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const classes =
    variant === "primary"
      ? "bg-white text-black hover:bg-zinc-200"
      : "border border-zinc-700 text-zinc-100 hover:bg-zinc-900";

  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition ${classes}`}>
      {children}
    </Link>
  );
}
