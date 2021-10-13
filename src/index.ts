import { Keyring } from "@polkadot/api";
import { waitReady } from "@polkadot/wasm-crypto";
import { submitAllocations, submitTransfers } from "./scripts";
import { KeyringPair } from "@polkadot/keyring/types";

const keyring = new Keyring({ type: "sr25519" });

const modes: { [key: string]: (tester: KeyringPair, transactionQuantity: number) => void } = {
  transfer: submitTransfers,
  allocation: submitAllocations,
};

async function start() {
  waitReady().then(async () => {
    const alice = keyring.addFromUri("//Alice", { name: "Alice default" });
    modes[process.argv[2]](alice, 1000);
  });
}

start();
