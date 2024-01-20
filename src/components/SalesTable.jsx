import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import useStockCalls from "../services/useStockCalls";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export default function SalesTable({ handleOpen, setSalesinfo }) {
  const { sales } = useSelector((state) => state.stock);

  const { deleteStock } = useStockCalls();
  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1.5,
      valueGetter: (props) =>
        new Date(props.row?.createdAt).toLocaleDateString("tr"),
      headerAlign: "center",
      align: "center",
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1.2,
      valueGetter: (props) => props.row?.brandId?.name || "",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productId",
      headerName: "Product",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
      valueGetter: (props) => props.row?.productId?.name || "",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      align: "center",
      headerAlign: "center",
      type: "number",
      flex: 1.5,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1.5,
      align: "center",
      editable: true,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (props) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            handleOpen();
            setSalesinfo({
              _id: props?.row?._id,
              brandId: props.row?.brandId?._id,
              productId: props.row?.productId?._id,
              quantity: props.row?.quantity,
              price: props.row?.price,
            });
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<DeleteForever />}
          onClick={() => deleteStock("sales", props.row._id)}
          label="Delete"
        />,
      ],
    },
  ];

  function getRowId(row) {
    return row._id;
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={sales}
        columns={columns}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
