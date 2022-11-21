// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/ICollection.sol";

contract Collection is Ownable, ERC721, ICollection {
    string private _baseUri;
    
    constructor(string memory name, string memory symbol, address owner, string memory baseUri) ERC721(name, symbol) {
        setBaseURI(baseUri);
        transferOwnership(owner);
    }

    function _baseURI() internal override view returns (string memory) {
        return _baseUri;
    }

    function setBaseURI(string memory newBaseUri) public onlyOwner {
        _baseUri = newBaseUri;
    }

    function tokenURI(uint256 tokenId) public override view returns (string memory) {
        string memory baseUri = _baseURI();
        return bytes(baseUri).length > 0 ? 
            string(abi.encodePacked(baseUri, "?filename=", tokenId, ".json")) : "";
    } 

    function deleteToken(uint256 tokenId) public onlyOwner {
        _requireMinted(tokenId);
        _burn(tokenId);
        emit TokenDeleted(msg.sender, tokenId);
    }

    function deleteCollection() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}