import { FaHome } from "react-icons/fa";
import { BsFileText, BsDropletHalf } from "react-icons/bs";
import MenuItem from "./MenuItem";

const VolunteerMenu = () => {
  return (
    <>
      <MenuItem icon={FaHome} label="Dashboard Home" address="/dashboard" />
      <MenuItem
        icon={BsDropletHalf}
        label="Blood Requests"
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

export default VolunteerMenu;
