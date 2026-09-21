const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function RedirectPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0c0709',
        color: '#e8e6e1',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '0 1.5rem',
      }}
    >
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Nalanda College Colombo</h1>
        <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#9b9489' }}>
          Redirecting to{' '}
          <a href={`${basePath}/en/`} style={{ color: '#c25a72', textDecoration: 'underline' }}>
            the English site
          </a>
          …
        </p>
      </div>
    </main>
  )
}
