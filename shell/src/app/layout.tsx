import "./globals.css";
import SingleSpaProvider from "../components/SingleSpaProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Fonts - Cairo for Arabic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* SystemJS */}
        <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js" />

        {/* Import Map */}
        <script
          type="systemjs-importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                react: "https://ga.jspm.io/npm:react@19.2.3/dev.index.js",
                "react-dom":
                  "https://ga.jspm.io/npm:react-dom@19.2.3/dev.index.js",
                "react-dom/client":
                  "https://ga.jspm.io/npm:react-dom@19.2.3/client.index.js",
                "@service-a/service-a":
                  "http://localhost:8080/service-a-service-a.js",
                "@shared-ui/shared-ui":
                  "http://localhost:8081/shared-ui-shared-ui.js",
                "@common/common-components":
                  "http://localhost:8082/common-common-components.js",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen min-w-[99vw] bg-[#f5f7fa]!  flex flex-col ">
        <SingleSpaProvider />
        <Navbar />
        <main className="  min-w-full min-h-full  bg-[#f5f6f9]!">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
