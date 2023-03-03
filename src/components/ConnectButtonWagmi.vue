<template>
    <Button @click="onButtonClick">W3M Core Button</Button>
</template>
  
<script>
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { configureChains, createClient } from '@wagmi/core'
import { goerli, filecoinHyperspace } from '@wagmi/core/chains'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'

export default {

    created() {
        // Define constants
        const chains = [goerli, filecoinHyperspace]
        console.log(this.projectId);
        let projectId = this.projectId;
        // Configure wagmi client
        const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
        const wagmiClient = createClient({
            autoConnect: true,
            connectors: [...modalConnectors({ appName: 'web3Modal', chains, version: "2", projectId: projectId }), new SafeConnector({ chains })],
            provider
        })
        this.ethereumClient = new EthereumClient(wagmiClient, chains)
        this.web3Modal = new Web3Modal(
            {
                projectId,
                walletImages: {
                }
            },
            this.ethereumClient
        )
    },

    methods: {
        async onButtonClick() {
            // Handle button click event
            console.log('W3M Core Button clicked');
            await this.web3Modal.openModal();
        }
    },

    data() {
        return {
            projectId: '67d1f7f27d715a4ffeb49e489586cc32',
            web3Modal: undefined,
            ethereumClient: undefined
        }
    }
}
</script>
  