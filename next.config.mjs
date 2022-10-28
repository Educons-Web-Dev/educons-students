import { env } from './src/env/server.mjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const config = defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'ik.imagekit.io'],
  },
  env: {
    IMAGEKIT_URL: 'https://ik.imagekit.io/educons/',
    IMAGEKIT_PUBLIC_KEY: 'public_Vf+dVeHYPPR6r7vnItdK+1VipCE=',
  },
});

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default analyzer(config);
