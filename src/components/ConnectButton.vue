<template>
    <button :disabled="disabled" @click="connect">{{ buttonText }}</button>
</template>
  
<script>
import { SignClient } from '@walletconnect/sign-client'
import { Web3Modal } from '@web3modal/standalone'

export default {
    data() {
        return {
            disabled: true,
            buttonText: 'Initializing...',
            projectId: '8e6b5ffdcbc9794bf9f4a1952578365b',
            namespaces: {
                eip155: { methods: ['eth_sign'], chains: ['eip155:1'], events: ['accountsChanged'] }
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
  