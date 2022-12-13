import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const testString = '0x05294e8f4a5ee627df181a607a6376b9d98fab962d53722cd6871cf8321cedf6';
const hashes = [testString, testString, testString, testString, testString, testString, 
    testString, testString, testString, testString, testString, testString,]

describe("HashBash", function () {
    async function setup() {
        const hashbashFactory = await ethers.getContractFactory('HashBash');
        const hashbash = await hashbashFactory.deploy(hashes, time.latest());
        await hashbash.deployed();

        return { hashbash };
    }
    it("Should deploy and guess", async function () {
        const { hashbash } = await setup();

        expect(await hashbash.feelingLucky(0, 'sneed')).to.be.false;

        for(let i = 0; i < 11; i++){
            let guess = await hashbash.feelingLucky(i, 'test');
            expect(guess).to.be.true;
        }
    });
    it('Should return hashed string', async () => {
        const { hashbash } = await setup();

        expect(await hashbash.hashString('test')).to.be.equal(testString);
    });
    it('Should swap hash', async () => {
        const { hashbash } = await setup();

        const swap = await hashbash.swapHash(1, '0xa25eb852a9b2133c7e50ccdf18d498d7bc239764fe9db21fad59953194ae9969');
        expect(await hashbash.feelingLucky(1, 'test')).to.be.false;
        expect(await hashbash.feelingLucky(1, 'sneed')).to.be.true;
    });
    it('Should transfer owner', async () => {
        const { hashbash } = await setup();

        const [wallet1, wallet2] = await ethers.getSigners();
        expect(await hashbash.owner()).to.equal(wallet1.address);

        const transferOwner = await hashbash.transferOwnership(wallet2.address);
        expect(await hashbash.owner()).to.equal(wallet2.address);

    });
});

