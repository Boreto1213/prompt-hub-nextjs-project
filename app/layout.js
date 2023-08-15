import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
import "../styles/global.css";

export const metadata = {
  title: "Prompt Hub",
  description: "Discover & Share AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="background bg-neutral-800" />

          <main className="main">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
