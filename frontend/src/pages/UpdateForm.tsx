import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import LanguageSelector from "../components/LanguageSelector";
import SpecialtySelector from "../components/Specialties";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  useGetAstrologerByIdQuery,
  useUpdateAstrologerMutation,
} from "../redux/services/astrologer";
import { Astrologer, LanguageOptions } from "../utils/types";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { languageOptions } from "../utils/languages";

interface CustomError extends Error {
  data?: any;
}

export default function UpdateForm() {
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageOptions[]>(
    []
  );
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [file, setFile] = useState<any>(null);
  const avatarRef = useRef<any>(null);
  const { id } = useParams();
  const [formError, SetFormError] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const { data, isLoading, error } = useGetAstrologerByIdQuery(id as string);
  const [updateAstrologer, result] = useUpdateAstrologerMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name, email, gender } = Object.fromEntries(formData);

    try {
      let imageUrl = "";
      if (file) {
        setLoading(true);
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
      const updateUser: Astrologer = {
        name: name as string,
        email: email as string,
        gender: gender as string,
        languages: selectedLanguages.map((value) => value.id),
        specialties: specialties,
        image: imageUrl,
      };

      updateAstrologer({
        astrologerId: id as string,
        data: updateUser,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(result.isLoading);
    if (result.isSuccess) {
      setLoading(false);
      alert("User updated successfully");
    }
    if (result.isError) {
      setLoading(false);
      const error = result.error as CustomError;
      SetFormError(error.data);
    }
  }, [result]);

  useEffect(() => {
    if (!isLoading) {
      setSpecialties(data?.specialties || []);
      setSelectedLanguages(
        languageOptions.filter((lang) => data?.languages.includes(lang.id))
      );
    }
  }, [data?.specialties]);

  if (isLoading) {
    return;
  }
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
              Update
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid container xs={12} justifyContent={"center"}>
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    style={{ display: "none" }}
                    ref={avatarRef}
                  />
                  <Avatar
                    sx={{ height: 150, width: 150 }}
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : data?.image
                          ? data.image
                          : ((<AccountCircleIcon />) as any)
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
                    defaultValue={data?.name}
                    error={formError.name}
                    helperText={formError.name}
                    onChange={() => SetFormError("")}
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
                    defaultValue={data?.email}
                    error={formError.email}
                    helperText={formError.email}
                    onChange={() => SetFormError("")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={data?.gender}
                    name="gender"
                    onChange={() => SetFormError("")}
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
                    <FormControl error={formError.gender} variant="standard">
                      <FormHelperText id="component-error-text">
                        {formError.gender}
                      </FormHelperText>
                    </FormControl>
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} onChange={() => SetFormError("")}>
                  <LanguageSelector
                    selectedLanguages={selectedLanguages}
                    setSelectedLanguages={setSelectedLanguages}
                  />
                  <FormControl error={formError.languages} variant="standard">
                    <FormHelperText id="component-error-text">
                      {formError.languages}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} onChange={() => SetFormError("")}>
                  <SpecialtySelector
                    specialties={specialties}
                    setSpecialties={setSpecialties}
                  />
                  <FormControl error={formError.specialties} variant="standard">
                    <FormHelperText id="component-error-text">
                      {formError.specialties}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
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
