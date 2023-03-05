<template>
    <div class="mt-8 ml-4 mr-4">
        <div class="grid grid-rows-1 grid-cols-2">
            <Header class="mt-2 md:mt-0" />
            <WalletConnect :provider="this.wagmiProvider" :signer="this.wagmiSigner" :factory="this.wagmiFactory"
                :ethersObject="this.ethersObject" />
        </div>
        <DataBuyerAddress :ethersObject="this.ethersObject" />
        <CreateOrder v-if="this.ethers.dataBuyerInstance != ''" :ethersObject="this.ethersObject" />
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import WalletConnect from "@/components/WalletConnect.vue";
import DataBuyerAddress from "../components/DataBuyerAddress.vue";
import CreateOrder from "../components/CreateOrder.vue";
import WagmiClass from "../services/wagmi"

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
            ethersObject: Object,
            wagmiProvider: {},
            wagmiSigner: {},
            wagmiFactory: {},
        }
    },
    async mounted() {
    },
    methods: {
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