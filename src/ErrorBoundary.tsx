import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data && <pre>{error.data}</pre>}
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>An error occurred</h1>
      <p>{(error?.message ?? '') || 'Unknown error'}</p>
    </div>
  )
}
