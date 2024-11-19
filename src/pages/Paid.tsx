import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IMenu } from "./Home";

export const Paid: React.FC = () => {
   const location = useLocation();
   const item:IMenu = location.state?.item;
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();

   const letsNotify = () =>{
      setOpen(true);
      console.log('your order is being processed');
      navigate("/transaction", {state: {item}});
      // setOpen(false)
   }
   
   console.log("Location State:", location.state);
   console.log("Selected Item:", item);

   return (
      <div className="">
          <Snackbar open={open} autoHideDuration={6000} onClose={letsNotify}>
        <Alert
          onClose={letsNotify}
          severity="success"
          variant="outlined"
          sx={{ width: '100%' }}
        >
          Your transaction is being processed
        </Alert>
      </Snackbar>
         <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="bg-white p-8 rounded shadow-md w-full max-w-md">
               <h1 className="text-2xl font-bold mb-6 text-center">Make payment</h1>
               {/* Display selected item */}
               {item ? (
                  <div className="mb-4">
                     <div className="mb-4 items-center justify-center flex flex-col gap-0">
                        <img src={item.image} alt={item.name} className="h-24 mb-6" />
                        <Typography variant="body1">You Selected</Typography>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body1" >Price: ZMW{item.price.toFixed(2)}</Typography>
                     </div>

                  </div>
               ) : (
                  <Typography variant="body1" color="error">
                     No item selected. Please go back and select an item.
                  </Typography>
               )}
               {/* Contact Form */}
               <div className="mb-4">
                  <TextField
                     label="Name"
                     variant="outlined"
                     fullWidth
                     className="bg-gray-50"
                  />
               </div>
               <div className="mb-4">
                  <TextField
                     label="Number"
                     variant="outlined"
                     type="tel"
                     fullWidth
                     className="bg-gray-50"
                  />
               </div>
               <div className="mb-4">
                  <TextField
                     label="Email"
                     variant="outlined"
                     type="email"
                     fullWidth
                     className="bg-gray-50"
                  />
               </div>
               <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => letsNotify()}
               >
                  Submit
               </Button>
            </form>
         </div>
      </div>
   );
};
