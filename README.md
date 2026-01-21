Theory:

![image](mfe.svg)

Prerequisites:
- The Service provider will have access to 
	A. A Sandbox App shell that is equivalent to production App shell, will be provided as a public repo
    B. Access to all UI toolkit, with a Storybook, these are parcels that can be imported by Reactjs, Angular, Vuejs, will be accessed from a publicly available CDN
    C. Access to Common compoents, these are UI for componenets like Pyaments, it also is a Parcel and will be available on a CDN

- The Platform will have:
    A. An App shell that has UI toolkit, CommonComponents, MicroApp if exists.
    B. When a MicroApp matches a url it will load.

How a Service loads:
1. When the user access a specific service from a specific company
2. The platform asks for registered service for this company and returns it's hosted microApp for that service
3. While it renders it will ask for UI dependencies like Buttons, textarea, sidesteps..., 
	these are defined in the App shell and simply will be imported from UI toolkit Parcels
4. When it renders a payment component, it will be defined in the app shell and will be imported 
	from the Common Components Parcels
5. Finally the service will render

## Development Setup

### Scripts Available

- `npm run install-all` - Install dependencies for all packages
- `npm run start-all` - Start all services (shell, common-components, mfe-service-a, shared-ui)
- `npm run serve-config` - Start static server for services.json on port 3001
- `npm run start-with-config` - Start all services + config server

### Dynamic Services Configuration

The services configuration is externalized to `shell/public/services.json` and served via a static server on port 3001. This allows updating service configurations without rebuilding the shell.

**To update services:**
1. Edit `shell/public/services.json`
2. The changes will be reflected immediately without rebuilding

**Fallback behavior:**
- If the config server (port 3001) is not available, the system falls back to the local `/services.json` from Next.js public folder
- This ensures the system works in both development and production environments



# How to run

`npm i`
`npm run install-all`
`npm run start-all`



# Register a service

Clone this [service](https://github.com/MagedWilliamdevlink/Companies-MFE-POC-Service-A) and change it, when its ready edit the serivces.json file and update the urls,
you can use jsdeliver to make the dist available via cdn

ex: 
```json
{
    "id": "service-a",
    "title": "خدمة التراخيص الإلكترونية",
    "description": "إصدار وتجديد التراخيص الإلكترونية للمنشآت والشركات بسهولة",
    "category": "تراخيص",
    "status": "active",
    "ctaLink": "/service-a",
    "hostType": "microApp",
    "hostInfo": {
      "org": "@service-a/service-a",
      "url": "https://cdn.jsdelivr.net/gh/MagedWilliamdevlink/Companies-MFE-POC-Service-A@main/dist/service-a-service-a.js"
    }
}
```