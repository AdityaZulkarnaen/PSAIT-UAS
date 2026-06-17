import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hasilkan build mandiri (.next/standalone) berisi server minimal + hanya
  // dependency yang dibutuhkan — ideal untuk image Docker yang ramping.
  output: "standalone",
};

export default nextConfig;
