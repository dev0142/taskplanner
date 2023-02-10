import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import styled from "@emotion/styled";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { alertService } from "../../services/alert.service";
import { useRouter } from "next/router";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import MenuBar from "../../components/MenuBar";
import GroupsIcon from "@mui/icons-material/Groups";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import NextNProgress from "nextjs-progressbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#dadada",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Employees(props) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  console.log(props.allEmployees);
  function createData(name, number, email, action, id) {
    return { name, number, email, action, id };
  }

  const rows = [];
  props.allEmployees.map((item, index) => {
    rows.push(
      createData(item.name, item.number, item.email, <DeleteIcon />, item._id)
    );
  });
  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: true,
  });

  const handleDeleteEmployee = async (e, id) => {
    e.preventDefault();
    let res = await fetch(`${process.env.NEXT_PUBLIC_host}`+"/api/employee", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    if (res.status === 200) {
      alertService.success("Employee deleted successfully", options);
      refreshData();
    }
  };
  const handleAddEmployee = () => {
    router.push("/employees/create");
  };

  return (
    <>
      <MenuBar
        menuBarDisplayName={props.allEmployees.length + " Employees"}
        GroupsIcon={<GroupsIcon fontSize="medium" />}
      />
      <Box
        sx={{
          display: "flex",
          padding: "15px",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {props && props.allEmployees
          ? props.allEmployees.map((item, index) => {
              return (
                <Card
                  sx={{ width: {xs:"100%",sm:"320px"}, margin: "10px", borderRadius: "10px" }}
                >
                  <CardHeader
                    sx={{
                      justifyContent: "center",
                    }}
                    
                    avatar={
                      <Avatar
                        src={
                          "https://avatars.dicebear.com/api/avataaars/" +
                          `${Math.random()}` +
                          ".svg"
                        }
                        sx={{
                          height: "60px",
                          width: "60px",
                          backgroundColor: "#F2F7FA",
                        }}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <DeleteIcon onClick={(e)=>handleDeleteEmployee(e,item._id)}/>
                      </IconButton>
                    }
                  />
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", textTransform: "capitalize" }}
                  >
                    {item.name}
                  </Typography>
                  <CardContent
                    sx={{
                      width: "90%",
                      borderRadius: "10px",
                      margin: "0 auto",
                      height: "150px",
                      backgroundColor: "#F2F8FD",
                    }}
                  >
                    <div>
                      <span style={{ color: "#C5CDD4", fontWeight: "bold" }}>
                        Date Hired
                      </span>
                      <br />
                      {"2nd Jan, 2022"}
                    </div>
                    <br />
                    <div style={{ fontSize: "15px" }}>
                      <MailOutlineIcon fontSize="small" /> {item.email}
                    </div>
                    <div style={{ fontSize: "15px" }}>
                      <LocalPhoneIcon fontSize="small" /> {item.number}
                    </div>
                  </CardContent>
                  <CardActions disableSpacing></CardActions>
                </Card>
              );
            })
          : null}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  let res = await fetch(`${process.env.NEXT_PUBLIC_host}`+"/api/employee", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let allEmployees = await res.json();

  return {
    props: { allEmployees },
  };
}
