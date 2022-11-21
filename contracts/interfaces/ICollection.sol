// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/interfaces/IERC721.sol";

interface ICollection is IERC721 {
    event TokenDeleted(address owner, uint256 tokenId);

    function setBaseURI(string memory newBaseUri) external;
    function currentTokenId() external returns (uint256);
    function deleteToken(uint256 tokenId) external;
    function deleteCollection() external;
}