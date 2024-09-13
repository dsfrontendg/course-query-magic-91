import { HomeIcon, SearchIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import SearchResults from "./pages/SearchResults.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Search",
    to: "/search",
    icon: <SearchIcon className="h-4 w-4" />,
    page: <SearchResults />,
  },
];