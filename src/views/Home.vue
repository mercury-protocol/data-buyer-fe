<template>
    <div class="mt-8 ml-4 mr-4">
        <Header />
        <DataBuyerAddress :ethers="this.ethers" />
        <CreateOrder v-if="this.ethers.dataBuyerInstance != ''" :ethers="this.ethers" />
        <WalletConnect></WalletConnect>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Ethers from "../services/ethers";
import WalletConnect from "@/components/WalletConnect.vue";
import DataBuyerAddress from "../components/DataBuyerAddress.vue";
import CreateOrder from "../components/CreateOrder.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components: {
        Header,
        DataBuyerAddress,
        CreateOrder,
        WalletConnect
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

p {
    color: #40eeec;
}

input {
    background-color: transparent;
    color: #40eeec;
}
</style>