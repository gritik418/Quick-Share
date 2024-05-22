import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quick Share",
  description:
    "Your hassle-free file-sharing companion! With QuickShare, exchanging files is quick and easy. Upload, download, and share files of any type effortlessly. Our platform prioritizes simplicity and speed, ensuring that your documents, images, videos, and more reach their destination in record time. Say goodbye to cumbersome file transfers and hello to QuickShare's seamless sharing experience!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
