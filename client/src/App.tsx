/* =============================================================
   App.tsx – ULP Invest
   Routes: Home, Entrepreneurs, Investors, About
   Providers: ThemeProvider (dark), LanguageProvider
   Layout: Navbar (sticky) + page content + Footer
   ============================================================= */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Entrepreneurs from "./pages/Entrepreneurs";
import Investors from "./pages/Investors";
import About from "./pages/About";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/entrepreneurs" component={Entrepreneurs} />
      <Route path="/investors" component={Investors} />
      <Route path="/about" component={About} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen" style={{ background: "oklch(0.18 0.06 250)" }}>
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
