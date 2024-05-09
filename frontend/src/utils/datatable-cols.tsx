export const astrologerColumns = [
  { field: "_id", headerName: "ID", width: 150 },
  {
    field: "astrologer",
    headerName: "Astrologer",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
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
    field: "specialities",
    headerName: "Specialities",
    width: 120,
  },
];
