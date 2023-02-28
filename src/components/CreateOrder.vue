<template>
  <div class="container d-flex justify-content-center">
    <form v-on:submit="createOrder">
      <div class="row">
        <div class="col">
          <div class="dropdown">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Data type
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <button type="button" class="dropdown-item" @click="dataTypeSelect" value="1">
                Browsing
              </button>
              <button type="button" class="dropdown-item" @click="dataTypeSelect" value="2">
                Health
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <p>Price:</p>
          <input type="number" id="price" v-model="price" />
        </div>
        <div class="col">
          <p>Units:</p>
          <input type="number" id="units" v-model="units" />
        </div>
      </div>
      <div class="row">
        <button type="submit" class="btn btn-primary">Create order</button>
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
      // console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");

      // console.log('cypher', this.cypher); // Check if cypher is defined
      console.log('sigenr', this.ethers.address); // Check if signer is defined
      console.log('price', this.price); // Check if price is defined

      const enoughBalance = this.cypher.checkBalance(this.ethers.address, this.price * this.units);
      if (!enoughBalance)
        return;
      await this.ethers.createOrder(this.selectedDataType, this.price, this.units);
    },
  },
};
</script>

<style scoped>
.row {
  margin-top: 30px;
}
</style>