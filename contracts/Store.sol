// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract Store {
    struct Data {
        string id; // ID assigned by admin
        string name;
        uint256 number;
        uint256 timestamp;
    }

    mapping(address => Data) private userToData;

    event DataStored(address indexed user, bytes32 dataHash);

    function storeData(string calldata newId, string calldata newName, uint256 newNumber) external {
        Data storage userData = userToData[msg.sender];
        userData.id = newId;
        userData.name = newName;
        userData.number = newNumber;
        userData.timestamp = block.timestamp;

        bytes32 dataHash = calculateDataHash(newName, newNumber, userData.timestamp);
        emit DataStored(msg.sender, dataHash);
    }

    function calculateDataHash(string memory newName, uint256 newNumber, uint256 timestamp) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(newName, newNumber, timestamp));
    }

    function getData(address user) external view returns (string memory, string memory, uint256, uint256, bytes32) {
        Data storage userData = userToData[user];
        bytes32 dataHash = calculateDataHash(userData.name, userData.number, userData.timestamp);
        return (userData.id, userData.name, userData.number, userData.timestamp, dataHash);
    }
}
