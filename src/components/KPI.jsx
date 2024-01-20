import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { amber, pink, deepOrange, deepPurple } from "@mui/material/colors";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const KPI = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const totalSales = sales?.reduce((acc, val) => acc + val.amount, 0);
  const purchasesTotal = purchases?.reduce((acc, val) => acc + val.amount, 0);

  const profitTotal = totalSales - purchasesTotal;

  const kpiData = [
    {
      id: 1,
      title: "Sales",
      amount: `${totalSales}`,
      icon: <MonetizationOnIcon sx={{ fontSize: "2rem" }} />,
      bgColor: deepPurple[100],
      color: deepPurple[600],
    },
    {
      id: 2,
      title: "Profit",
      amount: `${profitTotal}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "2rem" }} />,
      bgColor: amber[100],
      color: amber[600],
    },
    {
      id: 3,
      title: "Purchases",
      amount: `${purchasesTotal}`,
      icon: <PaymentsIcon sx={{ fontSize: "2rem" }} />,
      bgColor: pink[100],
      color: pink[600],
    },
  ];

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      gap={5}
    >
      {kpiData.map((item) => (
        <Paper
          elevation={10}
          key={item.id}
          sx={{
            display: "flex",
            padding: "15px",
            width: "450px",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Avatar
            sx={{
              bgcolor: item.bgColor,
              width: "70px",
              height: "70px",
              color: item.color,
            }}
          >
            {item.icon}
          </Avatar>
          <Box>
            <Typography variant="button">{item.title}</Typography>
            <Typography variant="h4">${item.amount}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default KPI;
