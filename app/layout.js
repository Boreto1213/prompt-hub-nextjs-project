import Nav from "@/components/Nav";
import "../styles/global.css"

export const metadata = {
  title: "Prompt Hub",
  description: "Discover & Share AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="background" />

        <main className="main">
          <Nav />
          {children}</main>
      </body>
    </html>
  );
}
