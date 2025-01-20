import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			Primary: '#B91C1C',
  			Secondary: '#1F2937',
  			Accent: '#FACC15',
  			// Background: '#FFFFFF',
			  Background: '#E2FBCE',

  			Text: '#111827',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontSize: {
  			h1: [
  				'2.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			'h1-sm': [
  				'2rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			h2: [
  				'2rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			'h2-sm': [
  				'1.75rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			h3: [
  				'1.75rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			'h3-sm': [
  				'1.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			h4: [
  				'1.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '500'
  				}
  			],
  			'h4-sm': [
  				'1.25rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '500'
  				}
  			],
  			h5: [
  				'1.25rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '500'
  				}
  			],
  			'h5-sm': [
  				'1.125rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '500'
  				}
  			],
  			h6: [
  				'1rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '500'
  				}
  			],
  			'h6-sm': [
  				'0.875rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '500'
  				}
  			],
  			body: [
  				'1rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			'body-sm': [
  				'0.875rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			muted: [
  				'0.75rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			'btn-lg': [
  				'1rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '700'
  				}
  			],
  			'btn-md': [
  				'0.875rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '700'
  				}
  			],
  			'btn-sm': [
  				'0.75rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '700'
  				}
  			],
  			nav: [
  				'1rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '500'
  				}
  			],
  			'nav-sm': [
  				'0.875rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '500'
  				}
  			],
  			footer: [
  				'0.875rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			copyright: [
  				'0.75rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
