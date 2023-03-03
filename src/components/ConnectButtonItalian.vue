<template>
    <div class="mt-5">
        <Button class="is-primary" @click="openModal()" v-if="!account" style="width: 100%; padding: 10px">
            Connect
        </Button>
        <div v-if="account !== undefined && account" class="has-text-left box-account mix-gradient mt-6">
            <div class="is-flex is-align-items-center">
                <p class="mr-2 is-medium">
                    <i class="color-white fa-sharp fa-solid fa-circle-check"></i>
                </p>
                <p class="color-white is-medium">CONNECTED</p>
            </div>
            <p class="color-white is-medium mt-3">
                {{ account.substr(0, 6) + "..." + account.substr(-6) }}
            </p>
        </div>
    </div>
</template>
  
<script>
import {
    configureChains,
    createClient,
    watchAccount,
    getProvider,
} from "@wagmi/core";
import { goerli, mainnet } from "@wagmi/core/chains";
import { Web3Modal } from "@web3modal/html";

import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";

export default {
    name: "wallet-connect",
    data() {
        return {
            web3modal: {},
            web3client: {},
            account: "",
            balance: 0,
        };
    },
    mounted() {
        const app = this;
        const chains = [mainnet, goerli];
        // Wagmi Core Client
        const { provider } = configureChains(chains, [
            walletConnectProvider({
                projectId: "b93437f2799c397d5341d029cc7bbc48",
            }),
        ]);
        const wagmiClient = createClient({
            autoConnect: true,
            connectors: modalConnectors({ appName: "web3Modal", chains }),
            provider,
        });
        // Web3Modal and Ethereum Client
        app.web3client = new EthereumClient(wagmiClient, chains);
        app.web3modal = new Web3Modal(
            { projectId: "b93437f2799c397d5341d029cc7bbc48" },
            app.web3client
        );
        app.connect();
    },
    methods: {
        async openModal() {
            const app = this;
            app.web3modal.openModal();
        },
        async readState() {
            const app = this;
            console.log('GET ACCOUNT')
            const account = app.web3client.getAccount();
            app.account = account.address;
            const provider = getProvider();
            console.log("Provider:", provider);
            const signer = provider.getSigner();
            console.log("Signer:", signer);
            const balance = await provider.getBalance(app.account);
            app.balance = balance;
            console.log("Balance:", balance.toString());
        },
        async connect() {
            const app = this;
            console.log("Try background connection");
            app.readState();
            watchAccount((connected) => {
                app.readState();
                console.log(connected);
            });
        },
    },
};
</script>