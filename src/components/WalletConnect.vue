<template>
    <div class="md:ml-auto pr-4">
        <Button @click="openModal()" :label="buttonText" />
    </div>
</template>
  
<script>
import {
    configureChains,
    createClient,
    watchAccount,
    getProvider,
    getNetwork, getContract, watchNetwork
} from "@wagmi/core";
import { goerli, filecoinHyperspace } from "@wagmi/core/chains";
import { Web3Modal } from "@web3modal/html";
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";
const factoryAbi = require("../abis/mercuryFactory.json");
const ethersObject = require("../services/ethers");

export default {
    name: "wallet-connect",
    data() {
        return {
            web3modal: {},
            web3client: {},
            account: "",
            buttonText: "Connect",
            balance: 0,
            provider: {},
            factory: Object,
            signer: '',
            ethersObject: Object
        };
    },
    mounted() {
        const app = this;
        const chains = [goerli, filecoinHyperspace];
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
        this.provider = provider;
        this.signer = 'signer';
    },
    methods: {
        async openModal() {
            const app = this;
            app.web3modal.openModal();
        },
        async readState() {
            const app = this;
            const account = app.web3client.getAccount();
            app.account = account.address;

            const provider = getProvider();
            console.log("Provider:", provider);

            const signer = provider.getSigner();
            console.log("Signer:", signer);

            const balance = await provider.getBalance(app.account);
            app.balance = balance;
            console.log("Balance:", balance.toString());

            this.buttonText = account.address ? account.address.substr(0, 6) + "..." + account.address.substr(-6) : "Connect";

        },
        setFactory(network) {
            let chain = network.id;
            console.log("network", network)
            if (chain === 5) {
                this.factory = getContract({
                    address: '0x6617514f164E4103706B3183eaF07cC669D6851F',
                    abi: factoryAbi,
                    signerOrProvider: this.provider.address,
                })
            } else {
                this.factory = getContract({
                    address: '0x6617514f164E4103706B3183eaF07cC669D6851F',
                    abi: factoryAbi,
                    signerOrProvider: this.provider.address,
                })
            }
        },
        async connect() {
            const app = this;
            console.log("Try background connection");
            app.readState();
            watchAccount((connected) => {
                app.readState();
                console.log(connected)
                this.ethersObject = new ethersObject(this.provider, this.signer, this.factory);

            });

            let network = getNetwork();
            this.setFactory(network);
            watchNetwork((network) => {
                this.setFactory(network);
                this.ethersObject = new ethersObject(this.provider, this.signer, this.factory);


            })

            this.ethersObject = new ethersObject(this.provider, this.signer, this.factory);
        },
    },

};
</script>