import { FaHome } from "react-icons/fa";
import { BsFileText, BsDropletHalf } from "react-icons/bs";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    label: "Dashboard Home",
    address: "/dashboard/volunteer",
    icon: FaHome,
  },
  {
    label: "Blood Requests",
    address: "/dashboard/volunteer/all-donation-requests",
    icon: BsDropletHalf,
  },
  {
    label: "Content Management",
    address: "/dashboard/volunteer/content-management",
    icon: BsFileText,
  },
];

const VolunteerMenu = () => (
  <nav>
    {menuItems.map((item, index) => (
      <MenuItem key={index} {...item} />
    ))}
  </nav>
);

export default VolunteerMenu;
