import "./index.css";

import { RouterProvider } from "react-router";

import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";

export function App() {
  return (
    <>
      <ThemeProvider storageKey="pizzahop-theme" defaultTheme="dark">
        <title>pizza.shop</title>
        <Toaster richColors />
        <RouterProvider router={router} />;
      </ThemeProvider>
    </>
  );
}
