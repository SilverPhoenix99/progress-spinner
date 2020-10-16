import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./progress-spinner.scss";

interface Props {
  size: number;
  progress: number;
  min?: number;
  max?: number;
  strokeWidth?: number;
  variant?: string;
  className?: string;
  spin?: boolean;
  children?: any;
}

export default function ProgressSpinner({
  size,
  progress = 0,
  min = 0,
  max = 1,
  strokeWidth = 1,
  variant = "primary",
  className = "",
  spin = false,
  children
}: Props) {
  const center = size / 2;

  progress = progress < min ? min : progress > max ? max : progress;
  progress = (progress - min) / (max - min);

  strokeWidth =
    strokeWidth < 1 ? 1 : strokeWidth > center ? center : strokeWidth;

  const radius = center - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = (1 - progress) * circumference;

  return (
    <div className={classNames("progress-spinner", className)}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size}>
        <circle
          className={classNames("spinner-circle", `text-${variant}`, {
            spin,
            paused: progress === 0 || progress === 1
          })}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          cx="50%"
          cy="50%"
          r={radius}
          strokeDashoffset={offset}
          strokeDasharray={`${circumference} ${circumference}`}
        ></circle>
      </svg>
      {children}
    </div>
  );
}
