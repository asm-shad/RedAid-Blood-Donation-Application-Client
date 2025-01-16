// import PropTypes from 'prop-types';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { LuPhoneOutgoing } from "react-icons/lu";
import { TbMailOpened } from "react-icons/tb";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12 ">
      <div className="contacts footer bg-black lg:px-[200px] flex flex-col items-center md:flex-row justify-between">
        <div className="flex gap-3 items-center">
          <div className="icon">
            <LuPhoneOutgoing className="text-3xl text-red-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-200 text-md">Emergency Calling</p>
            <p className="text-gray-200">+880 1521445979</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="icon">
            <TbMailOpened className="text-3xl text-red-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-200 text-md">Email Us</p>
            <p className="text-gray-200">www.asmshad@mail.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className="icon">
            <p className="text-gray-200 text-md">{`Let's Connect`}</p>
          </div>
          <div className="flex gap-2">
            <FaFacebook className="text-3xl text-white bg-red-500 rounded-sm p-1" />
            <FaTwitter className="text-3xl text-white bg-red-500 rounded-sm p-1" />
            <FaInstagram className="text-3xl text-white bg-red-500 rounded-sm p-1" />
          </div>
        </div>
      </div>
      <div className="footer pt-10 bg-black flex flex-col md:flex-row text-gray-300">
        <aside className="mx-auto text-center">
          <img className="w-[50px] mx-auto" src={logo} alt="" />
          <p className="text-2xl font-bold text-red-500 ml-6">RedAid</p>
          <p> Working for Humanity</p>
        </aside>
        <div className="flex flex-row gap-4 justify-center mx-auto">
          <nav className="flex flex-col">
            <header className="text-red-500 font-bold text-xl">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="flex flex-col">
            <header className="text-red-500 font-bold text-xl">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav className="flex flex-col">
            <header className="text-red-500 font-bold text-xl">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </div>
      <div className="footer footer-center bg-[#151515] p-4 mt-12">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            <span className="text-red-500"> RedAid</span>
          </p>
        </aside>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
