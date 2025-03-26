import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Enum_Routes } from "../../routes";

export const items = [
  {
    title: "Home",
    url: Enum_Routes.HOME,
    icon: Home,
  },
  {
    title: "Livros",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Autores",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
