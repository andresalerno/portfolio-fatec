import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function AnalyticsScript() {
  useEffect(() => {
    const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

    if (!analyticsEndpoint || !websiteId) {
      return;
    }

    const scriptId = "umami-analytics-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.defer = true;
    script.src = `${analyticsEndpoint.replace(/\/+$/, "")}/umami`;
    script.dataset.websiteId = websiteId;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <AnalyticsScript />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
