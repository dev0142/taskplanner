import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { alertService } from "../../../services/alert.service";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import MenuItem from "@mui/material/MenuItem";

const getFormattedDate = (objToday) => {
  const wow = objToday.$d.toString();
  var date = wow.substring(0, wow.indexOf(objToday.$y) + 4);
  return date;
};

export default function CreateTask(props) {
  const router = useRouter();
  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: true,
  });

  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [systemTaskCreatedDate, setSystemTaskCreatedDate] = useState(dayjs());
  const [systemTaskDueDate, setSystemTaskDueDate] = useState(dayjs());
  const [taskCreatedDate, setTaskCreatedDate] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const textFieldStyle = {
    margin: "10px",
  };
  useEffect(() => {
    setTaskCreatedDate(getFormattedDate(systemTaskCreatedDate));
    setTaskDueDate(getFormattedDate(systemTaskDueDate));
  }, [systemTaskCreatedDate, systemTaskDueDate]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setAssigneeName();
    let res = await fetch(process.env.NEXT_PUBLIC_host + "/api/task", {
      method: "POST",
      body: JSON.stringify({
        taskName,
        taskDesc,
        taskCreatedDate,
        taskDueDate,
        assignee,
        assigneeName,
        systemTaskDueDate,
      }),
    });
    if (res.status === 200) {
      alertService.success("Task created successfully", options);
      router.push("/task");
    }
  };
  return (
    <>
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
        <Typography variant="h5">Create a task</Typography>
        <Box
          component="form"
          sx={{
            width: "40%",
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
            value={taskName}
            fullWidth
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            label="Task Name"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Task description"
            multiline
            fullWidth
            onChange={(e) => {
              setTaskDesc(e.target.value);
            }}
            value={taskDesc}
            maxRows={4}
          />
          <div style={{ display: "flex" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ margin: "15px 10px 15px 0px" }}>
                <MobileDatePicker
                  label="Created on"
                  onChange={(newDate) => setSystemTaskCreatedDate(newDate)}
                  value={systemTaskCreatedDate}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div style={{ margin: "15px 0px 15px 10px" }}>
                <MobileDatePicker
                  label="Due on"
                  onChange={(newDate) => setSystemTaskDueDate(newDate)}
                  value={systemTaskDueDate}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
          </div>
          <TextField
            id="outlined-select-currency"
            select
            displayEmpty
            fullWidth
            label="Assignee"
            value={assignee}
            onChange={(e) => {
              setAssignee(e.target.value);
              setAssigneeName(event.target.getAttribute("name"));
            }}
          >
            <MenuItem value="" name="">
              <em>Not required</em>
            </MenuItem>
            {props.allEmployees.map((item, index) => (
              <MenuItem key={index} name={item.name} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            sx={textFieldStyle}
            onClick={handleCreateTask}
            fullWidth
            variant="contained"
          >
            Create a task
          </Button>
        </Box>
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
