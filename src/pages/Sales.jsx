import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import SalesModal from "../components/SalesModal";
import { useState } from "react";
import useStockCalls from "../services/useStockCalls";
import SalesTable from "../components/SalesTable";
import TableSkeleton, { ErrorMsg, NoDataMsg } from "../components/dataFetchmsg";
import { useSelector } from "react-redux";

const Sales = () => {
  const [salesinfo, setSalesinfo] = useState({
    brandId: "",
    productId: "",
    quantity: "",
    price: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const { sales, loading, error } = useSelector((state) => state.stock);

  const handleClose = () => {
    setOpen(false);
    setSalesinfo({
      brandId: "",
      productId: "",
      quantity: "",
      price: "",
    });
  };

  const { getStocks } = useStockCalls();

  useEffect(() => {
    getStocks("brands");
    getStocks("products");
    getStocks("sales");
  }, []);
  return (
    <div>
      <Typography variant="h4" gutterBottom color="error">
        Sales
      </Typography>

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ marginBottom: "30px" }}
      >
        New Sales
      </Button>
      <SalesModal
        open={open}
        handleClose={handleClose}
        salesinfo={salesinfo}
        setSalesinfo={setSalesinfo}
      />
      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}
      {!error && !loading && !sales.length && <NoDataMsg />}
      {!loading && !error && sales.length > 0 && (
        <SalesTable
          handleOpen={handleOpen}
          setSalesinfo={setSalesinfo}
          salesinfo={salesinfo}
        />
      )}
    </div>
  );
};

export default Sales;
