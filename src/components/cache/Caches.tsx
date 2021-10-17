import React from 'react';
import { useEffect, useState } from 'react';

const getData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
}

const Caches = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getData();
      setData(response);
    })();

  }, [])

  const port = chrome.runtime.connect({ name: "popup" });
  port.onMessage.addListener((message) => {
    // log(`received message: ${message}`);
  })
  
  // const buttonAction = () => {
  //   port.postMessage("Message from UI");
  // }

  return (
    <div>
      <p>Caches hidden on page:</p>
      <ul>
        {data.map( item => (<li>{JSON.stringify(item)}</li>))}
      </ul>
    </div>
  )
}

export default Caches;