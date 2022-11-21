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
        // ganacha test accounts
        '31d2eb1169a3f8418bbb1fb94f37cacb73f7beaa37c00803c59d1093c3cf2236',
        'ea2a550267d19a5ea5fb02146f3472f699f4149256c22437d6eaea5ac07e9f1b',
      ]
    }
  }
};

export default config;
