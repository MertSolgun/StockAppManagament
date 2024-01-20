import { Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import Alert from "@mui/material/Alert";

export const ErrorMsg = () => {
  return (
    <Alert variant="outlined" severity="error" sx={{ marginTop: "15px" }}>
      Data can not be fetched
    </Alert>
  );
};

export const NoDataMsg = () => {
  return (
    <Alert variant="outlined" severity="warning">
      There is no data
    </Alert>
  );
};

const TableSkeleton = () => {
  return (
    <Stack spacing={3} mt={5}>
      <Skeleton variant="rectangular" width="100%" height={80} />
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={40} />
    </Stack>
  );
};

export default TableSkeleton;
