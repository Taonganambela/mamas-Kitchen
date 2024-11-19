import { Card, CardContent, Typography } from "@mui/material"

export const Transaction = () => {
  return (
    <div className="p-40 ml-64 mr-64 bg-gray-200 h-lvh">
      <Card className=" shadow-lg">
         <CardContent className="text-center ">
            <Typography variant="h6"> Payment to mamas Kitchen</Typography>
            <Typography className=" text-[80px] text-green-700">✔</Typography>
            <Typography className="text-[40px] font-bold">Successful</Typography>
            </CardContent>
      </Card>
    </div>
  )
}
