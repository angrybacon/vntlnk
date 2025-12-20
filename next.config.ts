import { type NextConfig } from 'next';

export default {
  images: {
    remotePatterns: [{ hostname: 'cards.scryfall.io', protocol: 'https' }],
  },
} satisfies NextConfig;
