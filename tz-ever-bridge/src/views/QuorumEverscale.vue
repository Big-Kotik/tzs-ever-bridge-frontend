<template>
  <main>
    <div class="center">
      <div>Send transaction to Everscale Quorum contract</div>
      <div><input type="text" v-model="amount" placeholder="Amount"></div>
      <div><input type="text" v-model="addressTo" placeholder="AddressTo"></div>
      <div><input type="text" v-model="signature" placeholder="Signature"></div>
      <div class="move"><a href="#" @click="sendQuorumTransaction()">Move tokens</a></div>
    </div>
  </main>
</template>

<script>
import {TonClient, signerKeys, abiContract, AccountAddressType} from "@eversdk/core";
import { libWeb } from "@eversdk/lib-web";
import QuorumImpl from "../../public/Quorum.abi.json"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TonClient.useBinaryLibrary(libWeb);

const everClient = new TonClient({ network: { endpoints: ["http://localhost:3412"] } });

export default {
  name: "QuorumEverscale.vue",
  data() {
    return {
      amount: 0,
      addressTo: "",
      signature: "",
    }
  },
  methods: {
    async sendQuorumTransaction() {
      const keys = await everClient.crypto.generate_random_sign_keys();
      const sign = BigInt("0x" + this.signature);
      const left = sign >> 256n;
      const right = sign % (1n << 256n);

      const params = {
        abi: abiContract(QuorumImpl),
        address: "0:22169a4a81cdc4dded4ff6431950d48c939f1ea06c06deec72e9db9b4d0ec9f8",
        call_set: {
          function_name: "sendTransaction",
          input: {
            _transfer: {
              recipient: this.addressTo,
              amount: this.amount,
            },
            _signatures: [{signHighPart: left.toString(), signLowPart: right.toString()}]
          }
        },
        signer: signerKeys(keys)
      };

      const response = await everClient.processing.process_message({
        send_events: true,
        message_encode_params: params,
      });

      console.log(response)
    }
  }
}
</script>

<style scoped>

</style>