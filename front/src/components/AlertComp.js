import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { forwardRef, useState } from 'react'

const Alert = forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertComp({ message, msgType, openAlert }) {

    const [open, setOpen] = useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        openAlert(false);
    };

    return (
        <div>
            <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={open} autoHideDuration={4000} onClose={handleClose}
            >
            <Alert onClose={handleClose} severity={msgType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar></div>
    )
}

export default AlertComp