import { FaHome, FaClipboardList } from 'react-icons/fa';
import { BsPlusSquare } from 'react-icons/bs';
import { RiUser3Line } from 'react-icons/ri';
import MenuItem from './MenuItem';

const DonorMenu = () => {
  return (
    <>
      {/* Dashboard Home */}
      <MenuItem 
        icon={FaHome} 
        label="Dashboard" 
        address="/dashboard" 
      />

      {/* Profile */}
      <MenuItem 
        icon={RiUser3Line} 
        label="Profile" 
        address="/dashboard/profile" 
      />

      {/* My Donation Requests */}
      <MenuItem 
        icon={FaClipboardList} 
        label="My Donation Requests" 
        address="/dashboard/my-donation-requests" 
      />

      {/* Create Donation Request */}
      <MenuItem 
        icon={BsPlusSquare} 
        label="Create Donation Request" 
        address="/dashboard/create-donation-request" 
      />
    </>
  );
};

export default DonorMenu;
