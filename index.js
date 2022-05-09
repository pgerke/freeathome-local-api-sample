import "dotenv/config";
import { SystemAccessPoint } from "freeathome-local-api-client";
import fetch from "node-fetch";

// Setup fetch
globalThis.fetch = fetch;

// Connect to system access point
const sysAp = new SystemAccessPoint(
  process.env.SYSAP_HOST,
  process.env.SYSAP_USER_ID,
  process.env.SYSAP_PASSWORD
);

// Test Device List retrieval
const deviceList = await sysAp.getDeviceList();
console.log(deviceList);

// Test Configuration retrieval
const config = await sysAp.getConfiguration();
console.log(config);

// Test Device retrieval
const device = await sysAp.getDevice(
  "00000000-0000-0000-0000-000000000000",
  "ABB7xxxxxxxx"
);
console.log(device);

// Test Data Point Retrieval
const datapoint = await sysAp.getDatapoint(
  "00000000-0000-0000-0000-000000000000",
  "ABB7xxxxxxxx",
  "ch0001",
  "odp0000"
);
console.log(datapoint);

// Test setting data point
const setResponse = await sysAp.setDatapoint(
  "00000000-0000-0000-0000-000000000000",
  "ABB7xxxxxxxx",
  "ch0001",
  "idp0000",
  "1"
);
console.log(setResponse);

// Test Web Socket
sysAp.getWebSocketMessages().subscribe((message) => console.log(message));
sysAp.connectWebSocket();
setTimeout(async () => {
  sysAp.disconnectWebSocket();
  const setResponse = await sysAp.setDatapoint(
    "00000000-0000-0000-0000-000000000000",
    "ABB7xxxxxxxx",
    "ch0001",
    "idp0000",
    "0"
  );
  console.log(setResponse);
}, 15000);
