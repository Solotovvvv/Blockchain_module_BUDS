const CompanyContractRegistry = artifacts.require("CompanyContractRegistry");

module.exports = function (deployer) {
  deployer.deploy(CompanyContractRegistry);
};
