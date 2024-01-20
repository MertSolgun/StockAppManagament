import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { style } from "../services/globalStyle";
import { TextField } from "@mui/material";
import useStockCalls from "../services/useStockCalls";

export default function BrandModal({ open, handleClose, brand, setBrand }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand({ ...brand, [name]: value });
  };

  const { postStock, putStocks } = useStockCalls();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brand._id) {
      putStocks("brands", brand);
      handleClose();
    } else {
      postStock("brands", brand);
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
        <Box sx={style} component="form" gap={2} onSubmit={handleSubmit}>
          <TextField
            label="Brand Name"
            name="name"
            id="name"
            type="text"
            required
            value={brand.name}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="Image Url"
            name="image"
            id="image"
            value={brand.image}
            type="url"
            onChange={handleChange}
            required
          ></TextField>
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ marginTop: "10px" }}
          >
            {brand._id ? "Update Brand" : "Add Brand"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
