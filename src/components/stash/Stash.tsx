import React from "react"

import ClaimStashForm from '../forms/ClaimStashForm';
import { StashState } from "../../store/stashprotocolSlice";
import { useTokenInfo } from "../../web3/hooks";
import { VoyagerLink } from "../VoyagerLink";

import { fromNativeTokenAmount } from "../../web3/starknet/utils";

const Stash = ({ stash }: { stash: StashState }) => {
  const { decimals, address, symbol } = useTokenInfo(stash.token);

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold">Stash #{stash.id}</h3>
      <p>Prize: {decimals && fromNativeTokenAmount(stash.amount, decimals)} {
        address && symbol && (
          <VoyagerLink.Contract
            contract={address}
            text={symbol}
          />
        )}
      </p>
      <p>Hint: {stash.hint}</p>
      <p>Owner: <VoyagerLink.Contract contract={stash.owner} /></p>
      {stash.claimed ? "Claimed" : <ClaimStashForm stashInfo={stash} />}
    </div>
  )
}

export default Stash;