import z from "zod";

export const astrologerSchema = z.object({
  image: z.string(),
  name: z.string().min(3, "Name is too short").max(32, "Name is too long"),

  email: z.string().email("Please provide a valid email"),

  gender: z.string(),
  languages: z.array(z.string()).nonempty(),
  specialties: z.array(z.string()).nonempty(),
});
