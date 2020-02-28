import { useState, useEffect } from 'react';
import _ from 'lodash';

function usePandaBridge(values) {
  const [bridge, setBridge] = useState(values);

  useEffect(() => {
    window.PandaBridge.init(() => {
      window.PandaBridge.onLoad((pandaData) => {
        const newBridge = {
          properties: pandaData.properties,
          markers: pandaData.markers,
        };
        if (!_.isEqual(bridge, newBridge)) {
          setBridge(newBridge);
        }
      });
    });
  });

  return bridge;
}

export default usePandaBridge;
