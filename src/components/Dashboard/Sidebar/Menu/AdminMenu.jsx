import { FaUserCog } from "react-icons/fa";
import { BsPeople, BsFileText, BsDropletHalf } from "react-icons/bs";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Dashboard Home" address="/dashboard" />
      <MenuItem
        icon={BsPeople}
        label="All Users"
        address="/dashboard/all-users"
      />
      <MenuItem
        icon={BsDropletHalf}
        label="All Blood Requests"
        address="/dashboard/all-blood-donation-request"
      />
      <MenuItem
        icon={BsFileText}
        label="Content Management"
        address="/dashboard/content-management"
      />
    </>
  );
};

export default AdminMenu;
