// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/ICollection.sol";

contract Collection is Ownable, ERC721, ICollection {
    string private _baseUri;

    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    using Strings for uint256;
    
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

    function tokenURI(uint256 tokenId_) public override view returns (string memory) {
        _requireMinted(tokenId_);
        string memory baseUri = _baseURI();
        return bytes(baseUri).length > 0 ? 
            string(abi.encodePacked(baseUri, "?filename=", tokenId_.toString(), ".json")) : "";
    } 

    function currentTokenId() public view returns (uint256) {
        return tokenId.current();
    }

    function mint(uint256 toMintTokenId_) public onlyOwner returns (uint256 tokenId_) {
        tokenId_ = tokenId.current();
        // this toMintTokenId_ should equal to the latest call of currentTokenId()
        // first owner invoke currenttokenId() to get the tokenId which will be minted
        // then upload images or videos to ipfs in front end, and generate the dist json config file
        // upload json file to ipfs, and mint the NFT with latest tokenId
        require(toMintTokenId_ == tokenId_, "tokenId not match");
        _safeMint(msg.sender, tokenId_);
        tokenId.increment();
    }

    function deleteToken(uint256 tokenId_) public onlyOwner {
        _requireMinted(tokenId_);
        _burn(tokenId_);
        emit TokenDeleted(msg.sender, tokenId_);
    }

    function deleteCollection() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}