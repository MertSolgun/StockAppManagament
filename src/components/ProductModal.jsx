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
  productinfo,
  setProductinfo,
}) {
  const { postStock } = useStockCalls();

  const { categories, brands } = useSelector((state) => state.stock);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductinfo({ ...productinfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postStock("products", productinfo);
    handleClose();
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
          onSubmit={handleSubmit}
          style={{ gap: 10 }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="categoryId"
              id="categoryId"
              value={productinfo.categoryId}
              label="Categories"
              onChange={handleChange}
            >
              {categories.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brands</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="brandId"
              id="brandId"
              value={productinfo.brandId}
              label="Brands"
              onChange={handleChange}
            >
              {brands.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Product Name"
            name="name"
            id="name"
            type="text"
            value={productinfo.name}
            onChange={handleChange}
            required
          ></TextField>
          <Button
            type="submit"
            size="large"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Add Product
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
