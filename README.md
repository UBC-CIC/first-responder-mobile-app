# First Responder Mobile App

## Project Summary
The First Responder Mobile app serves to assist emergency responders in connecting with medical experts and receiving appropriate medical expertise promptly, especially in rural areas where responders are essentially 'alone'. Emergency Responders connect to a Service Desk, where an attendee can see information about the situation, and page a relevant medical expert for assistance. The App is Powered by Amazon Chime, supporting video, audio, and text chat. In the case where data is not available, the app allows users to connect to Chime meetings via PSTN, over a toll-free number.

## Table of Contents
- [Dependencies](#dependencies)
- [Deployment](#Deployment)
- [Development Instructions](#development)
- [Installation](#installation)
- [Usage](#usage)

## Dependencies
- [Service Desk App](https://github.com/UBC-CIC/first-responder-admin) must be deployed to your AWS Account first.


## Deployment
- Assure all [dependencies](#dependencies) have been deployed into AWS account, then press the button below to deploy this app.

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/UBC-CIC/first-responder-mobile-app)

## Development

### HTTPS
- Import the certificates in the certs/ directory to your machine. (You can also create your own Self Signed Certificates if you do not want to trust these ones.)
  - On Mac, open the RootCA.crt in finder, and double click to open with Keychain Access. Open localhost.crt and double click.
  - This should have added 2 untrusted certs to the system keychain. For both: Right Click -> Get Info -> Trust -> When using this certificate: Always Trust

> `npm install`

> `npm start`

### HTTP
- If you do not want to run the app with HTTPS, you can simply run the following command
> `npm run start-http`
## Installation
### iOS
- Open The app in Safari and press this button.![a2hs1](./assets/a2hs1.png)
- Then add to your home screen by pressing this button![a2hs2](./assets/a2hs2.png)

### Android
- Open the app on Chrome and press this button![a2hs2](./assets/a2hs3.png)
- A prompt will ask you to install the app.
- Open the app from your phone's home screen.
## Usage

### Medical Professionals

- [Install](#installation) App
- Request A Physician Account (Unimplemented)
  - Provide information like name, organization, field of expertise and availability.
  - Once approved, you will be able to log in with your phone number, join calls, and view alerts.

### First Responders

- [Install](#installation) App
- Log in with phone number
- Call into the [Service Desk](https://github.com/UBC-CIC/first-responder-admin) when medical expertise is required

## License
This project is distributed under the [MIT License](./LICENSE).
