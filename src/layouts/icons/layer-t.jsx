import React from "react";

const LayerTSVG = ({ w, h }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w}
    height={h}
    viewBox="0 0 30 30"
    fill="none"
  >
    <g clipPath="url(#clip0_519_4035)">
      <path
        d="M26.25 0H3.75C2.75544 0 1.80161 0.395088 1.09835 1.09835C0.395088 1.80161 0 2.75544 0 3.75L0 30H30V3.75C30 2.75544 29.6049 1.80161 28.9017 1.09835C28.1984 0.395088 27.2446 0 26.25 0ZM27.5 27.5H2.5V3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H26.25C26.5815 2.5 26.8995 2.6317 27.1339 2.86612C27.3683 3.10054 27.5 3.41848 27.5 3.75V27.5ZM7.5 7.5H22.5V12.5H20V10H16.25V20H18.75V22.5H11.25V20H13.75V10H10V12.5H7.5V7.5Z"
        fill="#18356D"
      />
    </g>
    <defs>
      <clipPath id="clip0_519_4035">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default LayerTSVG;
