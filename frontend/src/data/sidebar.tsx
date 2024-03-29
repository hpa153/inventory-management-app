import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import React from "react";

export type sidebarType = {
  title: string,
  icon: React.ReactNode,
  childrens?: {title: string, path: string}[]
  path?: string,
};

const menu: sidebarType[] = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Contact Us",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
