<template>
    <div class="container">
        <Header />
        <DataBuyerAddress :ethers="this.ethers"/>
        <CreateOrder v-if="this.ethers.dataBuyerInstance != ''" :ethers="this.ethers"/>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Ethers from "../services/ethers";
import DataBuyerAddress from "../components/DataBuyerAddress.vue";
import CreateOrder from "../components/CreateOrder.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components: {
        Header,
        DataBuyerAddress,
        CreateOrder,
    },
    data() {
        return {
            ethers: Object,
        }
    },
    async mounted() {
        const ethers = new Ethers();
        this.ethers = ethers;
        await ethers.connect();
    },
}
</script>

<style>
html,
body {
      background-color: #061735 !important;
}
.container {
    margin-top: 30px;
}
p {
      color: #40eeec;
}
input {
    background-color: transparent;
    color: #40eeec;
}
</style>