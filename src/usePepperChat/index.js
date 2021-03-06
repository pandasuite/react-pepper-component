import { useState, useEffect } from 'react';
import _ from 'lodash';
import PandaBridge from 'pandasuite-bridge';

function usePepperChat(properties) {
  const [bookmarks, setBookmarks] = useState([]);

  function extractMarkersFromChatFile(url) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const newBookmarks = data.match(/%[a-zA-Z0-9]+/g) || [];
        if (!_.isEqual(bookmarks, newBookmarks)) {
          setBookmarks(newBookmarks);
        }
      });
  }

  useEffect(() => {
    if (!_.isEmpty(properties) && properties.qichatFileName) {
      const directory = PandaBridge.resolvePath('qichat.zip') || '';
      extractMarkersFromChatFile(`${directory}${properties.qichatFileName}`);
    }

    PandaBridge.unlisten('__ps_getSnapshotData');
    PandaBridge.getSnapshotData(() => {
      if (bookmarks) {
        return bookmarks.map((bookmark) => ({ id: bookmark }));
      }
      return null;
    });
  });

  return { bookmarks };
}

export default usePepperChat;
