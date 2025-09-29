import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TanstackRouteProvider } from "./providers/TanstackRouterProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackRouteProvider />
  </StrictMode>
);
