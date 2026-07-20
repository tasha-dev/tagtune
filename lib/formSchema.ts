import { z } from "zod";

export const audioTagsSchema = z.object({
   title: z.string().max(200, "Too long").optional().or(z.literal("")),
   artist: z.string().max(200, "Too long").optional().or(z.literal("")),
   album: z.string().max(200, "Too long").optional().or(z.literal("")),
   genre: z.string().max(100, "Too long").optional().or(z.literal("")),
   year: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((v) => !v || /^\d{4}$/.test(v), "Enter a 4-digit year"),
   bpm: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
         (v) => !v || (Number(v) > 0 && Number(v) < 400),
         "Enter a BPM between 1 and 399",
      ),
   comment: z.string().max(500, "Too long").optional().or(z.literal("")),
});

export type AudioTagsFormValues = z.infer<typeof audioTagsSchema>;
