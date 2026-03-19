import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DreamListPage } from "@/pages/DreamListPage";
import { DreamEditorPage } from "@/pages/DreamEditorPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DreamListPage /> },
      { path: "dream/:dreamId", element: <DreamEditorPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
