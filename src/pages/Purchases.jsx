import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import PurchasesTable from "../components/PurchasesTable";
import useStockCalls from "../services/useStockCalls";
import PurchasesModal from "../components/PurchasesModal";
import { useState } from "react";
import TableSkeleton, { ErrorMsg, NoDataMsg } from "../components/dataFetchmsg";
import { useSelector } from "react-redux";

const Purchases = () => {
  const { getStocks, getProPur } = useStockCalls();

  const [purchasesinfo, setPurchasesinfo] = useState({
    firmId: "",
    brandId: "",
    productId: "",
    quantity: "",
    price: "",
  });

  const [open, setOpen] = React.useState(false);

  const { loading, error, purchases } = useSelector((state) => state.stock);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPurchasesinfo({
      firmId: "",
      brandId: "",
      productId: "",
      quantity: "",
      price: "",
    });
  };

  useEffect(() => {
    getProPur();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom color="error">
        Purchases
      </Typography>

      <Button
        variant="contained"
        sx={{ marginBottom: "30px" }}
        onClick={handleOpen}
      >
        New Purchase
      </Button>

      <PurchasesModal
        open={open}
        handleClose={handleClose}
        purchasesinfo={purchasesinfo}
        setPurchasesinfo={setPurchasesinfo}
      />

      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}
      {!error && !loading && !purchases.length && <NoDataMsg />}
      {!error && !loading && purchases.length > 0 && (
        <PurchasesTable
          purchasesinfo={purchasesinfo}
          setPurchasesinfo={setPurchasesinfo}
          handleOpen={handleOpen}
        />
      )}
    </div>
  );
};

export default Purchases;
