
import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar.jsx";
import Header from "../components/header/Header.jsx";

import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="app-layout">

      {/* Sidebar Layout */}
      <aside className="sidebar-layout">
        <Sidebar />
      </aside>

      {/* Main Content Layout */}
      <div className="main-layout">

        {/* Header Layout */}
        <div className="header-layout">
          <Header />
        </div>

        {/* Body Layout */}
        <main className="body-layout">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;
