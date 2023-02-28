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

  checkBalance(_address, requiredTokenBalance) {
    window.Cypher({
      address: _address, // user wallet address
      targetChainIdHex: "0x5", // goerli
      requiredTokenBalance: requiredTokenBalance, // Required: Token Value Required with respect to native currency or token value
      isTestnet: true, // Optional: enable testnet for developer testing
      requiredTokenContractAddress:
        "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
      callBack: (success) => {
        // Optional
        if (success) {
          alert("User wallet has a necessary token or currency");
          return true;
        } else {
          alert("Failed to load user wallet necessary token or currency");
          return false;
        }
      }, //
    });
  }
}

export default Cypher;
