import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { style } from "../services/globalStyle";
import { TextField } from "@mui/material";
import useStockCalls from "../services/useStockCalls";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function ProductModal({
  open,
  handleClose,
  salesinfo,
  setSalesinfo,
}) {
  const { brands, products } = useSelector((state) => state.stock);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesinfo({ ...salesinfo, [name]: value });
  };
  const { postStock, putStocks } = useStockCalls();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (salesinfo._id) {
      putStocks("sales", salesinfo);
      handleClose();
    } else {
      postStock("sales", salesinfo);
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          style={{ gap: 10 }}
          onSubmit={handleSubmit}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="brandId"
              name="brandId"
              id="brandId"
              label="Brand"
              value={salesinfo?.brandId}
              onChange={handleChange}
            >
              {brands.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="productId"
              name="productId"
              id="productId"
              label="Product"
              value={salesinfo?.productId}
              onChange={handleChange}
            >
              {products.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            name="quantity"
            id="quantity"
            type="number"
            required
            value={salesinfo?.quantity}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="Price"
            name="price"
            id="price"
            type="number"
            required
            value={salesinfo.price}
            onChange={handleChange}
          ></TextField>
          <Button
            type="submit"
            size="large"
            style={{ backgroundColor: "black", color: "white" }}
          >
            {salesinfo._id ? "Update Sales" : "Add Sales"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
