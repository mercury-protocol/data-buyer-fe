const ethers = require("ethers");
const buyerAbi = require("../abis/dataBuyer.json");
import { getContract } from "@wagmi/core";

class Ethers {
  constructor(wagmiProvider, wagmiSigner, wagmiFactory) {
    this.provider = wagmiProvider;
    this.signer = wagmiSigner;
    this.factory = wagmiFactory;
    this.dataBuyerInstance = undefined;
    this.dataBuyer;
    this.address = wagmiSigner.address;
  }

  setDataBuyerInstanceAddress = async function (addr) {
    if (ethers.utils.isAddress(addr)) {
      this.dataBuyerInstance = addr;
      this.dataBuyer = getContract(
        this.dataBuyerInstance,
        buyerAbi,
        this.signer
      );
      return true;
    } else {
      alert("Not a valid address.");
      return false;
    }
  };

  getDeployedDataBuyers = async function () {
    try {
      const dataBuyers = await this.factory.dataBuyers(this.address, 0);
      return dataBuyers;
    } catch (e) {
      return [];
    }
  };

  createOrder = async function (type, price, units) {
    let dataType;
    if (type == 1) {
      dataType = {
        id: 1,
        name: "BROWSING",
      };
    } else {
      dataType = {
        id: 2,
        name: "HEALTH",
      };
    }
    const priceWei = ethers.utils.parseUnits(price.toString(), "ether");
    console.log("Price wei: ", priceWei.toString());

    console.log("UNITS: ", units);
    console.log("Data type: ", dataType);

    try {
      const tx = await this.dataBuyer.createOrder(
        priceWei,
        units.toString(),
        dataType,
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
      await tx.wait();
      alert("Order created!");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  deployDataBuyer = async function () {
    try {
      await this.factory.createDataBuyer();
    } catch (e) {
      console.log(e);
    }
  };
}

export default Ethers;
