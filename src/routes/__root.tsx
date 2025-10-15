import '@/app/globals.css'

import ErrorReporter from '@/components/ErrorReporter'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Groupi' },
    ],
  }),
  errorComponent: RootErrorBoundary,
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <Outlet />
        {import.meta.env.DEV ? (
          <TanStackRouterDevtools position="bottom-right" />
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}

function RootErrorBoundary(props: ErrorComponentProps) {
  return <ErrorReporter error={props.error} reset={props.reset} />
}
