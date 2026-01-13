import "./globals.css";
import SingleSpaProvider from "../components/SingleSpaProvider";
import Navbar from "../components/Navbar";

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
                "@service-a/service-a":
                  "http://localhost:8080/service-a-service-a.js",
                "@shared-ui/shared-ui":
                  "http://localhost:8081/shared-ui-shared-ui.js",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <SingleSpaProvider />
        <main>{children}</main>
      </body>
    </html>
  );
}
