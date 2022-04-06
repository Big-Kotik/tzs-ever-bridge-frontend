<template>
  <main>
    <TokenView :token=tokenFrom direction="From"/>
    <div class="center">
      <div><a href="#" @click="changeDirection()">Swap transaction direction</a></div>
      <template v-if="tokenTo==='Everscale'">
        <div><input type="text" v-model="amount" placeholder="Amount"></div>
        <div><input type="text" v-model="privateKey" placeholder="Private key"/></div>
        <div><input type="text" v-model="addressTo" placeholder="AddressTo"></div>
        <div class="move"><a href="#" @click="sendTezosTransaction()">Move tokens</a></div>
      </template>
      <template v-else>
        <div><input type="text" v-model="amount" placeholder="Amount"></div>
        <div><input type="text" v-model="privateKey" placeholder="From"/></div>
        <div><input type="text" v-model="addressTo" placeholder="To"></div>
        <div class="move"><a href="#" @click="sendEverTransaction()">Move tokens</a></div>
      </template>

    </div>
    <TokenView :token=tokenTo direction="To"/>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner} from '@taquito/signer';
import TokenView from "@/components/TokenView.vue";
import { TonClient, signerKeys, abiContract } from "@eversdk/core";
import { libWeb } from "@eversdk/lib-web";
import DemoTokenImpl from "../../public/DemoTokenImpl.abi.json"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TonClient.useBinaryLibrary(libWeb);

const everClient = new TonClient({ network: { endpoints: ["http://localhost:3412"] } });

const tezos = new TezosToolkit("http://127.0.0.1:20000");

@Options({
  components: {
    TokenView,
  },
  props: {
    msg: String
  },
  data() {
    return {
      amount: 0,
      addressFrom: "",
      addressTo: "",
      privateKey: "",
      tokenTo: "Everscale",
      tokenFrom: "Tezos",
    }
  },
  methods: {
    async sendTezosTransaction() {
      tezos.setProvider({signer: new InMemorySigner(this.privateKey)})
      console.log(await tezos.contract
          .at("KT1V3AG34mWtuUE5DDrnyX1JSEayKuMpt71V")
          .then((c) => {
            return c.methods.deposit(this.addressTo).send({amount: this.amount.valueOf()})
          }))
    },
    async sendEverTransaction() {
      const keys = await everClient.crypto.generate_random_sign_keys();
      const params = {
        abi: abiContract(DemoTokenImpl),
        address: "0:a30fa0ae97a921beaef229f7352952e5de65f44bb340ebc4499bfd0e97064caa",
        call_set: {
          function_name: "burn",
          input: {
            _value: this.amount,
            _recepient: this.privateKey,
            destination: this.addressTo,
          }
        },
        signer: signerKeys(keys)
      };

      const response = await everClient.processing.process_message({
        send_events: true,
        message_encode_params: params,
      });

      console.log(response)
    },
    changeDirection() {
      let c = this.tokenFrom
      this.tokenFrom = this.tokenTo
      this.tokenTo = c
    },
  }
})
export default class HomeView extends Vue {}
</script>
