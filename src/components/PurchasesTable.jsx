import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import useStockCalls from "../services/useStockCalls";

export default function PurchasesTable({
  purchasesinfo,
  setPurchasesinfo,
  handleOpen,
}) {
  function getRowId(row) {
    return row._id;
  }

  const { deleteStock } = useStockCalls();

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) =>
        new Date(props.row?.createdAt).toLocaleDateString("tr"),
    },
    {
      field: "firmId",
      headerName: "Firm",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => props.row?.firmId?.name,
    },
    {
      field: "brandId",
      headerName: "Brand",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => props.row?.brandId?.name,
    },
    {
      field: "productId",
      headerName: "Product",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => props.row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 1.5,
      type: "actions",
      getActions: (props) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            handleOpen();
            setPurchasesinfo({
              _id: props.row._id,
              firmId: props.row.firmId._id,
              brandId: props.row.brandId._id,
              productId: props.row.productId._id,
              quantity: props.row.quantity,
              price: props.row.price,
            });
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteForever />}
          label="Delete"
          onClick={() => deleteStock("purchases", props.row._id)}
        />,
      ],
    },
  ];

  <DataGrid getRowId={getRowId} />;

  const { purchases } = useSelector((state) => state.stock);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={purchases}
        columns={columns}
        autoHeight
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
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
