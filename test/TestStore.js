const Store = artifacts.require("Store");

contract("Store", (accounts) => {
  let storeInstance;

  before(async () => {
    storeInstance = await Store.deployed();
  });

  it("should store and retrieve data", async () => {
    const newName = "Alice";
    const newNumber = 42;

    // Store data
    await storeInstance.storeData(newName, newNumber);

    // Retrieve data
    const data = await storeInstance.getData(accounts[0]);

    // Calculate expected data hash
    const expectedDataHash = web3.utils.soliditySha3(
      { type: "string", value: newName },
      { type: "uint256", value: newNumber },
      { type: "uint256", value: data[2].toNumber() }
    );

    assert.equal(data[0], newName, "Stored name does not match");
    assert.equal(data[1].toNumber(), newNumber, "Stored number does not match");
    assert.isAbove(data[2].toNumber(), 0, "Timestamp should be greater than zero");
    assert.equal(data[3], expectedDataHash, "Data hash does not match");
  });
});
