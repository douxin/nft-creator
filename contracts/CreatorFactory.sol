// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Collection.sol";

contract CreatorFactory is Ownable {
    mapping(address => address[]) private _collections;

    event CollectionCreated(address owner, address collectionAddr);

    function collectionsOf(address owner) public view returns (address[] memory) {
        return _collections[owner];
    }

    function collectionCountOf(address owner) public view returns (uint256 count) {
        count = _collections[owner].length;
    }

    function createCollection(string memory name, string memory symbol, string memory baseUri) public returns (address collectionAddr) {
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, symbol));
        Collection _collection = new Collection{salt: salt}(name, symbol, msg.sender, baseUri);
        collectionAddr = address(_collection);
        _collections[msg.sender].push(collectionAddr);
        emit CollectionCreated(msg.sender, collectionAddr);
    }
}