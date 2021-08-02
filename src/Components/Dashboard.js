import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <Row>
      <Sidebar></Sidebar>
      <p>Additonal content</p>
    </Row>
  );
};

export default Dashboard;