import React, { useEffect } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts'
import { useSelector } from 'react-redux';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import './result.css'
import { useNavigate } from 'react-router-dom';

function Result(props) {

  
  const navigate = useNavigate(); 
  // if (!localStorage.getItem("testTaken")) {
  //   navigate('/')
  //   // return;
  // }

  useEffect(() => {
    // console.log("hello");
    if (!localStorage.getItem("testTaken")) {
        navigate('/')

      }
    }, [navigate])

  const resultData = useSelector(state => state.speedGraph);
  const speed = resultData?.speed;
  const testTime = resultData?.testTime;
  const accuracy = resultData?.accuracy;
  const array = resultData?.speedArray
  
    // const {speed, testTime, array} = props.result

    // console.log(array);
    let i = -2
    const speedArray = array.map((value)=>{
        i+=2
        return {time : i, wpm : value};
    })

    // console.log(speedArray)

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
        const data = payload[0].payload
          return (
            <div
              className="custom-tooltip"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #ccc",
                padding: "10px",
                color: "white",
              }}
            >
              <p className="label">{`Time: ${data.time}`}</p>
              <p className="label">{`WPM: ${data.wpm}`}</p>
            </div>
          );
        }
      
        return null;
      };
  return (
    <div>
      {/* <Navbar /> */}

      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          container
          // sx={{ border: "2px solid red" }}
          height={"45vh"}
          width={"65vw"}
        >
          <Grid item xs={12} md ={2}>
            <Stack justifyContent={"center"} mt={2} ml={2} >
              <Typography variant="p" fontSize={"24px"}>
                wpm
              </Typography>
              <Typography
                variant="p"
                fontSize={"48px"}
                fontWeight={800}
                padding={0}
                margin={0}
              >
                {speed}
              </Typography>
              <Typography variant="p" fontSize={"24px"}>
                acc
              </Typography>
              <Typography
                variant="p"
                fontSize={"48px"}
                fontWeight={800}
                padding={0}
                margin={0}
              >
                {accuracy}
              </Typography>

              <Typography variant="p" fontSize={"20px"}>
                test type
              </Typography>
              <Typography variant="p" fontSize={"20px"} fontWeight={700}>
                time {testTime}
              </Typography>
              <Typography variant="p" fontSize={"20px"} fontWeight={700}>
                english words
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={10} alignItems={"center"} justifyContent={"center"}>
            <ResponsiveContainer height="95%">
              <LineChart
                data={speedArray}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                
              >
                <Line type="monotone" dataKey="wpm" stroke="orange" />
                <CartesianGrid stroke="#424242" />
                <XAxis dataKey="time" style={{ fill: "#787575" }}>
                  <Label
                    value="Time"
                    position="bottom"
                    offset={0}
                    style={{ fill: "#ccc" }}
                  ></Label>
                </XAxis>
                <YAxis style={{ fill: "#787575" }}>
                  <Label
                    value="Words Per Minute"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle", fill: "white" }}
                  />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
        <div className="next-test">
          <span className="next-test-text" onClick={() => {
            window.location.href = '/'
          }}>New Test</span>{" "}
          <ArrowForwardIosIcon />
        </div>
      </Stack>
    </div>
  );
}

export default Result;
