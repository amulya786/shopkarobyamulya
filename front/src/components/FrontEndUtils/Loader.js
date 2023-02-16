import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Loader() {
  return (
    <div className='container'>
      {/* <h1 style={{textAlign:"center",width:"100%"}}>Loading...</h1> */}
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <h3 style={{ margin:"10px" }}>loading....</h3>
    </Box>
    </div>
  )
}

export default Loader