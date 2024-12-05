import { Divider, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

export interface IMenu {
   id: number;
   name: string;
   Description: string;
   price: number;
   image: string;
}

const foodItems = [
   {
      id: 1,
      name: "Pizza Margherita",
      Description : "Tastiest food that will leave you wanting more",
      price: 50,
      image: "pizza.jpeg", 
   },
   {
      id: 2,
      name: "Spaghetti Carbonara",
      Description : "Tastiest food that will leave you wanting more",
      price: 50,
      image: "spagetti.jpeg",
   },
   {
      id: 3,
      name: "Grilled Chicken",
      Description : "Tastiest food that will leave you wanting more",
      price: 50,
      image: "chicken.jpeg", 
   },
   {
      id: 4,
      name: "Caesar Salad",
      Description : "Tastiest food that will leave you wanting more",
      price: 50,
      image: "salad.jpeg", 
   },
   {
      id: 5,
      name: "Potato Salads",
      Description : "Tastiest food that will leave you wanting more",
      price: 50,
      image: "potatoe.jpeg", 
   },
];

export const Home: React.FC = () => {

   const navigate = useNavigate();

   const letsNavigate = (item: IMenu) => {
      console.log("Navigating with item:", item);  // Add this log
      navigate("/paid", { state: { item } });
   };
   return (
      <div className="p-10">
         <div>
            <p className="text-3xl font-semibold">Mamas Kitchen</p>
            <Divider />
         </div>
         <div className="p-5 grid grid-cols-1 gap-14 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
            {foodItems.map((item) => (
               <Card key={item.id} className="shadow-md">
                  <CardMedia
                     component="img"
                     height="140"
                     image={item.image}
                     alt={item.name}
                  />
                  <CardContent>
                     <Typography variant="h6" component="div" className="font-medium">
                        {item.name}
                     </Typography>
                     <Typography variant="body1">{item.Description}</Typography>
                     <Typography variant="body2" color="text.secondary">
                        ZMW {item.price.toFixed(2)}
                     </Typography>
                     <div className="items-center justify-center flex">
                        <Button variant="contained" color="primary" className="mt-2 w-full" onClick={() => letsNavigate(item)}>
                        Order
                     </Button>
                     </div>
                  
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
};

