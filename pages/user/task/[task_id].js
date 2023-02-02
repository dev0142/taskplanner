import React, { useState, useEffect } from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import MenuBar from "../../../components/MenuBar";
import { Divider, Avatar, Grid, Paper } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { alertService } from "../../../services/alert.service";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";

function TaskDetails(props) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [assigneeName, setAssigneeName] = useState(
    props.specificTask.assigneeName
  );
  const [commentBody, setCommentBody] = useState("");

  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: true,
  });

  const handleStatusChange = async (e, id, updatedStatus) => {
    e.preventDefault();
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_host}` +
        "/api/" +
        `${id}` +
        "?source=statusChange",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStatus),
      }
    );
    if (res.status === 200) {
      alertService.success("Task updated successfully", options);
    }
  };
  const handleCommentUpdate = async (e, taskId) => {
    let commentBy;
    if(Cookies.get("AdminloggedIn")){
      commentBy="Admin"
    }
    else{
      commentBy=JSON.parse(window.localStorage.getItem("user")).userName;
    }
    e.preventDefault();
    let res = await fetch(`${process.env.NEXT_PUBLIC_host}` + "/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, commentBody, commentBy }),
    });
    if (res.status === 200) {
      alertService.success("Comment Updated successfully", options);
      setCommentBody("");
      refreshData();
    }
  };
  const [taskStatus, setTaskStatus] = useState(props.specificTask.status);
  return (
    <>
      <MenuBar
        menuBarDisplayName="Task Details"
        GroupsIcon={<AssignmentIcon fontSize="medium" />}
      />
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h4"
          sx={{ height: "50px", padding: "5px 10px", textAlign: "center" }}
        >
          {props.specificTask.taskName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "Wrap",
            padding: "0px 20px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box sx={{ width: "35%", margin: "10px" }}>
            <Box
              sx={{
                height: "auto",
                borderRadius: "7px",
                bgcolor: "#fff",
                padding: "15px",
              }}
            >
              <Typography variant="p">
                <span style={{ fontWeight: "600" }}>Task Creation Date</span> -{" "}
                {props.specificTask.taskCreatedDate}
              </Typography>
              <br />
              <Typography variant="p">
                <span style={{ fontWeight: "600" }}>Task Due Date - </span>
                {props.specificTask.taskDueDate}
              </Typography>
              <br />
              <br />
              <br />
              <Typography variant="p">
                <span style={{ fontWeight: "600" }}>Task Description </span>{" "}
                <br />
                {props.specificTask.taskDesc}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "35%", margin: "10px" }}>
            <Box
              sx={{
                height: "auto",
                borderRadius: "7px",
                bgcolor: "#fff",
                padding: "23px",
              }}
            >
              <TextField
                id="input-with-sx"
                label="Task Status"
                variant="outlined"
                select
                size="small"
                fullWidth
                value={taskStatus}
                sx={{ marginBottom: "20px" }}
                color={
                  taskStatus === "Completed"
                    ? "success"
                    : taskStatus === "To do"
                    ? "primary"
                    : taskStatus === "In Progress"
                    ? "info"
                    : "primary"
                }
                onChange={(e) => {
                  setTaskStatus(e.target.value);
                  handleStatusChange(e, props.specificTask._id, e.target.value);
                }}
              >
                <MenuItem value="To do">To do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
              <TextField
                id="input-with-sx"
                label="Task Assignee"
                variant="outlined"
                size="small"
                disabled
                error={!assigneeName ? true : false}
                value={assigneeName}
                fullWidth
              ></TextField>
            </Box>
          </Box>
          <Box sx={{ width: "20%", margin: "10px" }}>
            <Box
              sx={{
                height: "auto",
                borderRadius: "7px",
                bgcolor: "#fff",
                padding: "23px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ textTransform: "none", padding: "6px" }}
                startIcon={<TaskAltIcon />}
                variant="contained"
              >
                Mark as complete
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "20px 30px",
          }}
        >
          <Box
            sx={{
              borderRadius: "7px",
              padding: "15px",
            }}
          >
            <>
              <h3>Comments</h3>
              <Paper style={{ padding: "40px 20px" }}>
                {props.commentData.map((item, index) => {
                  return (
                    <Grid key={index} container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            "https://avatars.dicebear.com/api/avataaars/3.svg"
                          }
                        />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h5 style={{ margin: 0, textAlign: "left" }}>
                          {item.commentBy}
                        </h5>
                        <p style={{ textAlign: "left" }}>{item.commentBody}</p>
                        <p style={{ textAlign: "right", color: "gray" }}>
                          posted 1 sec ago
                        </p>
                        <Divider
                          variant="fullWidth"
                          style={{ margin: "10px 0" }}
                        />
                      </Grid>
                    </Grid>
                  );
                })}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    fontSize="small"
                    src={"https://avatars.dicebear.com/api/avataaars/2.svg"}
                  ></Avatar>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Enter your comment"
                    fullWidth
                    value={commentBody}
                    sx={{
                      padding: "0px 15px",
                      "& label": { padding: "0px 15px" },
                    }}
                    onChange={(e) => setCommentBody(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SendIcon
                            onClick={(e) => {
                              handleCommentUpdate(e, props.specificTask._id);
                            }}
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                            size="large"
                          />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </div>
              </Paper>
            </>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TaskDetails;

export async function getServerSideProps(context) {
  const id = context.params.task_id;

  const [specificTaskRes, commentDataRes] = await Promise.all([
    fetch("http://localhost:3000/api/" + `${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    fetch("http://localhost:3000/api/comments?task=" + `${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
  ]);
  const [specificTask, commentData] = await Promise.all([
    specificTaskRes.json(),
    commentDataRes.json(),
  ]);
  return {
    props: { specificTask, commentData },
  };
}
