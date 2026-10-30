export default function CompanyLogo({
  name,
  url,
  size = 48,
}: {
  name: string;
  url: string | null;
  size?: number;
}) {
  const style = { width: size, height: size };
  if (url) {
    return (
      // Plain <img> avoids needing remotePatterns for every company domain
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={`${name} logo`}
        style={style}
        className="shrink-0 rounded-lg border border-neutral-200 bg-white object-contain"
      />
    );
  }
  return (
    <div
      style={style}
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-lg bg-black text-lg font-semibold text-white"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
