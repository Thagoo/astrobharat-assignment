import { Box } from "@mui/material";
import Datatable from "../components/Datatable";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Datatable />
    </Box>
  );
}
