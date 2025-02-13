import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts,md}"],
	safelist: ["dark", "cursor-pointer", "text-xl"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			borderWidth: {
				'3': '3px',  // Adding the middle weight we need
				'1': '1px',
			  },
			boxShadow: {
				'misprint': '2px 2px 0px 0px rgba(0,255,255,0.5), -2px -2px 0px 0px rgba(255,0,255,0.5), 1px -1px 0px 0px rgba(255,255,0,0.5)',
				'misprint-sm': '1px 1px 0px 0px rgba(0,255,255,0.5), -1px -1px 0px 0px rgba(255,0,255,0.5), 2px -2px 0px 0px rgba(255,255,0,0.5)',
				'misprint-hover': '2px 2px 0px 0px rgba(0,255,255,0.3), -2px -2px 0px 0px rgba(255,0,255,0.3), 2px -2px 0px 0px rgba(255,255,0,0.5)',
				'misprint-dark': '2px 2px 0px 0px rgba(0,255,255,0.3), -2px -2px 0px 0px rgba(255,0,255,0.3), 1px -1px 0px 0px rgba(255,255,0,0.3)',
				'misprint-dark-hover': '2px 2px 0px 0px rgba(0,255,255,0.3), -2px -2px 0px 0px rgba(255,0,255,0.3), 2px -2px 0px 0px rgba(255,255,0,0.3)',
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};

export default config;
