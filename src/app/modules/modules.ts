import { z } from "zod";
export const replySchema = z.object({
  id: z.number(),
  img: z.string(),
  pseudo: z.string(),
  date: z.string(),
  quantity: z.number(),
  comment: z
    .string()
    .min(1, "Le commentaire ne peut pas être vide")
    .max(200, "Le commentaire ne peut pas dépasser 200 caractères"),
});

export const commentProfileSchema = z.object({
  id: z.number(),
  img: z.string().optional(),
  pseudo: z.string(),
  date: z.string(),
  quantity: z.number(),
  reply: z.array(replySchema),
  comment: z
    .string()
    .min(1, "Le commentaire ne peut pas être vide")
    .max(200, "Le commentaire ne peut pas dépasser 200 caractères"),
});

export type Profil = z.infer<typeof commentProfileSchema>;
