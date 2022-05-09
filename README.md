# freeathome-local-api-sample

A Node.JS script illustrating the use of the [freeathome-local-api-client](https://github.com/pgerke/freeathome-local-api-client).

## Usage Instructions

1. Install dependencies

```
npm install
```

2. Create an .env file

You'll need to provide the System Access Point host name, the user ID and the password to create a connection. I'd recomment setting up a `.env` file

```
SYSAP_HOST=<host name>
SYSAP_USER_ID=<user-id>
SYSAP_PASSWORD=<password>
```

3. Run the script

You can start the script now. Please note, that you'll need to provide real device IDs and corresponding channels for the script to work.

```
npm run start
```

## Non-Affiliation Disclaimer

This library is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Busch-Jaeger Elektro GmbH or ABB Asea Brown Boveri Ltd or . All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder of their product brand.

## License

The project is subject to the MIT license unless otherwise noted. A copy can be found in the root directory of the project [LICENSE](./LICENSE).

<hr>

Made with ❤️ by [Philip Gerke](https://github.com/pgerke)
