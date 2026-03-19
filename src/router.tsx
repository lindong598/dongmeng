import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DreamListPage } from "@/pages/DreamListPage";
import { DreamEditorPage } from "@/pages/DreamEditorPage";
import { StatsPage } from "@/pages/StatsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DreamListPage /> },
      { path: "dream/:dreamId", element: <DreamEditorPage /> },
      { path: "stats", element: <StatsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
