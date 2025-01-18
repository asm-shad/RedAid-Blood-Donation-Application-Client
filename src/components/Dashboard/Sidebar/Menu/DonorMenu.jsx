import { FaHome, FaClipboardList } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    label: "Dashboard",
    address: "/dashboard/donor",
    icon: FaHome,
  },
  {
    label: "My Donation Requests",
    address: "/dashboard/donor/my-donation-requests",
    icon: FaClipboardList,
  },
  {
    label: "Create Donation Request",
    address: "/dashboard/donor/create-donation-request",
    icon: BsPlusSquare,
  },
];

const DonorMenu = () => (
  <nav>
    {menuItems.map((item, index) => (
      <MenuItem key={index} {...item} />
    ))}
  </nav>
);

export default DonorMenu;
