import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AppsIcon from "@mui/icons-material/Apps";
import Box from "@mui/material/Box";
import { Drawer, Toolbar } from "@mui/material";
import Divider from "@mui/material/Divider";
import GroupsIcon from "@mui/icons-material/Groups";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Cookies from "js-cookie";

function Sidebar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 240;
  const { window } = props;

  const menuItemList = [
    {
      text: "Dashboard",
      icon: <InboxIcon />,
      to: "/",
    },
    {
      ...(Cookies.get("EmployeeLoggedIn") && {
        text: "Assigned Task",
        icon: <TaskAltIcon />,
        to: "/user/task",
      }),
    },
    {
      ...(Cookies.get("EmployeeLoggedIn") && {
        text: "Profile",
        icon: <TaskAltIcon />,
        to: "/profile",
      }),
    },
  ];

  const secondaryMenuItemList = [
    {
      text: "Add a Task",
      icon: <AddIcon />,
      to: "/task/create",
    },
    {
      text: "All Task",
      icon: <TaskAltIcon />,
      to: "/task",
    },
    {
      text: "Add an Employee",
      icon: <AddIcon />,
      to: "/employees/create",
    },
    {
      text: "All Employees",
      icon: <GroupsIcon />,
      to: "/employees",
    },
  ];
  const [primaryMenuSelected, setPrimaryMenuSelected] = useState("");
  const [secondaryMenuSelected, setSecondaryMenuSelected] = useState("");

  const drawer = (
    <div>
      <Divider />
      <List>
        {menuItemList.map((item, index) => {
          const { text, icon } = item;
          if (!text || !icon) return null;
          return (
            <ListItem
              sx={{
                color: "#C3C9D2",
                textDecoration: "none",
                margin: "5px 0px",
                "&:hover": {
                  textDecoration: "none",
                  bgcolor: "#FFD831",
                  borderRadius: "10px",
                },
              }}
              component={Link}
              href={item.to}
              key={text}
              disablePadding
              onClick={() => {
                setPrimaryMenuSelected(index);
                setSecondaryMenuSelected("");
                props.setMobileOpen(false);
              }}
            >
              <ListItemButton
                selected={index === primaryMenuSelected ? true : false}
                sx={{
                  "&:hover": {
                    color: "#000",
                    "& .iconHoverColor": {
                      color: "#000",
                    },
                  },
                  "&.Mui-selected": {
                    textDecoration: "none",
                    bgcolor: "#FFD831",
                    borderRadius: "10px",
                    "& .iconHoverColor": {
                      color: "#000",
                    },
                  },
                }}
              >
                <ListItemIcon
                  className="iconHoverColor"
                  sx={{ color: "#8693A8" }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  className="iconHoverColor"
                  sx={{
                    color: "#C3C9D2",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {Cookies.get("AdminLoggedIn") &&
          secondaryMenuItemList.map((item, index) => {
            const { text, icon } = item;
            return (
              <ListItem
                sx={{
                  color: "#C3C9D2",
                  textDecoration: "none",
                  margin: "5px 0px",
                  "&:hover": {
                    textDecoration: "none",
                    bgcolor: "#FFD831",
                    color: "black",
                    borderRadius: "10px",
                  },
                }}
                component={Link}
                href={item.to}
                key={text}
                disablePadding
                onClick={() => {
                  setSecondaryMenuSelected(index);
                  setPrimaryMenuSelected("");
                  props.setMobileOpen(false);
                }}
              >
                <ListItemButton
                  selected={index === secondaryMenuSelected ? true : false}
                  sx={{
                    "&:hover": {
                      color: "#000",
                      "& .iconHoverColor": {
                        color: "#000",
                      },
                    },
                    "&.Mui-selected": {
                      textDecoration: "none",
                      bgcolor: "#FFD831",
                      borderRadius: "10px",
                      "& .iconHoverColor": {
                        color: "#000",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    className="iconHoverColor"
                    sx={{ color: "#8693A8" }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    className="iconHoverColor"
                    sx={{
                      color: "#C3C9D2",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: {md:0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none", },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: "auto",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: "auto",
            bgcolor: "#1C212D",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
