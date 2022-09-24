const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  const ALOGORITHM = "sha3-512";
  const DIGEST = "hex";

  let candidate =
    getCandidate({ event, algorithm: ALOGORITHM, digest: DIGEST }) ||
    TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate, ALOGORITHM, DIGEST);
  }
  return candidate;
};

const stringify = (data) => {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  return data;
};

const createHash = (data, algorithm, digest) => {
  if (data && algorithm && digest) {
    return crypto.createHash(algorithm).update(data).digest(digest);
  }
  throw new Error("Required parameters missing!");
};

const getCandidate = (input) => {
  const { event, algorithm, digest } = input;
  let candidate = null;
  try {
    if (event) {
      if (event?.partitionKey) {
        candidate = event.partitionKey;
      } else {
        const data = stringify(event);
        candidate = createHash(data, algorithm, digest);
      }
    }

    if (candidate) {
      candidate = stringify(candidate);
    }
  } catch (err) {}
  return candidate;
};
