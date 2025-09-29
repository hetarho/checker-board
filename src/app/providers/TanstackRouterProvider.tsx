import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routes/_routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function TanstackRouteProvider() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}