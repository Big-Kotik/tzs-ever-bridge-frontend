<template>
  <main>
    <div class="center">
      <div><input type="text" v-model="amount" placeholder="Amount"></div>
      <div><input type="text" v-model="privateKey" placeholder="Recipient private key"></div>
      <div><input type="text" v-model="addressTo" placeholder="AddressTo"></div>
      <div class="move"><a href="#" @click="getTezosTokenCash()">Move tokens</a></div>
    </div>
  </main>
</template>

<script>
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner} from '@taquito/signer';

const tezos = new TezosToolkit("http://127.0.0.1:20000");
export default {
  name: "QuorumTezos.vue",
  data() {
    return {
      amount: 0,
      addressTo: "",
      privateKey: "",
    }
  },
  methods: {
    async getTezosTokenCash() {
      tezos.setProvider({signer: new InMemorySigner(this.privateKey)})
      console.log(await tezos.contract
          .at("KT1Q4WueKgWtBz2yFvFZN8hT63C3FYqxtqiZ")
          .then((c) => {
            return c.methods.sendTransfer(this.addressTo, this.amount).send()
          }))
    },
  }
}
</script>

<style scoped>

</style>