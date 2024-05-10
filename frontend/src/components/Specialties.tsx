import React, { ChangeEvent, useState } from "react";
import { TextField, Chip, Stack } from "@mui/material";

const SpecialtySelector = ({
  specialties,
  setSpecialties,
}: {
  specialties: string[];
  setSpecialties: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddSpecialty = () => {
    if (inputValue.trim() !== "") {
      // Check for empty input
      setSpecialties([...specialties, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteSpecialty = (specialtyToDelete: string) => {
    setSpecialties(
      specialties.filter((specialty) => specialty !== specialtyToDelete)
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      handleAddSpecialty();
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Enter specialties (separated by space)"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        fullWidth
      />
      <Stack direction="row" spacing={1} component={"div"}>
        {specialties.map((specialty, index) => (
          <Chip
            key={index}
            label={specialty}
            onDelete={() => handleDeleteSpecialty(specialty)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SpecialtySelector;
