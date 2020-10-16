import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import "./styles.scss";
import ProgressSpinner from "./ProgressSpinner";

export default function App() {
  const [progress, setProgress] = useState(70);
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [spin, setSpin] = useState(false);
  const [variant, setVariant] = useState("primary");

  const max = 100;

  return (
    <div className="App">
      <h1>Progress Spinner demo</h1>
      <p />

      <ProgressSpinner
        size={60}
        strokeWidth={strokeWidth}
        max={max}
        progress={progress}
        spin={spin}
        variant={variant}
      >
        <div className="spinner-progress">{progress}%</div>
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
              step={1}
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
              max={30}
              onChange={({ target: { value } }) =>
                setStrokeWidth(Number(value))
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Check
              id="spin-check"
              label="Spin"
              type="checkbox"
              defaultChecked={spin}
              onChange={({ target: { checked } }) => setSpin(checked)}
            />
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
