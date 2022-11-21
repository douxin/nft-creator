import { ethers } from "hardhat";

const factoryContractAddr = '0x973a6be1C739E8901A02b71D252bD9B4E31E0Fe0';
const abi = require('../artifacts/contracts/CreatorFactory.sol/CreatorFactory.json').abi;
const ganachaUrl = 'http://127.0.0.1:7545';
const provider = new ethers.providers.JsonRpcProvider(ganachaUrl);
const userPrivateKey = '17f27fe2507cf6c5036e5808520b405525ea16587efaed1098c8cf28a5603d11';
const signer = new ethers.Wallet(userPrivateKey, provider);
const contract = new ethers.Contract(factoryContractAddr, abi, signer);
const user = '0x6305f47113F2BD96F1cc853308595B5fc6996753';

const collectionAbi = require('../artifacts/contracts/Collection.sol/Collection.json').abi;

const getCollectionsOf = async (user: string) => {
    return contract.collectionsOf(user);
}

const getCollectionCountOf = async (user: string) => {
    return contract.collectionCountOf(user);
}

const createColelction = async (name: string, symbol: string, baseUri: string) => {
    return contract.createCollection(name, symbol, baseUri);
}

const showCollectionInfo = async (collection: string) => {
    const _contract = new ethers.Contract(collection, collectionAbi, signer);
    return Promise.all([
        _contract.name(),
        _contract.symbol(),
    ])
}

const main = async () => {
    const collections = await getCollectionsOf(user);
    console.log(collections);

    const collectionCount = await getCollectionCountOf(user);
    console.log(collectionCount);

    // await createColelction(`1st nft`, 'FST', 'ipfs://first');
    // console.log(`collection created`);

    console.log(await showCollectionInfo('0x197d9055be710d4A72026A3B50d210Ccd1F8389A'));
}

main().catch(e => {
    console.error(e);
});