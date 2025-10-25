import Link from "next/link";

export default function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition shadow-soft";
  const styles =
    variant === "primary"
      ? `${base} bg-violet text-white hover:opacity-90`
      : `${base} bg-white text-midnight hover:bg-mist border border-slate-200`;
  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
