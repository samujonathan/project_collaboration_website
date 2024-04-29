// NavBar.js
import React from 'react';
import LogoLink from './ui/LogoLink';
import { NavLink } from 'react-router-dom';
import UserIcon from './ui/UserIcon';

import Icon from './ui/Icon';
import UserDropdown from './ui/UserDropdown';

export default function NavBar({ isLoggedIn }) {
  return (
  <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-teal-50">
      <LogoLink href="/" text="VCOLLAB" className="flex items-center justify-center font-serif text-lg font-medium text-gray-800" icon={<Icon className="h-12 w-12" />} />
      <nav className="hidden md:flex items-center gap-6 justify-center">
        {isLoggedIn && ( // Show navigation links if logged in
          <>
            <NavLink className="text-sm font-medium hover:underline underline-offset-4" to="/projects">
              Projects
            </NavLink>
            <NavLink className="text-sm font-medium hover:underline underline-offset-4" to="/live-projects">
              View Live Projects
            </NavLink>
          </>
        )}
      </nav>
      <div className="flex items-center gap-6 justify-center">
        {!isLoggedIn && ( // Show sign-up button if not logged in
          <>
          <NavLink className="text-sm font-medium hover:underline underline-offset-4 font-serif" to="/signup">
            Sign Up
          </NavLink>
        
          <NavLink className="text-sm font-medium hover:underline underline-offset-4 mr-3 font-serif" to="/login">
            Login
          </NavLink>
          </>
        )}
        {isLoggedIn && ( // Show profile and profile page buttons if logged in
          <>
          
              <div className="flex items-center justify-center h-8 w-8 rounded-full">
                <UserDropdown/>
              </div>
            
          </>
        )}
      </div>
    </header>
  );
}
