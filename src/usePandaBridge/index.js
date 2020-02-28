import { useState, useEffect } from 'react';
import _ from 'lodash';
import PandaBridge from 'pandasuite-bridge';

function usePandaBridge(values) {
  const [bridge, setBridge] = useState(values);

  useEffect(() => {
    PandaBridge.init(() => {
      PandaBridge.onLoad((pandaData) => {
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
