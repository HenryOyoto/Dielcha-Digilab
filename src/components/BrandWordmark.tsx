export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`} aria-label="Dielcha Digilab">
      <span className="brand-wordmark__dielcha">Dielcha</span>
      <span className="brand-wordmark__digi">Digi</span>
      <span className="brand-wordmark__lab">lab</span>
    </span>
  );
}
