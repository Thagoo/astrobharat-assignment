import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormLabel, Paper, Radio, RadioGroup } from "@mui/material";
import LanguageSelector from "../components/LanguageSelector";
import SpecialtySelector from "../components/Specialties";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRegisterAstrologerMutation } from "../redux/services/astrologer";
import { Astrologer, LanguageOptions } from "../utils/types";
import Navbar from "../components/Navbar";
import z from "zod";

let astrologerSchema = z.object({
  image: z.string(""),
  name: z
    .string("Please fill this field")
    .min(3, "Name is too short")
    .max(32, "Name is too long"),

  email: z
    .string("Please fill this field")
    .email("Please provide a valid email")
    .min(5, "Value is too short"),

  gender: z.string("Please fill this field"),
  course: z.string("Please fill this field").min(1, "Course is required"),
});

export default function RegisterForm() {
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageOptions[]>(
    []
  );
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const avatarRef = useRef<HTMLElement>(null);

  const [registerAstrologer, { isLoading, isSuccess }] =
    useRegisterAstrologerMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name, email, gender } = Object.fromEntries(formData);

    try {
      let imageUrl = "";
      if (file) {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "upload");
        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/dzkxdyunu/image/upload",
          { method: "POST", body: imageData }
        );

        const data = await uploadRes.json();
        imageUrl = data.url;
      }
      const newUser: Astrologer = {
        name: name as string,
        email: email as string,
        gender: gender as string,
        languages: selectedLanguages.map((value) => value.id),
        specialties: specialties,
        image: imageUrl,
      };
      const response = await registerAstrologer(newUser);
      if (response.data) {
        alert("Astrologer registered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {" "}
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Paper sx={{ px: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" my={2}>
              Register
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid container xs={12} justifyContent={"center"}>
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    onChange={(e) => setFile(e.target?.files?.[0])}
                    style={{ display: "none" }}
                    ref={avatarRef}
                  />
                  <Avatar
                    sx={{ height: 150, width: 150 }}
                    src={
                      file ? URL.createObjectURL(file) : <AccountCircleIcon />
                    }
                    onClick={() =>
                      (avatarRef.current as HTMLInputElement).click()
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label=" Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="gender"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <LanguageSelector
                    selectedLanguages={selectedLanguages}
                    setSelectedLanguages={setSelectedLanguages}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SpecialtySelector
                    specialties={specialties}
                    setSpecialties={setSpecialties}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
