"use client";
import { Grid, Stack, Container } from "@mui/material";
import { AreaChart, BarChart, Card, Subtitle, Title } from "@tremor/react";
import { useSelector } from "react-redux";

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default function Chart() {
  const { sales, purchases } = useSelector((state) => state.stock);

  const salesData = sales?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr"),
    amount: item?.amount,
    name: item.productId?.name,
    quantity: item?.quantity,
    brandPrice: item?.price,
  }));

  const purchasesData = purchases?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr"),
    amount: item.amount,
  }));

  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12} xl={6} md={7}>
          <Card>
            <Title>Total Sales</Title>
            <AreaChart
              className="h-96 mt-4"
              data={salesData}
              index="date"
              categories={["amount"]}
              colors={["indigo"]}
              valueFormatter={valueFormatter}
            />
          </Card>
        </Grid>
        <Grid item xs={12} xl={6} md={7}>
          <Card>
            <Title>Total Purchases</Title>
            <AreaChart
              className="h-96 mt-4"
              data={purchasesData}
              index="date"
              categories={["amount"]}
              colors={["yellow"]}
              valueFormatter={valueFormatter}
            />
          </Card>
        </Grid>
        <Grid item xs={12} xl={12}>
          <Card>
            <Title>Sales statistics</Title>
            <BarChart
              className="mt-6"
              data={salesData}
              index="name"
              categories={["amount"]}
              valueFormatter={valueFormatter}
              showAnimation={true}
              colors={["indigo", "rose", "cyan", "amber", "blue"]}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
