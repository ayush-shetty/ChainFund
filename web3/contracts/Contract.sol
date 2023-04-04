// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Contract {
    struct Fund{
        string title;
        address owner;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;

    }

    mapping(uint256 => Fund) public funds;

    uint256 public nooffunds=0;

    function createFund(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
      Fund storage fund = funds[nooffunds];

      require(fund.deadline < block.timestamp, "The deadline should be a date in the future"); 
              
        fund.owner = _owner;
        fund.title = _title;
        fund.description = _description;
        fund.target = _target;
        fund.deadline = _deadline;
        fund.amountCollected = 0;
        fund.image = _image;

        nooffunds++;

        return nooffunds - 1; 
    }

    function donateFund(uint256 _id) public payable {

        uint256 amount =msg.value;

        Fund storage fund=funds[_id];

        fund.donators.push(msg.sender);
        fund.donations.push(amount);

        (bool sent,) = payable(fund.owner).call{value: amount}("");

        if(sent) {
            fund.amountCollected = fund.amountCollected + amount;
        }

    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory){
        return (funds[_id].donators, funds[_id].donations);
    }

    function getFunds() public view returns (Fund[] memory) {
        Fund[] memory allFunds = new Fund[](nooffunds);

        for(uint i = 0; i < nooffunds; i++) {
            Fund storage item = funds[i];

            allFunds[i] = item;
        }

        return allFunds;
    }




}