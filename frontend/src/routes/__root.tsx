import CanvasParticlesBackground from '@/components/canvas-bg'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CanvasParticlesBackground/>
          <Outlet />
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
