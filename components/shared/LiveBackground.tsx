export function LiveBackground({ variant = 'section' }: { variant?: 'hero' | 'section' }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-maroon-mid/20 blur-[120px] animate-blob-1" />
      <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-maroon-bright/10 blur-[100px] animate-blob-2" />
      <div className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-silver-muted/5 blur-[120px] animate-blob-3" />

      {variant === 'hero' && (
        <>
          <div
            className="absolute inset-0 animate-grid-pulse"
            style={{
              backgroundImage:
                'linear-gradient(rgba(107,15,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,15,26,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute inset-0 animate-aurora opacity-40"
            style={{
              background:
                'radial-gradient(circle at 20% 30%, rgba(107,15,26,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(184,184,204,0.08), transparent 40%)',
            }}
          />
        </>
      )}
    </div>
  )
}
