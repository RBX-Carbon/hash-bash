// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract HashBash {
    address public owner;                   // bigPoppa

    mapping (uint8 => bytes32) hashMash;    // mapping of all hashed answers
    uint public initime;                    // keeps the normies in check at least

    modifier bigPoppa {
        require(msg.sender == owner, '!owner');
        _;
    }

    constructor(bytes32[12] memory hash_mash, uint _initime) {
        owner = msg.sender;
        initime = _initime;
        for (uint8 i = 0; i < hash_mash.length; i++) hashMash[i] = hash_mash[i];
    }

    function feelingLucky(uint8 pick, string calldata luckyGuess) public view returns (bool outcome) {
        require(block.timestamp >= initime, '!initime');
        return keccak256(abi.encode(luckyGuess)) == hashMash[pick];
    }

    function hashString(string calldata toHash) public pure returns(bytes32){
        return keccak256(abi.encode(toHash));
    }

    function swapHash(uint8 item, bytes32 hashedItem) public bigPoppa {
        hashMash[item] = hashedItem;
    }

    function transferOwnership(address _owner) public bigPoppa {
        owner = _owner;
    }
}