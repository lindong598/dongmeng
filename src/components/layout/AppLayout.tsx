import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { TitleBar } from "./TitleBar";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const location = useLocation();
  const theme = useUIStore((s) => s.theme);

  return (
    <div
      className={cn(
        "h-screen w-screen flex flex-col",
        theme === "dark" ? "aurora-bg" : "aurora-bg-light"
      )}
    >
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
