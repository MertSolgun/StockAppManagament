import React, { useEffect } from "react";
import useStockCalls from "../services/useStockCalls";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import FirmCard from "../components/FirmCard";
import { useSelector } from "react-redux";
import { useState } from "react";

import TableSkeleton, {
  CardSkeleton,
  ErrorMsg,
  NoDataMsg,
} from "../components/dataFetchmsg";
import FirmModal from "../components/FirmModal";

const Firms = () => {
  const { error, loading } = useSelector((state) => state.stock);
  const [firminfo, setfirminfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setfirminfo({
      name: "",
      phone: "",
      address: "",
      image: "",
    });
  };

  const { getStocks } = useStockCalls();

  const { firms } = useSelector((state) => state.stock);

  useEffect(() => {
    getStocks("firms");
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom color="error">
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Firm
      </Button>
      <FirmModal
        open={open}
        handleClose={handleClose}
        firminfo={firminfo}
        setfirminfo={setfirminfo}
      />

      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}
      {!error && !loading && !firms.length && <NoDataMsg />}
      {!loading && !error && firms.length > 0 && (
        <Grid
          container
          spacing={4}
          mt={3}
          justifyContent="center"
          margin="auto"
        >
          {firms?.map((firm, index) => (
            <Grid item xs={12} sm={7} md={5} xl={3} key={index}>
              <FirmCard
                firm={firm}
                handleOpen={handleOpen}
                setfirminfo={setfirminfo}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Firms;
