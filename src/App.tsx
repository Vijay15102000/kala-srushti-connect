import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RecipesProvider } from "@/contexts/RecipesContext";
import { SavedRecipesProvider } from "@/contexts/SavedRecipesContext";
import BackgroundMusic from "@/components/BackgroundMusic";
import Index from "./pages/Index.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import RecipeDetail from "./pages/RecipeDetail.tsx";
import Settings from "./pages/Settings.tsx";
import MyRecipes from "./pages/MyRecipes.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <RecipesProvider>
          <SavedRecipesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/my-recipes" element={<MyRecipes />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <BackgroundMusic />
            </TooltipProvider>
          </SavedRecipesProvider>
        </RecipesProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
