export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <span className="wordmark__a">Dielcha</span>
      <span className="wordmark__b">Digilab</span>
    </span>
  );
}
