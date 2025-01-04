import { Metadata } from "next";

export const APP_TITLE = 'TurboStack';
export const TITLE = 'Ship your startup at Turbo Speed';
export const DESCRIPTION = 'Don\'t waste your time on boring things. Focus on making money online.'

export const defaultMetadata: Metadata = {
  title: {
    template: `%s | ${APP_TITLE}: ${TITLE}`,
    default: `${APP_TITLE}: ${TITLE}`,
  },
  keywords: ['saas', 'boilerplate', 'nextjs', 'turborepo'],
  category: 'technology',
  description: DESCRIPTION,
};

export const twitterMetadata: Metadata["twitter"] = {
  title: TITLE,
  description: DESCRIPTION,
  card: "summary_large_image",
  images: ["/api/og"],
};

export const ogMetadata: Metadata["openGraph"] = {
  title: TITLE,
  description: DESCRIPTION,
  type: "website",
  images: ["/api/og"],
};
