import React from 'react';
import NavbarHeader from '../../moleculas/Header/NavbarHeader';
import SidebarOrigin from '../Sidebar/SidebarActive/SidebarOrigin';
import Sidebar from '../Sidebar/SidebarInactive/Sidebar';

function Header({ toggleSidebar, sidebarAbierto }) {
  return (
    <>
      <NavbarHeader toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {sidebarAbierto ? <SidebarOrigin /> : <Sidebar />}
    </>
  );
}

export default Header;
