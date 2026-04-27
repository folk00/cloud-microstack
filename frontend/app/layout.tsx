import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud Microstack",
  description: "Reference cloud-native microstack — Next.js + FastAPI + microservices on AWS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
