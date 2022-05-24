import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const shortenLinkText = (text: string) => (text.length > 13 ? `${text.slice(0, 6)}...${text.slice(-4)}` : text)

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

function Link({ href, children }: LinkProps) {
  return (
    <a className='text-purple-500 p-1 hover:text-purple-800' href={href} target="_blank" rel="noreferrer">
      {children}
      <FontAwesomeIcon icon={"external-link-alt"} size="xs" transform={{ size: 10, x: -1, y: -4 }} />
    </a>
  );
}

interface ContractLinkProps {
  contract: string;
  text?: string;
  shorten?: boolean;
}

function ContractLink({ contract, text }: ContractLinkProps): JSX.Element {
  const href = `https://goerli.voyager.online/contract/${contract}`;
  return <Link href={href}>{shortenLinkText(text ? text : contract)}</Link>;
}

interface TransactionLinkProps {
  transactionHash: string;
}

function TransactionLink({
  transactionHash,
}: TransactionLinkProps): JSX.Element {
  const href = `https://goerli.voyager.online/tx/${transactionHash}`;
  return <Link href={href} >{shortenLinkText(transactionHash)}</Link>;
}

interface BlockLinkProps {
  block: string;
}

function BlockLink({ block }: BlockLinkProps): JSX.Element {
  const href = `https://goerli.voyager.online/block/${block}`;
  return <Link href={href}>{shortenLinkText(block)}</Link>;
}

export const VoyagerLink = {
  Contract: ContractLink,
  Transaction: TransactionLink,
  Block: BlockLink,
};
