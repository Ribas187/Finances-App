import { Metadata } from "next";

export const APP_TITLE = 'FinancesApp';
export const TITLE = 'Organize suas finanças';
export const DESCRIPTION = 'A FinancesApp é uma aplicação para ajudar você a organizar suas finanças.';

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
