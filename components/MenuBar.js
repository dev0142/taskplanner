import React from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box  from "@mui/material/Box";
import HomeIcon from '@mui/icons-material/Home';
import Typography from "@mui/material/Typography";

function MenuBar(props) {
  return (
    <>
      <Box
        sx={{
          height: "50px",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          padding: "0px 20px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid black",
              borderRadius: "40px",
              height: "40px",
              width: "40px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.GroupsIcon}
          </div>
          <Typography variant="h5" sx={{ padding: "0px 10px" }}>
            {props.menuBarDisplayName}
          </Typography>
        </div>
    
      </Box>
    </>
  );
}

export default MenuBar;
