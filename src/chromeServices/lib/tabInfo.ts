/*global chrome*/
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
    return window.location.href;
  }

  let queryOptions = { active: true, currentWindow: true };
  return Promise.resolve(window.location.href);
}
