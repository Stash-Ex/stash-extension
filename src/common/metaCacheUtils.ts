import keccak256 from "keccak256";
import { CACHE_ID_SEPARATOR } from "./metaCacheConstants";

export const createCacheIdFromParts = (siteUrl: string, cacheKey: string) => 
  `${keccak256(siteUrl).toString('hex')}${CACHE_ID_SEPARATOR}${keccak256(cacheKey).toString('hex')}`;