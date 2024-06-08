import {
  RiDashboard3Line,
  RiAccountCircleFill,
  RiSettings5Line,
} from "react-icons/ri";
import { TbFileAnalytics, TbCategory2 } from "react-icons/tb";
import { SiCoursera } from "react-icons/si";
import { GrChapterAdd } from "react-icons/gr";
import { MdCreateNewFolder, MdPayment, MdMovieFilter, MdOutlineUpdate } from "react-icons/md";

export const navbarRoutes = [
  // {
  //   href: "/",
  //   text: "Home",
  //   auth: false,
  // },
  {
    href: "/subscriptions",
    text: "Suscribete",
    auth: [true, false],
  },
  {
    href: "/cart",
    text: "Carrito",
    auth: [true, false],
  },
  {
    href: "/auth/login",
    text: "Iniciar Sesión",
    auth: [false],
  },
  {
    href: "/auth/register",
    text: "Registrate",
    auth: [false],
  },
  {
    href: "/dashboard",
    text: "Dashboard",
    auth: [true],
  },
];

export const dashboardRoutes = [
  // {
  //   href: "/dashboard",
  //   text: "Dashboard",
  //   icon: RiDashboard3Line,
  //   roles: ["admin", "user"],
  // },
  {
    href: "/dashboard/courses",
    text: "Ver Cursos",
    roles: ["admin", "user"],
    icon: SiCoursera,
  },
  {
    href: "/dashboard/courses/create",
    text: "Crear Cursos",
    roles: ["admin"],
    icon: MdCreateNewFolder,
  },
  {
    href: "/dashboard/chapters/create",
    text: "Crear Capítulos",
    roles: ["admin"],
    icon: GrChapterAdd,
  },
  {
    href: "/dashboard/attachments/create",
    text: "Adjuntar videos",
    roles: ["admin"],
    icon: MdMovieFilter,
  },
  {
    href: "/dashboard/categories",
    text: "Ver Categorias",
    roles: ["admin"],
    icon: TbCategory2,
  },
  {
    href: "/dashboard/categories/create",
    text: "Crear Categorias",
    roles: ["admin"],
    icon: MdCreateNewFolder,
  },
  {
    href: "/dashboard/popularThemes",
    text: "Crear tema popular",
    roles: ["admin"],
    icon: MdOutlineUpdate,
  },
  {
    href: "/dashboard/users",
    text: "Ver Usuarios",
    icon: RiAccountCircleFill,
    roles: ["admin"],
  },
  {
    href: "/dashboard/settings",
    text: "Configuración",
    roles: ["admin"],
    icon: RiSettings5Line,
  },
  {
    href: "/dashboard/analytics",
    text: "Ver Analítica",
    roles: ["admin"],
    icon: TbFileAnalytics,
  },
  {
    href: "/dashboard/payments",
    text: "Ver Pagos",
    roles: ["admin", "user"],
    icon: MdPayment,
  },
];
