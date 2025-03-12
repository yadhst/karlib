import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            ":is(h1, h2, h3, h4, h5) a": {
              "font-weight": "inherit",
              "text-decoration": "inherit",
              "&:hover": {
                "text-decoration": "underline",
                "text-underline-offset": "4px",
              },
            },
          },
        },
      }),
    },
  },
} satisfies Config;

export default config;
