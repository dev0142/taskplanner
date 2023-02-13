import { useEffect, useState, React } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { alertService } from "../../services/alert.service";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import MenuBar from "../../components/MenuBar";
import CardActionArea from "@mui/material/CardActionArea";
import taskProgressSvg from "../../images/TaskProgress.svg";

export default function Task(props) {
  const router = useRouter();
  const refreshData = () => {
    router.reload(true);
  };
  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: true,
  });

  const handleDeleteTask = async (e, id) => {
    e.preventDefault();
    let res = await fetch(`${process.env.NEXT_PUBLIC_host}`+"/api/task", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    if (res.status === 200) {
      alertService.success("Task deleted successfully", options);
      refreshData();
    }
  };
  return (
    <>
      <MenuBar
        menuBarDisplayName={props.allTasks.length + " Tasks"}
        GroupsIcon={<AssignmentIcon fontSize="medium" />}
      />
      <Box
        sx={{
          display: "flex",
          padding: "15px",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {props && props.allTasks
          ? props.allTasks.map((item, index) => {
              // const [remainingDate, setRemainingDate] = useState("");
              // const [remainingHour, setRemainingHour] = useState("");
              // const [remainingMin, setRemainingMin] = useState("");
              // const [remainingSec, setRemainingSec] = useState("");
              // useEffect(() => {
              //   var currentDueDate = new Date(item.systemTaskDueDate).getTime();
              //   var myfunc = setInterval(function () {
              //     var now = new Date().getTime();
              //     var timeleft = currentDueDate - now;
              //     var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
              //     var hours = Math.floor(
              //       (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              //     );
              //     var minutes = Math.floor(
              //       (timeleft % (1000 * 60 * 60)) / (1000 * 60)
              //     );
              //     var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
              //     setRemainingDate(days + "day ");
              //     setRemainingHour(hours + "h ");
              //     setRemainingMin(minutes + "m ");
              //     setRemainingSec(seconds + "s ");

              //     // Display the message when countdown is over
              //     if (timeleft < 0) {
              //       clearInterval(myfunc);
              //       setRemainingDate("");
              //       setRemainingHour("");
              //       setRemainingMin("");
              //       setRemainingSec("");
              //     }
              //   }, 1000);
              // }, []);
              return (
                <Card key={index}
                  sx={{ width: {xs:"100%",sm:"333px"}, margin: "10px", borderRadius: "10px" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.replace(`/task/${item._id}`);
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 10px",
                        fontSize: "14px",
                      }}
                    >
                      <span>{item.assigneeName ? item.assigneeName : "Not assigned yet"}</span>
                      <span>{item.status}</span>
                    </div>
                    <CardHeader
                      sx={{ textTransform: "capitalize", padding: "3px 16px" }}
                      title={item.taskName}
                    />
                    <CardContent
                      sx={{
                        width: "100%",
                        borderRadius: "10px",
                        margin: "0 auto",
                        height: "auto",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Typography
                        variant="pre"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          whiteSpace: "pre-line",
                          WebkitLineClamp: "4",
                          WebkitBoxOrient: "vertical",
                          height: "90px",
                        }}
                      >
                        {item.taskDesc}
                      </Typography>
                    </CardContent>
                  </div>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                    disableSpacing
                  >
                    <div>
                      <span style={{ fontWeight: "600" }}>Due Date -</span>{" "}
                      {item.taskDueDate}
                    </div>
                    <div>
                      <IconButton aria-label="share">
                        <ShareIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="add to favorites">
                        <DeleteIcon
                          fontSize="small"
                          onClick={(e) => handleDeleteTask(e, item._id)}
                        />
                      </IconButton>
                    </div>
                  </CardActions>
                </Card>
              );
            })
          : null}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_host}` + "/api/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "*",
      },
    });
    if (!res.ok) {
      throw Error("Network Error"); //error from axios
    }
    let wow = await res.json();

    return {
      props: { allTasks: wow.allTasks },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: { allTasks: [], error: "Network error. Please try again" },
    };
  }
}
