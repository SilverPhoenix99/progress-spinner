import React from "react";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.min.css";
import "./progress-spinner.scss";

interface Props {
  progress: number;
  minProgress?: number;
  maxProgress?: number;
  size?: "sm" | "md" | "lg" | "xl" | string;
  strokeWidth?: number;
  variant?: string;
  className?: string;
  spin?: boolean;
  children?: any;
}

interface State {
  size: number;
  strokeWidth: number;
}

export default class ProgressSpinner extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    progress: 0,
    minProgress: 0,
    maxProgress: 1,
    strokeWidth: 1,
    size: "md",
    variant: "primary",
    className: "",
    spin: false
  };

  private ref: any;
  private radius: number;
  private circumference: number;
  private observer: MutationObserver;

  state: State = {
    size: 0,
    strokeWidth: 0
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { width } = this.ref.current.getBoundingClientRect();
    this.setSize(width);

    this.observer = new MutationObserver(this.observerCallback);
    this.observer.observe(this.ref.current, { attributes: true });
  }

  observerCallback = () => {
    this.setState((state) => {
      const { width: newSize } = this.ref.current.getBoundingClientRect();
      if (newSize !== state.size) {
        const {
          strokeWidth,
          radius,
          circumference
        } = this.recalculateCircleParameters(newSize);
        this.radius = radius;
        this.circumference = circumference;
        return { size: newSize, strokeWidth };
      }
      return {};
    });
  };

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      delete this.observer;
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.strokeWidth !== prevProps.strokeWidth && this.props.size) {
      this.updateStrokeWidth(this.state.size);
    }
  }

  setSize(size: number): void {
    this.setState({ size });

    if (!size) {
      return;
    }

    this.updateStrokeWidth(size);
  }

  updateStrokeWidth(size: number) {
    const {
      strokeWidth,
      radius,
      circumference
    } = this.recalculateCircleParameters(size);

    this.setState({ strokeWidth });
    this.radius = radius;
    this.circumference = circumference;
  }

  recalculateCircleParameters(size: number) {
    const strokeWidth = clamp(this.props.strokeWidth, 1, size / 2);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return { strokeWidth, radius, circumference };
  }

  render() {
    const { className, size, children } = this.props;

    return (
      <div
        className={classNames(
          className,
          "progress-spinner",
          `progress-spinner-${size}`
        )}
        ref={this.ref}
      >
        {this.renderSpinner()}
        {children}
      </div>
    );
  }

  renderSpinner() {
    const { size } = this.state;

    if (!size) {
      return null;
    }

    const { variant, spin, minProgress, maxProgress } = this.props;

    let progress = clamp(this.props.progress, minProgress, maxProgress);
    progress = (progress - minProgress) / (maxProgress - minProgress);

    const offset = (1 - progress) * this.circumference;

    return (
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={classNames("spinner-circle", `text-${variant}`, {
            spin,
            paused: [0, 1].includes(progress)
          })}
          cx="50%"
          cy="50%"
          r={this.radius}
          strokeDasharray={`${this.circumference} ${this.circumference}`}
          strokeWidth={this.state.strokeWidth}
          strokeDashoffset={offset}
        ></circle>
      </svg>
    );
  }
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
