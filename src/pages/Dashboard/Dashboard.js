import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffA500",
    },
    background: {
      default: "rgba(0, 0, 0, 0.852)",
      paper: "#2c2e31",
    },
    text: {
      primary: "#d1d0c5",
      secondary: "#646669",
    },
  },
  typography: {
    fontFamily: '"Courier New", Courier, monospace',
  },
});

const Dashboard = () => {
  const userData = {
    username: "utsav10",
    dateJoined: "2023-07-15",
    testsTaken: 500,
    highestWpm: 120,
    averageWpm: 85,
    maxAccuracy: 100,
    averageAccuracy: 96.5,
    wpmTypes: {
      15: 0, 
      30: 0, 
      60: 0, 
      120 : 0,
    },
    accTypes: {
      15: 0, 
      30: 0, 
      60: 0, 
      120 : 0,
    },
    recentTests: [
      { id: 1, wpm: 87, accuracy: 97.2, mode: "time 60", date : "" },
      { id: 2, wpm: 92, accuracy: 95.8, mode: "words 50", date : ""},
      { id: 3, wpm: 88, accuracy: 96.5, mode: "time 30", date : "" },
      { id: 4, wpm: 90, accuracy: 97.0, mode: "words 100", date : "" },
      { id: 5, wpm: 86, accuracy: 96.8, mode: "time 60", date : "" },
    ],
  };

  const [data, setData] = useState(userData);

  useEffect(() => {
    // we have to fetch data from the backend

    const token = window.localStorage.getItem("token");
    async function fetchData(){
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const resdata = response.data;
          console.log(resdata);
          
          const { maxWPM, maxAccuracy, avgWPM, avgAccuracy, username, createdAt, totalTests, wpmTypes, accTypes, allTests } = resdata.testData;
          const dateJoined = new Date(createdAt).toDateString().replace(" ", ", ");
          
          const tests = allTests.map((test, index) => {
            return {
              id: index + 1,
              wpm: test.wpm,
              accuracy: test.accuracy,
              date: new Date(test.date).toDateString(),
              mode : `${test.testType} ${test.testTime}`
            };
          })
          setData({
            username: username, 
            dateJoined: dateJoined, 
            testsTaken: totalTests, 
            maxAccuracy: maxAccuracy, 
            highestWpm: maxWPM,
            averageAccuracy: avgAccuracy, 
            averageWpm: avgWPM,
            wpmTypes: wpmTypes, 
            accTypes: accTypes, 
            recentTests : tests
          })
          console.log(resdata);
        } catch (error) {
          console.log("Error occured! ", error);
        }
    }
    fetchData(); 
  }, [])
  // Sample user data


  const StatItem = ({ label, value }) => (
    <Box sx={{ textAlign: "center", p: 1 }}>
      <Typography variant="body2" color="text.secondary" fontSize={"1.1rem"}>
        {label}
      </Typography>
      <Typography variant="h6" color="primary" fontSize={"1.4rem"}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          //   bgcolor: "rgba(0, 0, 0, 0.852)",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  height: "170px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  fontSize={"1.5rem"}
                >
                  {data.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Joined: {data.dateJoined}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper
                sx={{ p: 2, bgcolor: "background.paper", height: "170px" }}
              >
                <Grid container>
                  <Grid item xs={4}>
                    <StatItem label="Highest WPM" value={data.highestWpm} />
                  </Grid>
                  <Grid item xs={4}>
                    <StatItem label="Average WPM" value={data.averageWpm} />
                  </Grid>
                  <Grid item xs={4}>
                    <StatItem
                      label="Highest Accuracy"
                      value={`${data.maxAccuracy}%`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StatItem
                      label="Average Accuracy"
                      value={`${data.averageAccuracy}%`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StatItem label="Tests Taken" value={data.testsTaken} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              gap={3}
            >
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    bgcolor: "background.paper",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid container>
                    <Grid item xs={3}>
                      <StatItem label="15 sec" value={data.wpmTypes[15]} />
                    </Grid>
                    <Grid item xs={3}>
                      <StatItem label="30 sec" value={data.wpmTypes[30]} />
                    </Grid>
                    <Grid item xs={3}>
                      <StatItem label="60 sec" value={data.wpmTypes[60]} />
                    </Grid>
                    <Grid item xs={3}>
                      <StatItem label="120 sec" value={data.wpmTypes[120]} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    bgcolor: "background.paper",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid container>
                    <Grid item xs={3}>
                      <StatItem label="15 sec" value={`${data.accTypes[15]}%`} />
                    </Grid>
                    <Grid item xs={3}>
                      <StatItem label="30 sec" value={`${data.accTypes[30]}%`} />
                    </Grid>
                    <Grid item xs={3}>
                      <StatItem label="60 sec" value={`${data.accTypes[60]}%`}/>
                    </Grid>
                    <Grid item xs={3}>
                      <StatItem label="120 sec" value={`${data.accTypes[120]}%`} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Recent Tests
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "text.secondary" }}>
                          WPM
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          Accuracy
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          Mode
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.recentTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell sx={{ color: "text.primary" }}>
                            {test.wpm}
                          </TableCell>
                          <TableCell sx={{ color: "text.primary" }}>
                            {test.accuracy}%
                          </TableCell>
                          <TableCell sx={{ color: "text.primary" }}>
                            {test.mode}
                          </TableCell>
                          <TableCell sx={{ color: "text.primary" }}>
                            {test.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {data.recentTests.length==0 ? <TakeOneTest/> : <Box/>}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;


function TakeOneTest() {
  return (
    <>
      <div style={{color : "text.secondary", fontSize : "1.1rem", display : "flex", justifyContent : "center", alignItems : "center", height : 200, width : "100%"}}>
        No data found!
      </div>
    </>
  )
}

