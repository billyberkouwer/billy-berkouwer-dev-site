import { groq } from "next-sanity";
import { config } from "./client";
import SanityClient from "next-sanity-client";

export async function getArchive(): Promise<any> {
  return new SanityClient(config).fetch({ query: groq``, config: { cache: 'default', next: { tags: [''] } } })
}