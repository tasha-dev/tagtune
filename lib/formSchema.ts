import { z } from "zod";

export const audioTagsSchema = z.object({
  title: z.string().trim().max(200, "Title cannot exceed 200 characters"),

  artist: z
    .string()
    .trim()
    .max(200, "Artist cannot exceed 200 characters")
    .optional(),

  albumArtist: z
    .string()
    .trim()
    .max(200, "Album artist cannot exceed 200 characters")
    .optional(),

  album: z
    .string()
    .trim()
    .max(200, "Album cannot exceed 200 characters")
    .optional(),

  genre: z
    .string()
    .trim()
    .max(100, "Genre cannot exceed 100 characters")
    .optional(),

  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be 4 digits")
    .or(z.literal(""))
    .optional(),

  trackNumber: z
    .string()
    .regex(/^\d+(\/\d+)?$/, "Example: 3 or 3/12")
    .or(z.literal(""))
    .optional(),

  discNumber: z
    .string()
    .regex(/^\d+(\/\d+)?$/, "Example: 1 or 1/2")
    .or(z.literal(""))
    .optional(),

  composer: z.string().trim().max(200).optional(),

  lyricist: z.string().trim().max(200).optional(),

  publisher: z.string().trim().max(200).optional(),

  copyright: z.string().trim().max(200).optional(),

  bpm: z
    .string()
    .regex(/^\d+$/, "BPM must be a number")
    .or(z.literal(""))
    .optional(),

  key: z.string().trim().max(20).optional(),

  language: z.string().trim().max(10).optional(),

  isrc: z.string().trim().max(20).optional(),

  encoder: z.string().trim().max(100).optional(),

  website: z.string().url("Enter a valid URL").or(z.literal("")).optional(),

  comment: z.string().trim().max(1000).optional(),

  lyrics: z.string().trim().max(10000).optional(),
  cover: z.custom<File | null>().optional(),
});

export type AudioTagsFormValues = z.infer<typeof audioTagsSchema>;
