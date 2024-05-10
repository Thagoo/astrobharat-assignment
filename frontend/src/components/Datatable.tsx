import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Container } from "@mui/material";
import {
  useDeleteAstrologerMutation,
  useGetAstrologersQuery,
} from "../redux/services/astrologer";

import { astrologerColumns } from "../utils/datatable-cols";

function Datatable() {
  const { data, error, isLoading, refetch } = useGetAstrologersQuery();
  const [deleteAstrologer] = useDeleteAstrologerMutation();
  const router = useNavigate();

  const handleEdit = (id: string) => {
    router(`/${id}`);
  };
  const handleDelete = (id: string) => {
    deleteAstrologer(id);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div>
            <Button
              size="small"
              sx={{
                boxShadow: `none`,
                textTransform: `none`,
              }}
              onClick={(e) => handleEdit(params.row._id)}
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
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Container sx={{ height: "90vh" }}>
      <DataGrid
        loading={isLoading}
        columns={astrologerColumns.concat(actionColumn)}
        rows={data || []}
        getRowId={(row) => row._id as string}
      />
    </Container>
  );
}

export default Datatable;
