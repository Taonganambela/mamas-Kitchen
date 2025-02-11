
import { TextField, Typography, Snackbar, Alert, IconButton, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IMenu } from "./Home";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import React from "react";
import { LoadingButton } from "@mui/lab";


export const Paid: React.FC = () => {
   const location = useLocation();
   const item: IMenu | undefined = location.state?.item;
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();
   const [loading, setLoading] = React.useState(false);
   const [name, setName] = useState("");
   const [number, setNumber] = useState("");
   const [email, setEmail] = useState("");
   const [errors, setErrors] = useState({ name: "", number: "", email: "" });
   const [successMessage, setSuccessMessage] = useState<string | null>(null);

   // Field validation
   console.log('==>', loading)

   const validateFields = () => {
      let isValid = true;
      const newErrors = { name: "", number: "", email: "" };

      if (!name.trim()) {
         newErrors.name = "Name is required";
         isValid = false;
      }

      if (!number.trim()) {
         newErrors.number = "Number is required";
         isValid = false;
      } else if (!/^\d{11,12}$/.test(number)) {
         newErrors.number = "Enter a valid phone number,starting with";
         isValid = false;
      }

      if (!email.trim()) {
         newErrors.email = "Email is required";
         isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
         newErrors.email = "Enter a valid email address";
         isValid = false;
      }

      setErrors(newErrors);
      return isValid;
   };
   const generateRandomNumber = (small: number, big: number) => {
      return Math.floor(Math.random() * (big - small + 1)) + small;
   }


   const letsNotify = async () => {
      console.log('here')
      // setLoading(true)
      if (!validateFields()) {
         return;
      }

      if (!item) {
         return;
      }

      const { name: itemName, price } = item;

      try {
         // setOpen(true);
         setLoading(true)
         const externalIds = String(generateRandomNumber(100000, 999999999999));
         const response = await axios.post(
            `https://lipila-uat.hobbiton.app/transactions/mobile-money`,
            {
               currency: "ZMW",
               amount: price,
               accountNumber: number,
               fullName: name,
               phoneNumber: number,
               email: email,
               externalId: externalIds,
               narration: `Payment for ${itemName}`,
            },             
            {
               headers: {
                  Authorization: `Bearer LPLSECK-3a16e25fef8a4894bae17a829f004af7`,
                  "Content-Type": "application/json",
               },
            }
         );
         console.log('here also')
         setSuccessMessage("Please wait, while your transaction is being processed!");        // setSuccessMessage(`Your transaction is ${response.data.status}`)
         
         console.log("reached if statement")
         if (response.data.status == "Successful"){
            console.log('status', response.data.success);
            setSuccessMessage(`Your Payment for ${item.name} is successfull `);
         }
         console.log("after if statement");
            setLoading(true);
         // setOpen(false);
         setName("");
         setNumber("");
         setEmail("");
         console.log("API response:", response.data);
         setOpen(true);
         setLoading(false);
         setSuccessMessage(`Your transaction is ${response.data.status}, Please confirm your final status from the counter from the counter`);        // setSuccessMessage(`Your transaction is ${response.data.status}`)

      } catch (error) {
         console.error("API request error:", error);
         setSuccessMessage("An error occurred verify your input data . Please try again."); 
         setOpen(true);
         setLoading(false)
      }
   };

   const handleClose = (
      _event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
   ) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpen(false);
   };

   const back = () => {
      navigate("/");
   }

   return (
      <div className="">
         <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
         >
            <Alert
               onClose={handleClose}
               severity={successMessage?.includes("error") ? "error" : "success"}
               variant="outlined"
               sx={{ width: "100%" }}
            >
               {successMessage}
            </Alert>
         </Snackbar>



         <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
               className="bg-white p-8 rounded shadow-md w-full max-w-md"
               noValidate
            >
               <div>
                  <IconButton onClick={back}>
                     <ArrowBackOutlinedIcon />
                  </IconButton>
               </div>
               <h1 className="text-2xl font-bold mb-6 text-center">Make payment</h1>
               {item ? (
                  <div className="mb-4">
                     <div className="mb-4 items-center justify-center flex flex-col gap-0">
                        <img src={item.image} alt={item.name} className="h-24 mb-6" />
                        <Typography variant="body1">You Selected</Typography>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body1">
                           Price: ZMW  {item.price.toFixed(2)}
                        </Typography>
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
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     error={Boolean(errors.name)}
                     helperText={errors.name}
                  />
               </div>
               <div className="mb-4">
                  <TextField
                     label="Number"
                     variant="outlined"
                     type="tel"
                     fullWidth
                     className="bg-gray-50"
                     value={number}
                     onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 12) {
                           setNumber(inputValue);
                           
                        }
                     }}
                     error={Boolean(errors.number)}
                     helperText={errors.number}
                  />
               </div>
               <div className="mb-4">
                  <TextField
                     label="Email"
                     variant="outlined"
                     type="email"
                     fullWidth
                     className="bg-gray-50"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     error={Boolean(errors.email)}
                     helperText={errors.email}
                  />
               </div>
               <LoadingButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={letsNotify}
                  loading={loading}
                  loadingPosition="start"
               >
                  Submit
               </LoadingButton>
            </form>
         </div>
      </div>
   );
};
