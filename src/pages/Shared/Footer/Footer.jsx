import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { LuPhoneOutgoing } from "react-icons/lu";
import { TbMailOpened } from "react-icons/tb";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white pt-12">
      <div className="container mx-auto">
        <div className="bg-red-600 lg:px-[150px] py-6 flex flex-col items-center md:flex-row justify-between">
          <div className="flex gap-3 items-center">
            <div className="icon">
              <LuPhoneOutgoing className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <p className="text-white text-md">Emergency Calling</p>
              <p className="text-white">+880 1521445979</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="icon">
              <TbMailOpened className="text-3xl text-white" />
            </div>
            <div className="flex flex-col">
              <p className="text-white text-md">Email Us</p>
              <p className="text-white">www.asmshad@mail.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="icon">
              <p className="text-white text-md">{`Let's Connect`}</p>
            </div>
            <div className="flex gap-2">
              <FaFacebook className="text-3xl text-white bg-black rounded-sm p-1" />
              <FaTwitter className="text-3xl text-white bg-black rounded-sm p-1" />
              <FaInstagram className="text-3xl text-white bg-black rounded-sm p-1" />
            </div>
          </div>
        </div>
        <div className="pt-10 bg-red-600 flex flex-col md:flex-row text-white">
          <aside className="mx-auto text-center flex items-center">
            {/* Container with rounded background */}
            <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
              <img className="w-[50px]" src={logo} alt="Logo" />
            </div>
            <div>
              <p className="text-5xl font-bold text-white ml-6 font-rancho mb-4">
                RedAid
              </p>
              <p className="ml-6">Working for Humanity</p>
            </div>
          </aside>
          <div className="flex flex-row gap-4 justify-center mx-auto">
            <nav className="flex flex-col">
              <header className="text-white font-bold text-xl">Services</header>
              <a className="link link-hover text-white">Branding</a>
              <a className="link link-hover text-white">Design</a>
              <a className="link link-hover text-white">Marketing</a>
              <a className="link link-hover text-white">Advertisement</a>
            </nav>
            <nav className="flex flex-col">
              <header className="text-white font-bold text-xl">Company</header>
              <a className="link link-hover text-white">About us</a>
              <a className="link link-hover text-white">Contact</a>
              <a className="link link-hover text-white">Jobs</a>
              <a className="link link-hover text-white">Press kit</a>
            </nav>
            <nav className="flex flex-col">
              <header className="text-white font-bold text-xl">Legal</header>
              <a className="link link-hover text-white">Terms of use</a>
              <a className="link link-hover text-white">Privacy policy</a>
              <a className="link link-hover text-white">Cookie policy</a>
            </nav>
          </div>
        </div>
      </div>
      <div className="footer footer-center bg-red-700 p-4 mt-12">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            <span className="text-white font-rancho"> RedAid</span>
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
