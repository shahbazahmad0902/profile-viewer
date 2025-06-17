import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .regex(/^\d+$/, "Phone must contain only digits"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(1, "Bio is required"),
});
