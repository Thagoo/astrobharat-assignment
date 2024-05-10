import React, { useState } from "react";
import { TextField, Autocomplete, Chip, Stack } from "@mui/material";
import { languageOptions } from "../utils/languages";
import { LanguageOptions } from "../utils/types";

const LanguageSelector = ({
  selectedLanguages,
  setSelectedLanguages,
}: {
  selectedLanguages: LanguageOptions[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<LanguageOptions[]>>;
}) => {
  const handleChange = (event: any, values: LanguageOptions[]) => {
    setSelectedLanguages(values);
  };

  return (
    <Stack spacing={2}>
      <Autocomplete
        multiple
        value={selectedLanguages}
        onChange={handleChange}
        options={languageOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Select languages" fullWidth />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option.label} {...getTagProps({ index })} />
          ))
        }
      />
    </Stack>
  );
};

export default LanguageSelector;
