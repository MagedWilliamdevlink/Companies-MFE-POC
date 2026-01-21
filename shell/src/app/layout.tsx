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

        {/* Base Import Map */}
        <script
          type="systemjs-importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                "react": "https://cdn.jsdelivr.net/npm/react@18/umd/react.development.js",
                "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js",
                "react-dom/client": "https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js",
                "@shared-ui/shared-ui":
                  "http://localhost:8081/shared-ui-shared-ui.js",
                "@common/common-components":
                  "http://localhost:8082/common-common-components.js",
              },
            }),
          }}
        />

        {/* Dynamic Services Import Map */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (async function() {
                try {
                  // Try config server first, fallback to local
                  const configServerUrl = '${process.env.NEXT_PUBLIC_SERVICE_JSON || 'http://localhost:3001/services.json'}';
                  const fallbackUrl = '/services.json';
                  
                  let response;
                  try {
                    response = await fetch(configServerUrl);
                  } catch (error) {
                    console.warn('Config server not available, falling back to local services.json');
                    response = await fetch(fallbackUrl);
                  }
                  
                  const services = await response.json();
                  
                  const microAppImports = services
                    .filter(service => service.hostType === 'microApp')
                    .reduce((acc, service) => {
                      acc[service.hostInfo.org] = service.hostInfo.url;
                      return acc;
                    }, {});
                  
                  // Add dynamic imports to SystemJS
                  System.addImportMap({
                    imports: microAppImports
                  });
                } catch (error) {
                  console.error('Failed to load dynamic services import map:', error);
                }
              })();
            `,
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
