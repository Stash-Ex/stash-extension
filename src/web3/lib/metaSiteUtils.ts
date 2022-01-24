import { cachesAtLocation, getCache } from "./starknet/metacache.service";
import { number } from "starknet";
import { CacheState } from "../siteCachesSlice";


export const getSiteCaches = async (siteUrl: string): Promise<Array<CacheState>> => {
  console.log(`Getting caches for URL: ${siteUrl}`);
  try {
    const numCachesResult = await cachesAtLocation(siteUrl, "goerli-alpha");
    const numCaches = number.toBN(numCachesResult.result[0])
    console.log(`got ${numCaches} cache for site ${siteUrl}`)

    const caches: Array<CacheState> = []
    for (let i = 0; i < numCaches; i++) {
      const cache = await getCache(siteUrl, i.toString(), "goerli-alpha");

      caches.push({
        location: siteUrl,
        id: i.toString(),
        token: cache.result[0],
        amount: { low: cache.result[1], high: cache.result[2] },
        key: cache.result[3],
        hint: cache.result[4],
        owner: cache.result[5],
        claimed: cache.result[6],
      })
    }
    console.log(JSON.stringify(caches))
    return caches;
  } catch (error) {
    console.log(error)
    console.log("No caches found")
    return []
  }
}