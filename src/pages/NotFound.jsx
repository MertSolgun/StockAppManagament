import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import notfound from "../assets/ntfound.jpg";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">
          <img src={notfound} alt="" style={{ height: "500px" }} />
        </Typography>
        <Button
          variant="contained"
          sx={{ alignItems: "center" }}
          onClick={() => navigate("/stock")}
        >
          Back
        </Button>
      </Stack>
    </div>
  );
};

export default NotFound;
