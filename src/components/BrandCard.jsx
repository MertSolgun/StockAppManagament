import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useStockCalls from "../services/useStockCalls";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

export default function BrandCard({ brand, handleOpen, setBrand }) {
  const { image, name, _id } = brand;
  const { deleteStock } = useStockCalls();
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ paddingLeft: "20px", fontWeight: "bold" }}
        >
          {name}
        </Typography>
        <CardMedia
          component="img"
          image={image}
          style={{ objectFit: "contain", width: "300px", height: "400px" }}
          alt="green iguana"
        />
        <CardContent
          sx={{ display: "flex", justifyContent: "center", gap: "15px" }}
        >
          <EditIcon
            onClick={() => {
              handleOpen();
              setBrand(brand);
            }}
          ></EditIcon>
          <DeleteOutline
            onClick={() => {
              deleteStock("brands", _id);
            }}
          ></DeleteOutline>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
