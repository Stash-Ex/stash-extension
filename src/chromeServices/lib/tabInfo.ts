export function isLocalNetwork(hostname = window.location.hostname) {
  return (
    (['localhost', '127.0.0.1', '', '::1'].includes(hostname))
    || (hostname.startsWith('192.168.'))
    || (hostname.startsWith('10.0.'))
    || (hostname.endsWith('.local'))
  )
}

export const getCurrentURL = async (): Promise<string> => {
  if (isLocalNetwork()) {
    console.log("Running in local network")
    return window.location.href;
  }

  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log('query');
  console.log(JSON.stringify(tabs));
  return tabs[0].url;
}
