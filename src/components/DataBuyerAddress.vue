<template>
  <div>
    <div v-if="!this.buyerAddrSet">
      <p>Please set your deployed data buyer instance:</p>
      <span>
        <InputText type="text" class="pt-10 buyer-addr-input" v-model="buyerAddrInput" />
        <Button class="btn btn-primary" @click="setClick">Set</button>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
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