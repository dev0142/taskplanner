import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { alertService } from "../services/alert.service";
import { Alert } from "../components/Alert";
import Cookie from "js-cookie";
import { Router, useRouter } from "next/router";

function Login(props) {
  const router=useRouter();
  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: true,
  });
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputProps = {
    paddingBottom: "20px",
  };
  const handleEmployeeLogin = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_host}` + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    let userDetails = await res.json();
    if (res.status === 200) {
      Cookie.set("EmployeeLoggedIn", "true", { expires: 7 });
      Cookie.remove("AdminLoggedIn");
      alertService.success("Employee has logined :(", options);
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          userType: "Employee",
          userName: userDetails.name,
          userEmail: userDetails.email,
          userNumber: userDetails.number,
        })
      );
      props.setEmployeeLogin(true);
      setLoading(false);
    } else {
      props.setAdminLogin(false);
      props.setEmployeeLogin(false);
      setLoading(false);
      alertService.error("You have entered wrong credentails :(", options);
    }
  };

  const handleLogin = () => {
    setLoading(true);
    if (
      email === process.env.NEXT_PUBLIC_adminEmail &&
      password === process.env.NEXT_PUBLIC_adminPassword
    ) {
      Cookie.set("AdminLoggedIn", "true", { expires: 7 });
      Cookie.remove("EmployeeLoggedIn", { path: "/" });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          userType: "Admin",
          userName: "Admin",
        })
      );
      alertService.success("Login Success!!", options);
      props.setAdminLogin(true);
      setLoading(false);
    } else {
      handleEmployeeLogin();
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "primary.dark",
          padding: "0px 30px",
        }}
      >
        <Alert />

        <Box
          sx={{
            width: 400,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: "30px 20px",
            borderRadius: "7px",
          }}
        >
          <TextField
            id="standard-password-input"
            label="Email"
            autoComplete="current-password"
            variant="standard"
            size="small"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            sx={inputProps}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
            variant="standard"
            sx={inputProps}
          />
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleLogin}
          >
            Login
          </LoadingButton>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
