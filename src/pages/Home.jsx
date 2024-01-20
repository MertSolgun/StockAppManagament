import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import KPI from "../components/KPI";
import Chart from "../components/Chart";
import useStockCalls from "../services/useStockCalls";

const Home = () => {
  const { getStocks } = useStockCalls();
  useEffect(() => {
    getStocks("sales");
    getStocks("purchases");
  }, []);
  return (
    <div>
      <KPI />
      <Chart />
    </div>
  );
};

export default Home;
