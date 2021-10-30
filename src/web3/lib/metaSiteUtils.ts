import keccak256 from "keccak256";

export const getSiteCaches = async (siteUrl: string) => {
  console.log(`Getting caches for URL: ${siteUrl}`);
  await new Promise(resolve => setTimeout(resolve, 500));

  const urlHash = keccak256(siteUrl).toString('hex');
  console.log(`siteUrlHash is ${urlHash}`)

  return [
      {id: keccak256("secretKey1").toString('hex'), prize: "1 ETH", hints: ["hint1", "hint2", "hint3"]},
      {id: keccak256("secretKey2").toString('hex'), prize: "Punk #3357", hints: ["hint1", "hint2", "hint3"]}
  ]
}