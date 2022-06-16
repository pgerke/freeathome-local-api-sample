import "dotenv/config";
import { SystemAccessPoint } from "freeathome-local-api-client";
import fetch from "node-fetch";

// Setup fetch
globalThis.fetch = fetch;

// This function waits
async function pause() {
  return new Promise((res) => setTimeout(res, 1000));
}

function processMessage(message) {
  console.log(message);
}

// Create a loop function that waits for interrupt
let shutdownTriggered = false;
async function runLoop() {
  while (!shutdownTriggered) {
    await pause();
  }
}

// The serial of the device we use for testing
const testDeviceSerial = "ABB7xxxxxxxx";

// Connect to system access point and web socket
const sysAp = new SystemAccessPoint(
  process.env.SYSAP_HOST,
  process.env.SYSAP_USER_ID,
  process.env.SYSAP_PASSWORD,
  false,
  true
);

const subscription = sysAp
  .getWebSocketMessages()
  .subscribe((message) => processMessage(message));
sysAp.connectWebSocket();

// Trap SIGINT and initialized
process.on("SIGINT", () => {
  console.log("Shutting down...");
  shutdownTriggered = true;
});

// Test Device List retrieval
const deviceList = await sysAp.getDeviceList();
console.log(deviceList);

// Test Configuration retrieval
const config = await sysAp.getConfiguration();
console.log(config);

// Test Device retrieval
const device = await sysAp.getDevice(
  "00000000-0000-0000-0000-000000000000",
  testDeviceSerial
);
console.log(device);

// Test Data Point Retrieval
const datapoint = await sysAp.getDatapoint(
  "00000000-0000-0000-0000-000000000000",
  testDeviceSerial,
  "ch0001",
  "odp0000"
);
console.log(datapoint);

// Test setting data point
let setResponse = await sysAp.setDatapoint(
  "00000000-0000-0000-0000-000000000000",
  testDeviceSerial,
  "ch0001",
  "idp0000",
  "1"
);
console.log(setResponse);

// ...and reset it again after 3s
await new Promise((res) => setTimeout(res, 3000));
setResponse = await sysAp.setDatapoint(
  "00000000-0000-0000-0000-000000000000",
  testDeviceSerial,
  "ch0001",
  "idp0000",
  "0"
);

await runLoop();

// Shutdown
sysAp.disconnectWebSocket();
subscription.unsubscribe();
