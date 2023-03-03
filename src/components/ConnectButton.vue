<template>
    <div class="w-1/2 pr-8 items-end">
        <Button class="float-right p-button-outlined" :disabled="disabled" @click="connect" :label="buttonText" />
    </div>
</template>
  
<script>
import { SignClient } from '@walletconnect/sign-client'
import { Web3Modal } from '@web3modal/standalone'

export default {
    data() {
        return {
            disabled: true,
            buttonText: 'Initializing...',
            projectId: '67d1f7f27d715a4ffeb49e489586cc32',
            namespaces: {
                eip155: { methods: ['eth_sign'], chains: ['eip155:5'], events: ['accountsChanged'] }
            },
            web3Modal: null,
            signClient: null
        }
    },
    async created() {
        this.web3Modal = new Web3Modal({ projectId: this.projectId, standaloneChains: this.namespaces.eip155.chains })
        try {
            this.signClient = await SignClient.init({ projectId: this.projectId })
            this.disabled = false
            this.buttonText = 'Connect Wallet'
        } catch (err) {
            console.error(err)
        }
        this.web3modal.setTheme({
            themeMode: "dark",
            themeColor: "blue",
            themeBackground: "themeColor",
        });
    },
    methods: {
        async connect() {
            try {
                if (this.signClient) {
                    const { uri, approval } = await this.signClient.connect({ requiredNamespaces: this.namespaces })
                    if (uri) {
                        await this.web3Modal.openModal({ uri })
                        await approval()
                        this.web3Modal.closeModal()
                    }
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>
  