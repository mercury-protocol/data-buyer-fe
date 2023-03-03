<template>
    <Button @click="onButtonClick" :label="connectButtonLabel"></Button>
</template>

<script>

// import ethereumClient from '../services/wagmi'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createClient } from "@wagmi/core";
import { goerli, filecoinHyperspace } from "@wagmi/core/chains";
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";


export default {
    data() {
        return {
            web3Modal: {},
            connectButtonLabel: "Connect Wallet",
            chains: [goerli, filecoinHyperspace],
            projectId: "67d1f7f27d715a4ffeb49e489586cc32"
        }
    },
    created() {
        const chains = this.chains;
        const projectId = this.projectId;
        const { provider } = configureChains(chains, [
            walletConnectProvider({ projectId }),
        ]);
        const wagmiClient = createClient({
            autoConnect: true,
            connectors: [
                ...modalConnectors({
                    appName: "web3Modal",
                    chains,
                    version: "2",
                    projectId: projectId,
                }),
                chains,
                // new SafeConnector({ chains }),
            ],
            provider,
        });
        const ethereumClient = new EthereumClient(wagmiClient, chains);
        console.log('ethereumClient', ethereumClient)
        console.log('CREATED')
        this.web3Modal = new Web3Modal(
            {
                projectId: '67d1f7f27d715a4ffeb49e489586cc32',
                // walletImages: {
                //     // goerli: '',
                //     filecoinHyperspace: 'https://asset.brandfetch.io/id53RKKEgl/idrM5KW9wi.png'
                // }
            },
            ethereumClient
        )
        console.log('this.web3Modal', this.web3Modal)
    },
    methods: {
        async onButtonClick() {
            console.log('W3M Core Button clicked');
            await this.web3Modal.openModal();
            // this.onAccountUpdate();
        },
        // onAccountUpdate() {
        //     console.log('GET ACCOUNT')
        //     const account = getAccount()
        //     console.log(account);


        // const { data: ensName } = useEnsName({ address })
        // if (isConnected) {
        //     this.connectButtonLabel = ensName ? ensName : address;
        // }

        // }
    }
}
</script>
