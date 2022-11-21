import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("CreatorFactory");
  const factory = await Factory.deploy();

  await factory.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
