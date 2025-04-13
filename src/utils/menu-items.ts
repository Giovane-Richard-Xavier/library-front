import { Book, Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Enum_Routes } from "../../routes";

export const items = [
  {
    title: "Home",
    url: Enum_Routes.HOME,
    icon: Home,
  },
  {
    title: "Livros",
    url: Enum_Routes.BOOKS,
    icon: Inbox,
  },
  {
    title: "Autores",
    url: Enum_Routes.AUTHORS,
    icon: Calendar,
  },
  {
    title: "Editoras",
    url: Enum_Routes.PUBLISHER,
    icon: Book,
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
