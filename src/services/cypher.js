import { createScript } from "../utils.js"; // import a utility function to create script element

class Cypher {
  constructor() {
    createScript(
      "https://public.cypherd.io/js/onboardingsdk.js",
      "onboardingsdk"
    )
      .then(() => {
        console.log("The onboardingsdk script has been loaded");
        // You can now use the onboardingsdk global variable
      })
      .then(() => {
        console.log("added script");
      })
      .catch((error) => {
        // There was an error loading the onboardingsdk script
        console.error(error);
      });
  }

  async checkBalanceEther(_address, requiredTokenBalance) {
    const res = false;
    await window.Cypher({
      address: _address, // user wallet address
      targetChainIdHex: "0x5", // goerli
      requiredTokenBalance: requiredTokenBalance, // Required: Token Value Required with respect to native currency or token value
      isTestnet: true, // Optional: enable testnet for developer testing
      callback: (res) => {
        this.res = res;
      },
      // requiredTokenContractAddress:
      //   "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
    });
    return res;
  }

  async checkBalanceERC20(
    _address,
    requiredTokenBalance,
    _requiredTokenContractAddress
  ) {
    const res = await window.Cypher({
      address: _address, // user wallet address
      targetChainIdHex: "0x5", // goerli
      requiredTokenBalance: requiredTokenBalance, // Required: Token Value Required with respect to native currency or token value
      isTestnet: true, // Optional: enable testnet for developer testing
      requiredTokenContractAddress: _requiredTokenContractAddress,
    });
    return res;
  }
}

export default Cypher;
