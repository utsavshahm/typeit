import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Chartkick from "chartkick"
import Chart from 'chart.js/auto';
import { LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts'
import "chartkick/chart.js"
import { useSelector } from 'react-redux';

function Result() {
    
    // const chartRef = useRef(null);

    const resultData = useSelector(state => state.speedGraph)
    const speed = resultData?.speed
    const testTime = resultData?.testTime
    const array = resultData?.speedArray

    console.log(array);
    let i = -2
    const speedArray = array.map((value)=>{
        i+=2
        return {time : i, wpm : value};
    })

    console.log(speedArray)

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
        const data = payload[0].payload
          return (
            <div className="custom-tooltip" style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', color:'orange' }}>
                <p className="label">{`Time: ${data.time}`}</p>
                <p className="label">{`WPM: ${data.wpm}`}</p>
            </div>
          );
        }
      
        return null;
      };
  return (

    <div>
        <Navbar/>


            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <Grid container sx={{border:"2px solid red"}} height={'45vh'} width={'65vw'} >

                    <Grid item xs={2} >
                        <Stack justifyContent={'center'} mt={2} ml={2}>
                            <Typography variant='p' fontSize={'24px'}>wpm</Typography>
                            <Typography variant='p' fontSize={'48px'} fontWeight={800} padding={0} margin={0}>{speed}</Typography>
                            <Typography variant='p' fontSize={'24px'}>acc</Typography>
                            <Typography variant='p' fontSize={'48px'} fontWeight={800} padding={0} margin={0}>90%</Typography>

                            <Typography variant='p' fontSize={'20px'}>test type</Typography>
                            <Typography variant='p' fontSize={'20px'} fontWeight={700}>time {testTime}</Typography>
                            <Typography variant='p' fontSize={'20px'} fontWeight={700}>english words</Typography>

                        </Stack>
                    </Grid>
                    <Grid item xs={10} alignItems={'center'} justifyContent={'center'} >
                        {/* <h1>Graph area</h1> */}
                        {/* <div id="line" style={{ height: '40vh', backgroundColor:"white"}} ref={chartRef}></div> */}
                        

                            <ResponsiveContainer height="95%">
                                <LineChart data={speedArray} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <Line type="monotone" dataKey="wpm" stroke="orange" />
                                    <CartesianGrid stroke="grey"  />
                                    <XAxis dataKey="time" style={{fill : 'white'}}>
                                        <Label value="Time" position="bottom" offset={0} style={{fill : 'white'}}></Label>
                                    </XAxis>
                                    <YAxis style={{fill : 'white'}} >
                                        <Label value="Words Per Minute" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill:'white'}} />
                                    </YAxis>
                                    <Tooltip content={<CustomTooltip/>}/>
                                    
                                </LineChart>
                            </ResponsiveContainer>
                    </Grid>

                </Grid>

            </Stack>




      
    </div>
  );
}

export default Result;
