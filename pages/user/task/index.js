import { useEffect, useState, React } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { alertService } from "../../../services/alert.service";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import MenuBar from "../../../components/MenuBar";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Task() {
  const [userTasks, setUserTasks] = useState([]);
  const router = useRouter();
  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: true,
  });
  const [contentLoading, setContentLoading] = useState(true);

  const handleGetAllAssignedTask = async () => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_host}` +
          "/api/task?userId=" +
          `${JSON.parse(window.localStorage.getItem("user")).userEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "*",
          },
        }
      );
      if (!res.ok) {
        throw Error("Network Error"); //error from axios
      }
      let wow = await res.json();
      setUserTasks(wow.allAssignedTasks);
      setContentLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetAllAssignedTask();
  }, []);
  return (
    <>
      <MenuBar
        menuBarDisplayName={userTasks.length + " Tasks"}
        GroupsIcon={<AssignmentIcon fontSize="medium" />}
      />
      {contentLoading ? (
        <div
          style={{
            height: "80vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {userTasks &&
            userTasks.map((item, index) => {
              return (
                <Card key={index}
                  sx={{ width: "333px", margin: "10px", borderRadius: "10px" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.replace(`/user/task/${item._id}`);
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        textAlign: "right",
                        padding: "0px 10px",
                        fontSize: "14px",
                      }}
                    >
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
                  </CardActions>
                </Card>
              );
            })}
        </Box>
      )}
    </>
  );
}
