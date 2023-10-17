import type { Metadata } from "next";
import Navbar from "./Navbar";

export const metadata: Metadata = {
  title: "Feilong Homepage",
  description: "Welcome to my homepage!",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
          <h1>FeiLong&apos;s Homepage</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
