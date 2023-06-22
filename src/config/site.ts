export const config = {
  name: "Abraham's Personal Watchlist",
  url: "https://watchlist.abraham-dev.tech",
  ogImage: "https://watchlist.abraham-dev.tech/images/og_icon.png",
  description:
    "My personal watchlist of Movies and Series that I've watched, am watching and upcoming stuff that I'm intrested in.",
  keywords: ["watchlist", "movies", "tv"],
  links: {
    twitter: {
      handle: "@x3_abe",
      url: "https://twitter.com/x3_abe",
    },
    website: {
      author: "AbrahamX3",
      url: "https://www.abraham-dev.tech",
    },
    github: "https://github.com/AbrahamX3/watchlist",
  },
};

export type SiteConfig = typeof config;
