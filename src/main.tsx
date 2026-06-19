import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./index.css";
import { OffsetPaginationPage } from "./pages/offset-pagination";
import { ClientPaginationPage } from "./pages/client-pagination";
import { CursorPaginationPage } from "./pages/cursor-pagination";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/offset-pagination" replace />,
  },
  {
    path: "/offset-pagination",
    element: <OffsetPaginationPage />,
  },
  {
    path: "/client-pagination",
    element: <ClientPaginationPage />,
  },
  {
    path: "/cursor-pagination",
    element: <CursorPaginationPage />,
  },
]);

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
});
