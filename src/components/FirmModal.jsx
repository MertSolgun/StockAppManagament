import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { style } from "../services/globalStyle";
import { TextField } from "@mui/material";
import useStockCalls from "../services/useStockCalls";

export default function FirmModal({
  open,
  handleClose,
  firminfo,
  setfirminfo,
}) {
  const { postStock, putStocks } = useStockCalls();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfirminfo({ ...firminfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firminfo._id) {
      putStocks("firms", firminfo);
      handleClose();
    } else {
      postStock("firms", firminfo);
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
          onSubmit={handleSubmit}
          style={{ gap: 10 }}
        >
          <TextField
            label="Firm Name"
            name="name"
            id="name"
            type="text"
            value={firminfo.name}
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="Phone"
            name="phone"
            id="phone"
            type="tel"
            value={firminfo.phone}
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="Address"
            name="address"
            id="address"
            type="text"
            value={firminfo.address}
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="image"
            name="image"
            id="image"
            value={firminfo.image}
            type="url"
            onChange={handleChange}
            required
          ></TextField>
          <Button
            type="submit"
            size="large"
            style={{ backgroundColor: "black", color: "white" }}
          >
            {firminfo._id ? "Update Firm" : "Add Firm"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
