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