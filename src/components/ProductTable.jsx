import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useStockCalls from "../services/useStockCalls";

export default function ProductTable() {
  const { products } = useSelector((state) => state.stock);

  const { deleteStock } = useStockCalls();

  const columns = [
    {
      field: "_id",
      headerName: "#",
      flex: 1.2,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "categoryId",
      headerName: "Category",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => props.row?.categoryId?.name,
    },
    {
      field: "Brand",
      headerName: "Brand",
      flex: 1.2,
      headerAlign: "center",
      valueGetter: (props) => props.row?.brandId?.name,
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      width: 110,
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      getActions: (props) => [
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          onClick={() => deleteStock("products", props?.row?._id)}
          label="Delete"
        />,
      ],
    },
  ];

  function getRowId(row) {
    return row._id;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={products}
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
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
