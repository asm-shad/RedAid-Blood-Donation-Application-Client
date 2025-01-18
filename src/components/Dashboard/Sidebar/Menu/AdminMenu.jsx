import { FaUserCog } from "react-icons/fa";
import { BsPeople, BsFileText, BsDropletHalf } from "react-icons/bs";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    label: "Dashboard Home",
    address: "/dashboard/admin",
    icon: FaUserCog,
  },
  {
    label: "All Users",
    address: "/dashboard/admin/all-users",
    icon: BsPeople,
  },
  {
    label: "All Blood Requests",
    address: "/dashboard/admin/all-donation-requests",
    icon: BsDropletHalf,
  },
  {
    label: "Content Management",
    address: "/dashboard/admin/content-management",
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
