
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()
const infuraKey = process.env.INFURA_KEY;
const mnemonic = process.env.METAMASK_SEED;

module.exports = {


  networks: {
 
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "5777",       // Any network (default: none)
    },


    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,       
      gas: 5500000,        

    },

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)

    }
  },


  db: {
    enabled: false
  }
};
