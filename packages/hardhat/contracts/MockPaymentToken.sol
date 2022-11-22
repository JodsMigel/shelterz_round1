// SPDX-License-Identifier: MIT
//
//--------------------------
// 44 65 66 69 4d 6f 6f 6e
//--------------------------
//
// Mock token for testing payments in ERC20 tokens
// [+] Ownable
// [+] Burnable
// [+] ERC20 interface

pragma solidity ^0.8.4;

import "../libs/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../libs/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../libs/@openzeppelin/contracts/access/Ownable.sol";

contract MockPaymentToken is ERC20, ERC20Burnable, Ownable {

    // -------------------------------------------------------------------------------------------------------
    // ------------------------------- GLOBAL PARAMETERS
    // -------------------------------------------------------------------------------------------------------

    // @notice               mints DEV_TEST_AMOUNT to this address at deploy
    uint256 public           DEV_TEST_AMOUNT = 10000000000 ether;
    address constant         DEV_ADDRESS = 0x95e9450e2737e2239Be1CE225D79E4B2bE171f71; // <----- set dev address EOA


    // FUNCTIONS

    constructor()            ERC20("MockPaymentToken", "MPT") {
      _mint(DEV_ADDRESS, DEV_TEST_AMOUNT);
    }

    // @notice               allows any user to get test tokens
    // @param                [address] to     => address to mint tokens to
    // @param                [uint256] amount => amount of tokens to mint
    function                 mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
