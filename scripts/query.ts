import { ethers } from "hardhat";

const factoryContractAddr = '0x10e1f1541c3a274bc3EDf90532d96f93038FcD80';
const abi = require('../artifacts/contracts/CreatorFactory.sol/CreatorFactory.json').abi;
const ganachaUrl = 'http://127.0.0.1:7545';
const provider = new ethers.providers.JsonRpcProvider(ganachaUrl);
const user = '0x6dbf62CDF7BD6051Ae8579515246971ca10ac8Ca';
const userPrivateKey = '31d2eb1169a3f8418bbb1fb94f37cacb73f7beaa37c00803c59d1093c3cf2236';
const signer = new ethers.Wallet(userPrivateKey, provider);
const contract = new ethers.Contract(factoryContractAddr, abi, signer);

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
    const _contract = new ethers.Contract(collection, collectionAbi, provider);
    return Promise.all([
        _contract.name(),
        _contract.symbol(),
    ])
}

const showTokenInfo = async (collection: string, tokenId: number) => {
    const _contract = new ethers.Contract(collection, collectionAbi, provider);
    return Promise.all([
        _contract.balanceOf(user),
        _contract.ownerOf(tokenId),
        _contract.tokenURI(tokenId),
    ])
}

const mintTokenOfCollection = async (collection: string) => {
    const _contract = new ethers.Contract(collection, collectionAbi, signer);
    const tokenId = await _contract.currentTokenId();
    await _contract.mint(tokenId);
}

const main = async () => {
    const collections = await getCollectionsOf(user);
    console.log(collections);

    const collectionCount = await getCollectionCountOf(user);
    console.log(collectionCount);

    // await createColelction(`1st nft`, 'FST', 'ipfs://first');
    // console.log(`collection created`);

    const collection1ContractAddr = '0x79d4Dd5f7b32160625e00CF6927eF3414ea63490';
    console.log(await showCollectionInfo(collection1ContractAddr));

    // await mintTokenOfCollection(collection1ContractAddr);
    console.log(await showTokenInfo(collection1ContractAddr, 0));
}

main().catch(e => {
    console.error(e);
});