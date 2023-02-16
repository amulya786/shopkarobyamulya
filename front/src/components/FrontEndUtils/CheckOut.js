import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
const steps = ['Shipping address', 'Review your order', 'Payment details'];

export default function Checkout({ apiKey }) {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [disableBtn, setDisableBtn] = useState(false);
    // const [totalPay, setTotalPay] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm enableBtn={setDisableBtn} />;
            case 1:
                return <Review />;
            case 2:
                return <Elements stripe={loadStripe(apiKey)}><PaymentForm Step={setActiveStep} /></Elements>;
            default:
                throw new Error('Unknown step');
        }
    }
    return (
        <>
            <Stepper activeStep={activeStep} sx={{ pt: window.innerWidth<600?10:4, pb: 1, width: "90%", margin: "auto" }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className='container'>
                <Container component="main" maxWidth="sm" sx={{ mb: 4, borderRadius: "10px" }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                                <Button className='viewProduct' color='error' variant='outlined' sx={{}} onClick={() => navigate('/product')}>Continue Shopping</Button>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    {activeStep < steps.length - 1 && <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        disabled={!disableBtn}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Next
                                    </Button>}
                                </Box>
                            </>
                        )}
                    </Paper>
                </Container>
            </div>
        </>
    );
}

