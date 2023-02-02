import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NextNProgress from "nextjs-progressbar";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header
        mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          setMobileOpen={setMobileOpen}
        />
        <div style={{ display: "flex", flex: "1", flexDirection: "row" }}>
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            setMobileOpen={setMobileOpen}
          />
          <main
            style={{
              flex: "1",
              background: "#F2F7FA",
              height: "calc(100% - 64px)",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
