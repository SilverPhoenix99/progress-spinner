import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import ProgressSpinner from "./ProgressSpinner";
import "./styles.scss";

export default function App() {
  const [progress, setProgress] = useState(70);
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [spin, setSpin] = useState(true);
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("lg");

  const max = 100;

  return (
    <div className="App">
      <h1>Progress Spinner demo</h1>
      <p />

      <ProgressSpinner
        size={size}
        strokeWidth={strokeWidth}
        maxProgress={max}
        progress={progress}
        spin={spin}
        variant={variant}
      >
        <div className="spinner-progress">
          {Math.floor(progress)}
          <span style={{ fontSize: "0.7rem" }}> %</span>
        </div>
      </ProgressSpinner>
      <p />

      <Form>
        <Form.Row>
          <Form.Group as={Col} sm="2" controlId="progress">
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
          <Form.Group as={Col} sm="2" controlId="variant">
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
          <Form.Group as={Col} sm="2" controlId="strokeWidth">
            <Form.Label>Stroke width</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              defaultValue={strokeWidth}
              step={1}
              min={1}
              max={
                // assumes 1rem === 16px
                size === "sm" ? 8
                : size === "md" ? 16
                : size === "lg" ? 24
                : 32 // assume 'xl'
              }
              onChange={({ target: { value } }) => setStrokeWidth(Number(value))}
            />
          </Form.Group>
          <Form.Group as={Col} sm="3" controlId="size">
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
