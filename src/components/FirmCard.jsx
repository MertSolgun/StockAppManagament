import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useStockCalls from "../services/useStockCalls";

export default function FirmCard({ firm, handleOpen, setfirminfo }) {
  const { _id, name, phone, image, address } = firm;

  const { deleteStock } = useStockCalls();
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        justifyContent: "center",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={image}
          sx={{ objectFit: "contain", width: "300px", height: "300px" }}
          alt="green iguana"
        />
        <Typography
          sx={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}
        >
          {phone}
        </Typography>
      </CardActionArea>
      <CardActions>
        <EditIcon
          onClick={() => {
            handleOpen();
            setfirminfo(firm);
          }}
        ></EditIcon>
        <DeleteOutlineIcon
          onClick={() => deleteStock("firms", _id)}
        ></DeleteOutlineIcon>
      </CardActions>
    </Card>
  );
}
