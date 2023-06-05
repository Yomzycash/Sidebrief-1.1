import React from "react";

export const RewardIcon = ({ filled, hover }) => {
  return (
    <>
      {filled ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_7239_67100)">
            <path
              d="M15 6.00139C15.0021 5.03004 14.7684 4.07269 14.3188 3.2116C13.8693 2.35052 13.2174 1.61145 12.4193 1.0579C11.6211 0.504343 10.7004 0.152858 9.73638 0.0336424C8.77237 -0.085573 7.79382 0.0310457 6.88482 0.373478C5.97582 0.715911 5.16356 1.27392 4.51781 1.99955C3.87206 2.72519 3.41214 3.59676 3.17757 4.53937C2.943 5.48198 2.9408 6.46745 3.17114 7.4111C3.40149 8.35475 3.85749 9.22837 4.49999 9.95689V16.1264C4.49998 16.4796 4.59974 16.8256 4.78778 17.1246C4.97583 17.4236 5.2445 17.6634 5.56286 17.8164C5.88122 17.9694 6.23631 18.0294 6.58726 17.9894C6.9382 17.9494 7.2707 17.8111 7.54649 17.5904L8.76599 16.6154C8.83244 16.5623 8.91495 16.5334 8.99999 16.5334C9.08502 16.5334 9.16754 16.5623 9.23399 16.6154L10.4535 17.5904C10.7293 17.8111 11.0618 17.9494 11.4127 17.9894C11.7637 18.0294 12.1188 17.9694 12.4371 17.8164C12.7555 17.6634 13.0241 17.4236 13.2122 17.1246C13.4002 16.8256 13.5 16.4796 13.5 16.1264V9.95689C14.4662 8.86579 14.9998 7.45882 15 6.00139ZM8.99999 1.50139C9.89 1.50139 10.76 1.76531 11.5001 2.25978C12.2401 2.75425 12.8168 3.45705 13.1574 4.27932C13.498 5.10158 13.5872 6.00638 13.4135 6.8793C13.2399 7.75221 12.8113 8.55404 12.182 9.18337C11.5526 9.81271 10.7508 10.2413 9.87789 10.4149C9.00498 10.5886 8.10018 10.4994 7.27791 10.1588C6.45564 9.81826 5.75284 9.24148 5.25837 8.50146C4.76391 7.76144 4.49999 6.89141 4.49999 6.00139C4.50118 4.80828 4.97567 3.66438 5.81932 2.82073C6.66298 1.97707 7.80688 1.50258 8.99999 1.50139ZM11.7877 16.4624C11.7243 16.4938 11.6531 16.5063 11.5827 16.4983C11.5124 16.4904 11.4458 16.4622 11.391 16.4174L10.1715 15.4424C9.83957 15.175 9.42619 15.0292 8.99999 15.0292C8.57378 15.0292 8.1604 15.175 7.82849 15.4424L6.60974 16.4174C6.5547 16.4616 6.48832 16.4893 6.41823 16.4975C6.34813 16.5056 6.27716 16.4938 6.21347 16.4634C6.14978 16.433 6.09596 16.3853 6.0582 16.3256C6.02043 16.266 6.00026 16.197 5.99999 16.1264V11.1899C6.91046 11.7213 7.94576 12.0014 8.99999 12.0014C10.0542 12.0014 11.0895 11.7213 12 11.1899V16.1264C12.0008 16.1969 11.9812 16.2662 11.9436 16.3258C11.9059 16.3854 11.8518 16.4329 11.7877 16.4624Z"
              fill="#00A2D4"
            />
          </g>
          <defs>
            <clipPath id="clip0_7239_67100">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_7177_66887)">
            <path
              d="M15 6.00139C15.0021 5.03004 14.7684 4.07269 14.3188 3.2116C13.8693 2.35052 13.2174 1.61145 12.4193 1.0579C11.6211 0.504343 10.7004 0.152858 9.73638 0.0336424C8.77237 -0.085573 7.79382 0.0310457 6.88482 0.373478C5.97582 0.715911 5.16356 1.27392 4.51781 1.99955C3.87206 2.72519 3.41214 3.59676 3.17757 4.53937C2.943 5.48198 2.9408 6.46745 3.17114 7.4111C3.40149 8.35475 3.85749 9.22837 4.49999 9.95689V16.1264C4.49998 16.4796 4.59974 16.8256 4.78778 17.1246C4.97583 17.4236 5.2445 17.6634 5.56286 17.8164C5.88122 17.9694 6.23631 18.0294 6.58726 17.9894C6.9382 17.9494 7.2707 17.8111 7.54649 17.5904L8.76599 16.6154C8.83244 16.5623 8.91495 16.5334 8.99999 16.5334C9.08502 16.5334 9.16754 16.5623 9.23399 16.6154L10.4535 17.5904C10.7293 17.8111 11.0618 17.9494 11.4127 17.9894C11.7637 18.0294 12.1188 17.9694 12.4371 17.8164C12.7555 17.6634 13.0241 17.4236 13.2122 17.1246C13.4002 16.8256 13.5 16.4796 13.5 16.1264V9.95689C14.4662 8.86579 14.9998 7.45882 15 6.00139ZM8.99999 1.50139C9.89 1.50139 10.76 1.76531 11.5001 2.25978C12.2401 2.75425 12.8168 3.45705 13.1574 4.27932C13.498 5.10158 13.5872 6.00638 13.4135 6.8793C13.2399 7.75221 12.8113 8.55404 12.182 9.18337C11.5526 9.81271 10.7508 10.2413 9.87789 10.4149C9.00498 10.5886 8.10018 10.4994 7.27791 10.1588C6.45564 9.81826 5.75284 9.24148 5.25837 8.50146C4.76391 7.76144 4.49999 6.89141 4.49999 6.00139C4.50118 4.80828 4.97567 3.66438 5.81932 2.82073C6.66298 1.97707 7.80688 1.50258 8.99999 1.50139ZM11.7877 16.4624C11.7243 16.4938 11.6531 16.5063 11.5827 16.4983C11.5124 16.4904 11.4458 16.4622 11.391 16.4174L10.1715 15.4424C9.83957 15.175 9.42619 15.0292 8.99999 15.0292C8.57378 15.0292 8.1604 15.175 7.82849 15.4424L6.60974 16.4174C6.5547 16.4616 6.48832 16.4893 6.41823 16.4975C6.34813 16.5056 6.27716 16.4938 6.21347 16.4634C6.14978 16.433 6.09596 16.3853 6.0582 16.3256C6.02043 16.266 6.00026 16.197 5.99999 16.1264V11.1899C6.91046 11.7213 7.94576 12.0014 8.99999 12.0014C10.0542 12.0014 11.0895 11.7213 12 11.1899V16.1264C12.0008 16.1969 11.9812 16.2662 11.9436 16.3258C11.9059 16.3854 11.8518 16.4329 11.7877 16.4624Z"
              fill={hover ? "#00A2D4" : "#242627"}
            />
          </g>
          <defs>
            <clipPath id="clip0_7177_66887">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
};
