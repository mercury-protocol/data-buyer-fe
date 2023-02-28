<template>
  <div>
    <div v-if="!this.buyerAddrSet">
      <p>Please set your deployed data buyer instance:</p>
      <span>
        <input type="text" class="buyer-addr-input" v-model="buyerAddrInput" />
        <button class="btn btn-primary" @click="setClick">Set</button>
      </span>
    </div>
    <div v-if="this.buyerAddrSet">
      <p>
        Your configured data buyer address is:
        {{ this.ethers.dataBuyerInstance }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataBuyerAddress",
  data() {
    return {
      buyerAddrInput: "",
      buyerAddrSet: false,
    };
  },
  props: {
    ethers: Object,
  },
  methods: {
    async setClick() {
      console.log(this.buyerAddrInput);
      this.buyerAddrSet = await this.ethers.setDataBuyerInstanceAddress(
        this.buyerAddrInput
      );
      if (!this.buyerAddrSet)
        this.buyerAddrInput = "";
    },
  }
}
</script>