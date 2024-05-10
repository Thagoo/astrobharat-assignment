import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const router = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => router("/")}
            >
              Admin Table
            </Typography>{" "}
            <Button color="inherit" onClick={() => router("/register")}>
              Register
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider sx={{ mb: 1 }} />
    </Box>
  );
}
