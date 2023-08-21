const Store = artifacts.require("Store");

contract("Store", (accounts) => {
  let storeInstance;

  before(async () => {
    storeInstance = await Store.deployed();
  });

  it("should store and retrieve data", async () => {
    const newId = "1"; // Assign a unique ID
    const newName = "Alice";
    const newNumber = 42;

    // Store data
    await storeInstance.storeData(newId, newName, newNumber);

    // Retrieve data
    const data = await storeInstance.getData(accounts[0]);

    assert.equal(data[0], newId, "Stored ID does not match");
    assert.equal(data[1], newName, "Stored name does not match");
    assert.equal(data[2].toNumber(), newNumber, "Stored number does not match");
    assert.isAbove(data[3].toNumber(), 0, "Timestamp should be greater than zero");
  });
});
