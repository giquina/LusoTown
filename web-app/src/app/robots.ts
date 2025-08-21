import { ROUTES } from '@/config';
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/?lang=pt",
          ROUTES.events,
          ROUTES.events,
          ROUTES.businessDirectory,
          ROUTES.businessDirectory,
          "/business-networking",
          "/business-networking?lang=pt",
          "/community",
          "/directory",
          "/groups",
        ],
        disallow: ["/admin/", "/api/", "/profile/edit", "/dashboard/private"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
