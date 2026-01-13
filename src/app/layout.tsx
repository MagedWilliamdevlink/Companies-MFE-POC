import "./globals.css";
import SingleSpaProvider from "../components/SingleSpaProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
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
              },
            }),
          }}
        />
      </head>
      <body>
        <SingleSpaProvider />
        {children}
      </body>
    </html>
  );
}
