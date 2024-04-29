import React, { useRef, useState, useEffect } from "react";
import UserIcon from "./UserIcon";
import { NavLink } from "react-router-dom";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const logout = () => {
    localStorage.setItem("isHidden", "true");
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdown}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center bg-teal-50 rounded-full h-8 w-8 hover:bg-gray-200"
      >
        <UserIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="w-52 h-30 flex items-center justify-center mr-40 mt-36 bg-white rounded-lg ">
          <div className=" w-52 h-30 bg-white border rounded-lg shadow-md">
            <div className="flex items-center justify-center hover:bg-gray-200 hover:rounded-t-lg pl-6">
              <NavLink
                className="flex items-center text-sm  font-serif w-full py-2 text-gray-800 focus:outline-none"
                onClick={() => console.log("Profile clicked")}
                to="/editprofile"
              >
                <img
                  src="/user (1).png"
                  alt="User Profile page"
                  className="h-3 w-8 px-2 justify-center"
                />
                Profile
              </NavLink>
            </div>
            <div className="flex items-center justify-center hover:bg-gray-200 pl-6">
              <NavLink
                className="flex items-center text-sm  font-serif w-full py-2 text-gray-800 focus:outline-none"
                onClick={() => console.log("Profile clicked")}
                to="/notifications"
              >
                <img
                  src="/bell.png"
                  alt="User Profile page"
                  className="h-3 w-8 px-2 justify-center"
                />
                Notifications
              </NavLink>
            </div>
            <div className="flex items-center justify-center hover:bg-gray-200 pl-6">
              <button
                className="text-sm flex items-center font-serif w-full py-2 text-gray-800 focus:outline-none"
                onClick={logout}
              >
                <img
                  src="/sign-out-alt.png"
                  alt="User Profile page"
                  className="h-3 w-8 px-2 justify-center"
                />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
