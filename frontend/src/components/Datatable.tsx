import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, Container } from "@mui/material";

const astrologerColumns = [
  { field: "ID" },
  { field: "Image" },
  { field: "Name" },
  { field: "Email" },
  { field: "Gender" },
  { field: "Languages" },
  { field: "Specialities" },
];
const Datatable = () => {
  const handleEdit = (id) => {
    console.log(id);
  };
  const handleDelete = (id) => {
    console.log(id);
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button
              size="small"
              sx={{
                boxShadow: `none`,
                textTransform: `none`,
              }}
              onClick={(e) => handleEdit(params.row.id)}
            >
              Edit
            </Button>

            <Button
              sx={{
                boxShadow: `none`,
                textTransform: `none`,
              }}
              variant="contained"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <DataGrid
      columns={astrologerColumns.concat(actionColumn)}
      rows={[
        {
          id: 1,
          username: "@MUI",
          age: 20,
        },
      ]}
    />
  );
};

export default Datatable;
