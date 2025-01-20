import React from "react";
import logo from "../assets/KelickLogo.svg";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-[256px] h-[100%]  bg-orange-300 flex flex-col justify-between ">
      <div className="w-[220px] h-[60%] bg-yellow-50 m-4">
        <img src={logo} alt="logo" className="h-[26px] w-[105px] ml-4 my-2" />
        <div className="flex">
          <BiHome className="w-10 ml-4 m-1" />
          Dashboard
        </div>
        <div className="flex flex-col">
          <label for="orgs" className="text-lg text-gray-700">
            ORGANIZATION
          </label>
          <select name="orgs">
            <option value="kelick">Kelick</option>
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
        <div>
          <p className="text-lg text-gray-700">MANAGE</p>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/payroll">Payroll</Link>
            </li>
            <li>
              <Link to="/leaves">Leaves</Link>
            </li>
            <li>
              <Link to="/claims">Claims</Link>
            </li>
            <li>...More</li>
          </ul>
        </div>
      </div>
      <div className="w-[220px] h-[246px] bg-yellow-50 m-4">
        <div>
          <p>Free Plan</p>
          <p>1/10 Employee</p>
        </div>
        <div>
          <p>Notifications</p>
          <div className="flex">
            <img
              src=""
              alt="img"
              className="w-5 h-5 rounded-full bg-gray-500"
            />
            John Doe
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
