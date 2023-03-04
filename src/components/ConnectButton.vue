// ConnectButton.vue
<template>
    <Button @click="onButtonClick">W3M Core Button</Button>
</template>

<script>
import ethereumClient from '@/services/walletconnect'
import { Web3Modal } from '@web3modal/html'

export default {
    data() {
        return {
            web3Modal: undefined
        }
    },
    created() {
        console.log(ethereumClient);
        setTimeout(() => {
            this.web3Modal = new Web3Modal(
                {
                    projectId: '67d1f7f27d715a4ffeb49e489586cc32',
                    walletImages: {}
                },
                ethereumClient
            )

            console.log(this.web3Modal);

        }, 30000)


    },
    methods: {
        async onButtonClick() {
            console.log('W3M Core Button clicked');
            await this.web3Modal.openModal();
        }
    }
}
</script>
