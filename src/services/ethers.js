const ethers = require("ethers");
const buyerAbi = require("../abis/dataBuyer.json");
const factoryAbi = require("../abis/mercuryFactory.json");

class Ethers {
  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner();
    this.factory = new ethers.Contract(
      "0x6617514f164E4103706B3183eaF07cC669D6851F",
      factoryAbi,
      this.signer
    );

    this.dataBuyerInstance = "";
    this.dataBuyer;

    this.address = "";
    const _this = this;

    window.ethereum.on("accountsChanged", async function () {
      _this.provider = new ethers.providers.Web3Provider(window.ethereum);
      _this.signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();
      _this.factory = new ethers.Contract(
        "0x6617514f164E4103706B3183eaF07cC669D6851F",
        factoryAbi,
        _this.signer
      );
      _this.dataBuyer = new ethers.Contract(
        _this.dataBuyerInstance,
        buyerAbi,
        _this.signer
      );

      await _this.provider.send("eth_requestAccounts", []);
      _this.address = await _this.signer.getAddress();
    });
  }

  connect = async function () {
    await this.provider.send("eth_requestAccounts", []);
    this.address = await this.signer.getAddress();
    console.log("Connected address is: ", this.address);
  };

  setDataBuyerInstanceAddress = async function (addr) {
    if (ethers.utils.isAddress(addr)) {
      this.dataBuyerInstance = addr;
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();
      this.dataBuyer = new ethers.Contract(
        this.dataBuyerInstance,
        buyerAbi,
        signer
      );
      return true;
    } else {
      alert("Not a valid address.");
      return false;
    }
  };

  getDeployedDataBuyers = async function () {
    if (this.address == "") {
      await this.connect();
    }
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
