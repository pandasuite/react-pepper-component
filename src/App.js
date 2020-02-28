import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ListGroup, Container, Row, Col, Spinner, Button,
} from 'react-bootstrap';
import { IoIosChatbubbles } from 'react-icons/io';
import { FiBookmark } from 'react-icons/fi';
import _ from 'lodash';

import usePandaBridge from './usePandaBridge';
import usePepperChat from './usePepperChat';

function App() {
  const { properties, markers } = usePandaBridge({
    // properties: {
    //   qichatFileName: 'product_info_enu.top',
    // },
    // markers: {},
  });
  const { bookmarks } = usePepperChat(properties || {}, markers || {});

  if (!properties || !markers) {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center ">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const { qichatFileName } = properties;
  const bookmarkItems = [];

  if (_.isEmpty(bookmarks)) {
    bookmarkItems.push(
      <ListGroup.Item disabled>No bookmarks found</ListGroup.Item>,
    );
  } else {
    _.each(bookmarks, (bookmark) => {
      bookmarkItems.push(
        <ListGroup.Item action onClick={() => { window.PandaBridge.send('triggerMarker', bookmark); }}>
          <FiBookmark className="m-1" />
          {bookmark.substring(1)}
        </ListGroup.Item>,
      );
    });
  }

  return (
    <Container>
      <Row className="p-3">
        <Col>
          <b>Trigger Pepper Actions</b>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="m-1" variant="outline-secondary" onClick={() => { window.PandaBridge.send('humanIsEngaged'); }}>Human is engaged</Button>
          <Button className="m-1" variant="outline-secondary" onClick={() => { window.PandaBridge.send('qiChatStarted'); }}>Qi Chat Started</Button>
        </Col>
      </Row>
      <Row className="p-3">
        <Col>
          <b>QiChat Bookmarks</b>
        </Col>
        <Col className="text-right">
          <IoIosChatbubbles size="16" color="#0083AD" className="m-1" />
          {qichatFileName}
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup defaultActiveKey="#link1">
            {bookmarkItems}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
