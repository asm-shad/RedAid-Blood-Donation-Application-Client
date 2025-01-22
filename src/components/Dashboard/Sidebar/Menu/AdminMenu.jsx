import { FaUserCog } from "react-icons/fa";
import { BsPeople, BsFileText, BsDropletHalf } from "react-icons/bs";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    label: "Dashboard",
    address: "/dashboard/admin",
    icon: FaUserCog,
  },
  {
    label: "All Users",
    address: "/dashboard/all-users",
    icon: BsPeople,
  },
  {
    label: "All Blood Requests",
    address: "/dashboard/all-donation-requests",
    icon: BsDropletHalf,
  },
  {
    label: "Content Management",
    address: "/dashboard/content-management",
    icon: BsFileText,
  },
];

const AdminMenu = () => (
  <nav>
    {menuItems.map((item, index) => (
      <MenuItem key={index} {...item} />
    ))}
  </nav>
);

export default AdminMenu;
