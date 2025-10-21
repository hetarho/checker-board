import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TanstackRouteProvider } from "./providers/TanstackRouterProvider";
import { TanstackQueryProvider } from "./providers/TanstackQueryProvider";
import "@app/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <TanstackRouteProvider />
    </TanstackQueryProvider>
  </StrictMode>
);
