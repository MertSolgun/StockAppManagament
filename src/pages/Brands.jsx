import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import useStockCalls from "../services/useStockCalls";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/BrandModal";
import { useState } from "react";
import TableSkeleton, { ErrorMsg, NoDataMsg } from "../components/dataFetchmsg";

const Brands = () => {
  const [brand, setBrand] = useState({
    name: "",
    image: "",
  });

  const { getStocks } = useStockCalls();
  const { brands, error, loading } = useSelector((state) => state.stock);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setBrand({ name: "", image: "" });
  };

  useEffect(() => {
    getStocks("brands");
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom color="error">
        Brands
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Brand
      </Button>

      <BrandModal
        open={open}
        handleClose={handleClose}
        brand={brand}
        setBrand={setBrand}
      ></BrandModal>

      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}
      {!error && !loading && !brands.length && <NoDataMsg />}
      {!loading && !error && brands.length > 0 && (
        <Grid
          container
          spacing={3}
          mt={3}
          justifyContent="center"
          margin="auto"
        >
          {brands.map((brand, index) => (
            <Grid item key={index}>
              <BrandCard
                brand={brand}
                handleOpen={handleOpen}
                setBrand={setBrand}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Brands;
