import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
