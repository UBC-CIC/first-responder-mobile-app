# STARS Mobile App

Mobile app for first responders to get in direct contact with medical professionals in emergency situations.

## Table of Contents
- [Development Instructions](#development)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)


## Development

- Import the certs in the certs/ directory to your machine. (You can also create your own Self Signed Certs if you do not want to trust these ones.)
  - On Mac, open the RootCA.crt in finder, and double click to open with Keychain Access. Open localhost.crt and double click.
  - This should have added 2 untrusted certs to the system keychain. For both: Right Click -> Get Info -> Trust -> When using this certificate: Always Trust

- yarn
- yarn start

## Installation

<!-- Download on [App Store](#) or [Google Play Store](#) TODO -->

[Add to home screen](#) from your browser TODO

## Usage

### Medical Professionals

- [Install](#installation) App
- [Request A Physician Account](#) TODO
  - Provide information like name, organization, field of expertise and availability.
  - Once approved, allow push notifications and/or SMS notifications to be alerted when your assistance is required

### First Responders

- [Install](#installation) App
- Optionally create a first responder profile
- Call into the [STARS Help Desk](#) TODO when medical expertise is required

## Support

Please [open an issue](#) for support, or contact the [UBC CIC](#) or [STARS](#) TODO

## Contributing

Create a branch, add commits, and [open a pull request](#). TODO

## Important Things TODO

- Pass name of DynamoDB to Lambda via CloudFormation
