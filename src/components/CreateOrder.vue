<template>
  <div class="text-center self-center">
    <form v-on:submit="createOrder">
      <div class="flex flex-col p-10">
        <Dropdown v-model="selectedDataType" :options="dataTypes" optionLabel="name" optionValue="code"
          placeholder="Select a Data Type" class="md:ml-16 md:mr-16" />
        <div class="flex flex-col md:flex-row">
          <div class="pt-8 flex flex-col md:w-1/2 md:pl-16 md:pr-16">
            <p class="pb-4">Price:</p>
            <InputNumber class="text-center" :min="0" id="price" v-model="price" suffix=" MER" />
          </div>
          <div class="pt-8 flex flex-col md:w-1/2 md:pl-16 md:pr-16">
            <p class="pb-4">Units:</p>
            <InputNumber id="units" :min="0" v-model="units" />
          </div>
        </div>
        <div class="pt-12">
          <Button type="submit" class="btn btn-primary">Create order</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Cypher from "../services/cypher";

export default {
  name: "CreateOrder",
  data() {
    return {
      price: 0,
      units: 0,
      selectedDataType: "",
      cypher: new Cypher,
      dataTypes: [
        { name: 'Browsing', code: '1' },
        { name: 'Health', code: '2' }]
    };
  },
  props: {
    ethers: Object,
  },
  methods: {
    dataTypeSelect(e) {
      this.selectedDataType = e.target.value;
    },

    async createOrder(e) {
      e.preventDefault();

      const enoughBalance = this.cypher.checkBalance(this.ethers.address, this.price * this.units);
      if (!enoughBalance)
        return;
      await this.ethers.createOrder(this.selectedDataType, this.price, this.units);
    },
  },
};
</script>