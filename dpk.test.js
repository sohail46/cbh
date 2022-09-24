const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("takes the input as number or string and returns hash string", () => {
    const trivialKey = deterministicPartitionKey(1);
    expect(trivialKey).toBeTruthy();
  });

  it("takes the input as object and returns the partitionKey", () => {
    const event = { partitionKey: 1 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBeTruthy();
  });
});
