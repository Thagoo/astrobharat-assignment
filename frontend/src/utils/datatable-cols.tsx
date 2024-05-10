import { Avatar } from "@mui/material";

export const astrologerColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "astrologer",
    headerName: "Astrologer",
    width: 150,

    renderCell: (params: any) => {
      return (
        <Avatar
          src={params.row.image}
          alt={params.row.name}
          sx={{ my: "2px" }}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "languages",
    headerName: "Languages",
    width: 100,
  },
  {
    field: "specialties",
    headerName: "Specialties",
    width: 120,
  },
];
