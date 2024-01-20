import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import { getStocksSuccess } from "../features/stockSlice";
import useStockCalls from "../services/useStockCalls";
import ProductTable from "../components/ProductTable";
import { useSelector, useStore } from "react-redux";
import TableSkeleton, { ErrorMsg, NoDataMsg } from "../components/dataFetchmsg";

const Products = () => {
  const [productinfo, setProductinfo] = useState({
    categoryId: "",
    brandId: "",
    name: "",
  });

  const { products, error, loading } = useSelector((state) => state.stock);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const { getStocks } = useStockCalls();

  useEffect(() => {
    getStocks("products");
    getStocks("categories");
    getStocks("brands");
  }, []);

  const handleClose = () => {
    setOpen(false);
    setProductinfo({
      categoryId: "",
      brandId: "",
      name: "",
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom color="error">
        Products
      </Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: "40px" }}
        onClick={handleOpen}
      >
        New Product
      </Button>
      <ProductModal
        open={open}
        handleClose={handleClose}
        productinfo={productinfo}
        setProductinfo={setProductinfo}
      />
      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}
      {!error && !loading && !products.length && <NoDataMsg />}
      {!loading && !error && products.length > 0 && <ProductTable />}
    </div>
  );
};

export default Products;
