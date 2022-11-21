import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: 'ganacha',
  networks: {
    hardhat: {},
    ganacha: {
      url: 'http://127.0.0.1:7545',
      accounts: [
        // test accounts, shoule be changed
        '17f27fe2507cf6c5036e5808520b405525ea16587efaed1098c8cf28a5603d11',
        '4cfbbade4945101a96d96e469d90c5f757e82b8d6c13bf2ca5f65eecf020d55a',
      ]
    }
  }
};

export default config;
