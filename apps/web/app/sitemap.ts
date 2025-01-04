import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://turbostack.io',
      lastModified: new Date()
    }
  ]
}