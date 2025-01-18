import { FaHome, FaFileAlt } from "react-icons/fa";
import { BsPlusCircle, BsDropletHalf } from "react-icons/bs";
import MenuItem from "./MenuItem";

const DonorMenu = () => {
  return (
    <>
      <MenuItem icon={FaHome} label="Dashboard Home" address="/dashboard" />
      <MenuItem
        icon={BsDropletHalf}
        label="My Donation Requests"
        address="/dashboard/my-donation-requests"
      />
      <MenuItem
        icon={BsPlusCircle}
        label="Create Request"
        address="/dashboard/create-donation-request"
      />
    </>
  );
};

export default DonorMenu;
