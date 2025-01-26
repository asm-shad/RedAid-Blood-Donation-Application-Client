import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { LuPhoneOutgoing } from "react-icons/lu";
import { TbMailOpened } from "react-icons/tb";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-white">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-red-500 via-red-600 to-red-700 p-10 items-center justify-between">
        {/* Left Half */}
        <div className="flex-1 p-10 text-center">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p>
            123 ABS Street, Uni 21, Bangladesh <br /> +88 123456789 <br /> Mon -
            Fri: 08:00 - 22:00 <br /> Sat - Sun: 10:00 - 23:00
          </p>
        </div>

        {/* Vertical Line */}
        <div className="border-l-2 border-white md:h-auto h-32 my-4 md:my-0"></div>

        {/* Middle Logo Section */}
        <div className="flex flex-col items-center justify-center px-10 mb-4 md:mb-0">
          <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center mb-4">
            <img className="w-[50px]" src={logo} alt="Logo" />
          </div>
          <p className="text-5xl font-bold text-white font-rancho">RedAid</p>
        </div>

        {/* Vertical Line */}
        <div className="border-l-2 border-white md:h-auto h-32 my-4 md:my-0"></div>

        {/* Right Half */}
        <nav className="flex-1 p-10 text-center">
          <h2 className="text-3xl font-semibold mb-4">Follow Us</h2>
          <h6 className="mb-4">Join us on social media</h6>
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-flow-col gap-4">
              <a>
                <FaFacebook className="text-3xl text-white" />
              </a>
              <a>
                <FaTwitter className="text-3xl text-white" />
              </a>
              <a>
                <FaInstagram className="text-3xl text-white" />
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="footer footer-center bg-gradient-to-r from-[#B91C2D] to-[#9B1C2D] p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            <span className="font-rancho"> RedAid</span>
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
