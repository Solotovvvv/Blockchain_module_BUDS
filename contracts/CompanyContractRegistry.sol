// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CompanyContractRegistry {
    struct CompanyInfo {
        string companyName;
        uint256 duration;
        uint256 timestamp;
    }

    mapping(bytes32 => CompanyInfo) private contracts;

    event ContractRegistered(bytes32 indexed hash, string companyName, uint256 duration, uint256 timestamp);

    function registerContract(string calldata companyName, uint256 duration) external {
        uint256 timestamp = block.timestamp;
        bytes32 hash = generateHash(companyName, duration, timestamp);

        require(contracts[hash].timestamp == 0, "Contract already registered");

        contracts[hash] = CompanyInfo(companyName, duration, timestamp);

        emit ContractRegistered(hash, companyName, duration, timestamp);
    }

    function getContractInfo(bytes32 hash) external view returns (string memory, uint256, uint256) {
        require(contracts[hash].timestamp != 0, "Contract not found");
        CompanyInfo memory info = contracts[hash];
        return (info.companyName, info.duration, info.timestamp);
    }

    function generateHash(string memory companyName, uint256 duration, uint256 timestamp) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(companyName, duration, timestamp));
    }
}



