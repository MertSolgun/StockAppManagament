import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { style } from "../services/globalStyle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import useStockCalls from "../services/useStockCalls";

export default function PurchasesModal({
  open,
  handleClose,
  purchasesinfo,
  setPurchasesinfo,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchasesinfo({ ...purchasesinfo, [name]: value });
  };

  const { postStock, putStocks } = useStockCalls();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purchasesinfo._id) {
      putStocks("purchases", purchasesinfo);
      handleClose();
    } else {
      postStock("purchases", purchasesinfo);
      handleClose();
    }
  };

  const { firms, products, brands } = useSelector((state) => state.stock);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={2} component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Firm</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="firmId"
              id="firmId"
              label="Firm"
              required
              onChange={handleChange}
              value={purchasesinfo.firmId}
            >
              {firms.map((item) => (
                <MenuItem value={item._id} key={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="brandId"
              id="brandId"
              value={purchasesinfo?.brandId}
              required
              label="Brand"
              onChange={handleChange}
            >
              {brands.map((item) => (
                <MenuItem value={item._id} key={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="productId"
              id="productId"
              required
              label="Product"
              value={purchasesinfo?.productId}
              onChange={handleChange}
            >
              {products.map((item) => (
                <MenuItem value={item._id} key={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="quantity"
            id="quantity"
            label="Quantity"
            required
            value={purchasesinfo?.quantity}
            onChange={handleChange}
          ></TextField>
          <TextField
            name="price"
            id="price"
            label="Price"
            onChange={handleChange}
            value={purchasesinfo?.price}
            required
          ></TextField>
          <Button variant="contained" size="large" type="submit">
            {purchasesinfo._id ? "Update Purchase" : "Add New Purchase"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
