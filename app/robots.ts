import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:"/",disallow:["/api/"]},sitemap:"https://morubi.ai/sitemap.xml",host:"https://morubi.ai"}}
