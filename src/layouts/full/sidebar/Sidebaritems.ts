export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
      },
      {
        name: "Job Board",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/jobs",
      },
      {
        name: "Applications",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/applications",
      },
    ],
  },
  {
    heading: "ADMIN",
    children: [
      {
        name: "Ingestion Engine",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/admin/ingestion",
      },
      {
        name: "Sources",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/admin/ingestion/sources",
      },
      {
        name: "Companies",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/admin/companies",
      },
      {
        name: "Ingestion History",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/admin/ingestion/history",
      },
      {
        name: "Error Logs",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/admin/ingestion/logs",
      },
    ],
  },
  {
    heading: "UTILITIES",
    children: [
      {
        name: "Typography",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/ui/typography",
      },
      {
        name: "Table",
        icon: "solar:bedside-table-3-linear",
        id: uniqueId(),
        url: "/ui/table",
      },
      {
        name: "Form",
        icon: "solar:password-minimalistic-outline",
        id: uniqueId(),
        url: "/ui/form",
      },
      {
        name: "Shadow",
        icon: "solar:airbuds-case-charge-outline",
        id: uniqueId(),
        url: "/ui/shadow",
      },
    ],
  },
  {
    heading: "AUTH",
    children: [
      {
        name: "Login",
        icon: "solar:login-2-linear",
        id: uniqueId(),
        url: "/auth/login",
      },
      {
        name: "Register",
        icon: "solar:shield-user-outline",
        id: uniqueId(),
        url: "/auth/register",
      },
    ],
  },
  {
    heading: "EXTRA",
    children: [
      {
        name: "Icons",
        icon: "solar:smile-circle-outline",
        id: uniqueId(),
        url: "/icons/solar",
      },
      {
        name: "Sample Page",
        icon: "solar:notes-minimalistic-outline",
        id: uniqueId(),
        url: "/sample-page",
      },
    ],
  },
];

export default SidebarContent;
