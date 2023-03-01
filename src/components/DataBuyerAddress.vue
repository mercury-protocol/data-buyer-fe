<template>
  <div class="text-center pt-6">
    <div v-if="!this.buyerAddrSet">
      <p>Please set your deployed data buyer instance:</p>
      <div class="pt-10">
        <div>
          <span class="pr-6 w-1/4">
            <InputText class="w-1/4" type="text" v-model="buyerAddrInput" />
          </span>
          <Button @click="setClick">Set</button>
        </div>
      </div>
      <div v-if="this.buyerAddrSet">
        <p>
          Your configured data buyer address is:
          {{ this.ethers.dataBuyerInstance }}
        </p>
      </div>
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