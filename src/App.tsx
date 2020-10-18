import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import ProgressSpinner from "./ProgressSpinner";
import "./styles.scss";

export default function App() {
  const [progress, setProgress] = useState(70);
  const [spin, setSpin] = useState(true);
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("lg");

  const max = 100;

  return (
    <div className="App">
      <h1>Progress Spinner demo</h1>
      <p />

      <div className={`spinner-container spinner-container-${size}`}>
        <ProgressSpinner
          size={size}
          maxProgress={max}
          progress={progress}
          spin={spin}
          variant={variant}
        />
        <div className='progress-text'>
          {Math.floor(progress)}
          <span style={{ fontSize: "0.7rem" }}> %</span>
        </div>
      </div>
      <p />

      <Form>
        <Form.Row>
          <Form.Group as={Col} lg="1" md='2' controlId="progress">
            <Form.Label>Progress</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              defaultValue={progress}
              step={0.25}
              min={0}
              max={max}
              onChange={({ target: { value } }) => setProgress(Number(value))}
            />
          </Form.Group>
          <Form.Group as={Col} lg="1" md='2' controlId="variant">
            <Form.Label>Variant</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              defaultValue={variant}
              onChange={({ target: { value } }) => setVariant(value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} lg='1' md='2' controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              defaultValue={size}
              onChange={({ target: { value } }) => setSize(value)}
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Check
              id="spin-check"
              label="Spin"
              type="checkbox"
              defaultChecked={spin}
              onChange={({target: {checked}}: React.ChangeEvent<HTMLInputElement>) => setSpin(checked)}
            />
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
