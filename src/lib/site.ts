export const SITE = {
  name: "Index Us",
  title: "Index Us — Practical AI intelligence",
  description: "Independent AI industry news, tested tools and practical techniques for people who need signal, not noise.",
  url: "https://index-us.com",
  locale: "en_AU",
  language: "en-AU",
};

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  }).format(date);
