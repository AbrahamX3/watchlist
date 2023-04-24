import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      style={{ fontFamily: inter.style.fontFamily }}
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      hi
    </main>
  );
}
