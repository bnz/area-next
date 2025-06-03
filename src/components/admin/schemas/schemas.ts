import { z } from "zod/v4"
import { supportedLanguages } from "@/lib/i18n"

export enum TransFiles {
    common = "common",
    translations = "translations",
    features = "features",
    posts = "posts",
    splits = "splits",
}

const transFilesValues = Object.values(TransFiles)

const splitSchema = z.object({
    id: z.string(),
    title: z.string(),
    subTitle: z.string(),
    image: z.string(),
})

export type SplitItem = z.infer<typeof splitSchema>

const postSchema = z.object({
    id: z.string(),
    title: z.string(),
    excerpt: z.string(),
    image: z.string(),
    slug: z.string(),
    content: z.string(),
    datetime: z.string(),
})

export type PostItem = z.infer<typeof postSchema>

const featureSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
})

export type FeatureItem = z.infer<typeof featureSchema>

export const defaultShaItemSchema = z.record(
    z.enum(supportedLanguages),
    z.record(
        z.enum(transFilesValues),
        z.string(),
    ),
)

export type ShaData = z.infer<typeof defaultShaItemSchema>

const keyValueSchema = z.record(z.string(), z.string())

export const loadedDataSchema = z.record(
    z.enum(supportedLanguages),
    z.object({
        [TransFiles.common]: keyValueSchema,
        [TransFiles.translations]: keyValueSchema,
        [TransFiles.features]: z.array(featureSchema),
        [TransFiles.posts]: z.array(postSchema),
        [TransFiles.splits]: z.array(splitSchema),
    }),
)
