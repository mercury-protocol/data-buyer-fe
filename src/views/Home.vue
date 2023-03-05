<template>
    <div class="mt-8 ml-4 mr-4">
        <div class="grid grid-rows-1 grid-cols-2">
            <Header class="mt-2 md:mt-0" />
            <WalletConnect :provider="this.provider" :signer="this.signer" :ethers="this.ethers" />
        </div>
        <DataBuyerAddress :ethers="this.ethers" />
        <CreateOrder v-if="this.ethers.dataBuyerInstance != ''" :ethers="this.ethers" />
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
            provider: undefined,
            signer: undefined
        }
    },
    async mounted() {
    },
    methods: {
        initEthers() {
            const ethers = new Ethers();
            this.ethers = ethers;
        }

    }
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