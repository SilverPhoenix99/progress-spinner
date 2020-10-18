import React from "react";
import classNames from "classnames";
import { Variant } from 'react-bootstrap/types';
import "bootstrap/dist/css/bootstrap.min.css";
import "./progress-spinner.scss";

interface Props {
  progress: number;
  minProgress?: number;
  maxProgress?: number;
  size?: "sm" | "md" | "lg" | "xl" | string;
  variant?: Variant;
  spin?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

interface State {
  size: number;
}

export default class ProgressSpinner extends React.Component<Props, State> {

  static defaultProps = {
    minProgress: 0,
    maxProgress: 1,
    size: 'md',
    variant: 'primary',
    spin: false
  }

  state = { size: 0 };

  ref: React.RefObject<SVGSVGElement> = React.createRef();
  observer: MutationObserver;

  constructor(props: Readonly<Props>) {
    super(props);

    this.observer = new MutationObserver(() => {
      const el = this.ref.current as Element;
      const { width: size } = el.getBoundingClientRect();
      this.setState({ size });
    });
  }

  componentDidMount() {
    const el = this.ref.current as Element;
    const size = el.getBoundingClientRect().width;
    this.setState({ size });
    this.observer.observe(el, { attributes: true });
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {

    const {className, size: sizeClass, variant, spin, style, progress, minProgress, maxProgress} = this.props;
    const {size} = this.state;

    return (
      <svg
        ref={this.ref}
        viewBox={`0 0 ${size} ${size}`}
        className={classNames(className, "progress-spinner", `progress-spinner-${sizeClass}`, `text-${variant}`)}
      >
        <Circle
          size={size}
          spin={spin as boolean}
          style={style}
          progress={normalize(progress, minProgress as number, maxProgress as number)}
        />
      </svg>
    );
  }
}

interface CircleProps {
  size: number;
  spin: boolean;
  progress: number;

  style?: React.CSSProperties;
}

class Circle extends React.Component<CircleProps, CircleState> {

  state: CircleState = new CircleState(0, 0, 0);

  ref: React.RefObject<SVGCircleElement> = React.createRef();
  observer: MutationObserver;

  constructor(props: Readonly<CircleProps>) {
    super(props);

    this.observer = new MutationObserver(mutations => {
      if (mutations.map(m => m.attributeName).filter(a => a === 'class' || a === 'style').length !== 0) {
        this.updateState();
      }
    });
  }

  componentDidMount() {
    this.updateState();
    this.observer.observe(this.ref.current as Element, { attributes: true });
  }

  updateState() {
    this.setState((_state, props) => {
      const el = this.ref.current as Element;
      const newState = CircleState.fromElement(props.size, el);
      return newState;
    });
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  componentDidUpdate(prevProps: Readonly<CircleProps>) {
    if (this.props.size !== prevProps.size) {
      const el = this.ref.current as Element;
      const newState = CircleState.fromElement(this.props.size, el);
      this.setState(newState);
    }
  }

  render() {

    const {radius, circumference} = this.state;
    const {size, progress, spin, style} = this.props;

    return (
      <circle
        ref={this.ref}
        className={classNames('spinner-circle', {
          spin,
          paused: [0, 1].includes(progress)
        })}
        style={{
          ...style,
          display: size ? style?.display : 'none'
        }}
        cx="50%"
        cy="50%"
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={(1 - progress) * circumference}
      />
    );
  }
}

class CircleState {

  public readonly strokeWidth: number;
  public readonly radius: number;
  public readonly circumference: number;

  constructor(strokeWidth: number, radius: number, circumference: number) {
    this.strokeWidth = strokeWidth;
    this.radius = radius;
    this.circumference = circumference;
  }

  static fromStrokeWidth(size: number, strokeWidth: number): CircleState {

    strokeWidth = clamp(strokeWidth, 1, size * 0.5);
    const diameter = size - strokeWidth;
    const circumference = diameter * Math.PI;

    return new CircleState(strokeWidth, diameter * 0.5, circumference);
  }

  static fromElement(size: number, el: Element): CircleState {
    const strokeWidthPx = getComputedStyle(el).strokeWidth;
    const strokeWidth = Number(strokeWidthPx.slice(0, -2));

    return CircleState.fromStrokeWidth(size, strokeWidth);

  }
}

const normalize = (value: number, min: number, max: number): number => (clamp(value, min, max) - min) / (max - min);

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);
