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


## Quick start

### How to run

1. `npm i`
2. `npm run install-all`
3. copy `shell/.example.env` to `shell/.env.local`
4. `npm run start-all`


## Development Setup

### Scripts Available

- `npm run install-all` - Install dependencies for all packages
- `npm run start-all` - Start all services (shell, common-components, shared-ui)
- `npm run dev-all` - Start all services (shell in dev mode, common-components, shared-ui)

### Dynamic Services Configuration

The services configuration is externalized to `services.json` and served via a static server on port 3001. This allows updating service configurations without rebuilding the shell.

**To update services:**
1. Edit `services.json`
2. The changes will be reflected immediately without rebuilding
3. Depending on the .env if its pointing to the CDN then a push is required to the main branch
4. You can change the services.json to be `NEXT_PUBLIC_SERVICE_JSON=http://localhost:3001/services.json` in the `.env.local` for development purposes


# Register a new service

Clone this [service](https://github.com/MagedWilliamdevlink/Companies-MFE-POC-Service-B) and change it, 
you then have to run:
- `npm i`
- update the port in `Companies-MFE-POC-Service-c/package.json` to be `"start": "webpack serve --port 8084"`,
- `npm start`

when its ready edit the serivces.json file and update the urls like the example below:

ex: 
```json
{
  "id": "service-c",
  "title": "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
  "description": "تهدف خدمة التصديق على القرارات والمحاضر",
  "meta": {
    "requiredDocs": [
      "- صورة بطاقة الرقم القومي سارية والاطلاع على الأصل",
    ],
    "TOC": ["- أن تكون حالة الرخصة سارية وأن تكون رخصة وليست تصريح"]
  },
  "category": "تجاري",
  "companyName": "الهلال للأستثمار والتنمية العمرانية",
  "status": "active",
  "ctaLink": "/new/service-c",
  "hostType": "microApp",
  "hostInfo": {
    "org": "@service-c/service-c",
    "url": "https://cdn.jsdelivr.net/gh/MagedWilliamdevlink/Companies-MFE-POC-Service-C@main/dist/service-c-service-c.js"
  }
},
```


## For local development (Do not actually run this, unless you are me)

Edit `shell/.env.local` to have:
```
NEXT_PUBLIC_SERVICE_JSON=http://localhost:3001/services.json
NEXT_PUBLIC_SHARED_UITOOLKIT=http://localhost:8081/shared-ui-shared-ui.js
NEXT_PUBLIC_COMMON_COMPONENT=http://localhost:8082/common-common-components.js
```

in `services.json` edit the service you want to develop to the localhost url:
```json
"hostInfo": {
  ...
  "url": "http://localhost:8084/service-c-service-c.js"
}
```
