const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations, { gas: 5000000 }); // Adjust the gas limit as needed
};
