import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "./components/theme/theme-provider";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

export function App() {
  return (
    <>
      <ThemeProvider storageKey="pizzahop-theme" defaultTheme="dark">
        <title>pizza.shop</title>
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />;
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
