import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { alertService } from "../../../services/alert.service";
import AddIcon from "@mui/icons-material/Add";
import MenuBar from "../../../components/MenuBar";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function CreateEmployee() {
  const router = useRouter();
  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: true,
  });

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const textFieldStyle = {
    margin: "10px",
  };
  const handleClick = async (e) => {
    e.preventDefault();
    let res = await fetch(process.env.NEXT_PUBLIC_host + "/api/employee", {
      method: "POST",
      body: JSON.stringify({
        name,
        number,
        email,
      }),
    });
    if (res.status === 200) {
      alertService.success("Employee added successfully", options);
      router.push("/employees");
    }
  };
  return (
    <>
    <MenuBar
        menuBarDisplayName="Add an Employee"
        GroupsIcon={<PersonAddAlt1Icon fontSize="medium" />}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Box
          component="form"
          sx={{
            width: {xs:"90%",md:"40%"},
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            sx={textFieldStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            label="Full Name"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={number}
            type="number"
            fullWidth
            onChange={(e) => setNumber(e.target.value)}
            sx={textFieldStyle}
            label="Contact Number"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={textFieldStyle}
            variant="outlined"
          />
          <Button
            sx={textFieldStyle}
            onClick={handleClick}
            fullWidth
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
