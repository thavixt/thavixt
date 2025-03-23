import { JSX } from "react"

export type LoaderType =
  | 'FadeStaggerCircles'
  | 'GearSpinner'
  | 'InfiniteSpinner'
  | 'SpinningDots'
  | 'TubeSpinner'
  | 'FadeStaggerSquares'
  | 'Ripples'
  ;

export const LoaderList: Record<LoaderType, ({ height }: { height?: number, color?: string }) => JSX.Element> = {
  Ripples: function Ripples({ height = 4, color = 'currentColor' }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height={height * 4}>
        <circle fill="none" strokeOpacity="1" stroke={color} strokeWidth="0.5" cx="100" cy="100" r="0">
          <animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
          <animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
          <animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
        </circle>
      </svg>
    )
  },
  FadeStaggerCircles: function FadeStaggerCircles({ height = 4, color = 'currentColor' }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" height={height * 2}>
        <circle fill={color} stroke={color} strokeWidth="75" r="15" cx="70" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
        </circle>
        <circle fill={color} stroke={color} strokeWidth="75" r="15" cx="190" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
        </circle>
        <circle fill={color} stroke={color} strokeWidth="75" r="15" cx="310" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
        </circle>
      </svg>
    )
  },
  FadeStaggerSquares: function FadeStaggerSquares({ height = 4, color = 'currentColor' }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height={height * 4}>
        <rect fill={color} stroke={color} strokeWidth="15" width="30" height="30" x="25" y="85">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
        </rect>
        <rect fill={color} stroke={color} strokeWidth="15" width="30" height="30" x="85" y="85">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
        </rect>
        <rect fill={color} stroke={color} strokeWidth="15" width="30" height="30" x="145" y="85">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
        </rect>
      </svg>
    )
  },
  GearSpinner: function GearSpinner({ height = 4, color = 'currentColor' }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height={height * 4}>
        <path style={{ transformOrigin: "center" }} fill={color} stroke={color} strokeWidth="16" d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z">
          <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="0;120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
        </path>
      </svg>
    )
  },
  InfiniteSpinner: function InfiniteSpinner({ height = 4, color = 'currentColor' }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" height={height * 2}>
        <path fill="none" stroke={color} strokeWidth="30" strokeLinecap="round" strokeDasharray="300 385" strokeDashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
          <animate attributeName="stroke-dashoffset" calcMode="spline" dur="3" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate>
        </path>
      </svg>
    )
  },
  SpinningDots: function SpinningDots({ height = 4, color = 'currentColor' }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height={height * 4}>
        <linearGradient id="a11">
          <stop offset="0" stopColor={color} stopOpacity="0"></stop>
          <stop offset="1" stopColor={color}></stop>
        </linearGradient>
        <circle style={{ transformOrigin: "center" }} fill="none" stroke={color} strokeWidth="32" strokeLinecap="round" strokeDasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70">
          <animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform>
        </circle>
      </svg>
    )
  },
  TubeSpinner: function TubeSpinner({ height = 4, color = 'currentColor' }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height={height * 4}>
        <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
          <stop offset="0" stopColor={color}></stop>
          <stop offset=".3" stopColor={color} stopOpacity=".9"></stop>
          <stop offset=".6" stopColor={color} stopOpacity=".6"></stop>
          <stop offset=".8" stopColor={color} stopOpacity=".3"></stop>
          <stop offset="1" stopColor={color} stopOpacity="0"></stop>
        </radialGradient>
        <circle style={{ transformOrigin: "center" }} fill="none" stroke={color} strokeWidth="32" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
          <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
        </circle>
        <circle style={{ transformOrigin: "center" }} fill="none" opacity=".2" stroke={color} strokeWidth="32" strokeLinecap="round" cx="100" cy="100" r="70"></circle>
      </svg>
    )
  },
}
