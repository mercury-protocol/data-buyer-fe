// ethClient.js
// import { SafeConnector } from "@gnosis.pm/safe-apps-wagmi";
import { configureChains, createClient } from "@wagmi/core";
import { goerli, filecoinHyperspace } from "@wagmi/core/chains";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

const chains = [goerli, filecoinHyperspace];
const projectId = "67d1f7f27d715a4ffeb49e489586cc32";

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

export default ethereumClient;
