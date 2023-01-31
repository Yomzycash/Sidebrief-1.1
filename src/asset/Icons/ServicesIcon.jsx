import React from "react";

const ServicesIcon = ({ filled, hover, color, width, height, size }) => {
  return (
    <div>
      {filled ? (
        <svg
          width={size || width || "15"}
          height={size || height || "17"}
          viewBox="0 0 15 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_5255_42290"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="15"
            height="17"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.695312 0.176758H14.9055V16.7213H0.695312V0.176758Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_5255_42290)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.5062 1.42676C3.12537 1.42676 1.9787 2.54509 1.9462 3.92426V12.8568C1.9162 14.2743 3.03287 15.4409 4.43704 15.4718H11.1729C12.5637 15.4218 13.6645 14.2743 13.6554 12.8609V5.45009L9.7937 1.42676H4.5162H4.5062ZM4.5162 16.7218H4.4112C2.31787 16.6768 0.651203 14.9368 0.696203 12.8434V3.90926C0.745369 1.84176 2.45204 0.176758 4.5037 0.176758H4.5187H10.0595C10.2295 0.176758 10.392 0.245924 10.5104 0.368424L14.732 4.76592C14.8429 4.88176 14.9054 5.03759 14.9054 5.19842V12.8568C14.9187 14.9476 13.2887 16.6468 11.1945 16.7218H4.5162Z"
              fill="#00A2D4"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2768 5.98699H11.9818C10.456 5.98283 9.2168 4.73949 9.2168 3.21616V0.791992C9.2168 0.446992 9.4968 0.166992 9.8418 0.166992C10.1868 0.166992 10.4668 0.446992 10.4668 0.791992V3.21616C10.4668 4.05282 11.1468 4.73449 11.9835 4.73699H14.2768C14.6218 4.73699 14.9018 5.01699 14.9018 5.36199C14.9018 5.70699 14.6218 5.98699 14.2768 5.98699Z"
            fill="#00A2D4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.48047 12.417C7.13547 12.417 6.85547 12.137 6.85547 11.792V6.75781C6.85547 6.41281 7.13547 6.13281 7.48047 6.13281C7.82547 6.13281 8.10547 6.41281 8.10547 6.75781V11.792C8.10547 12.137 7.82547 12.417 7.48047 12.417Z"
            fill="#00A2D4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.47904 12.4164C7.3132 12.4164 7.1532 12.3506 7.03654 12.2322L5.08237 10.2706C4.83904 10.0256 4.83987 9.62973 5.08404 9.38639C5.32904 9.14306 5.72487 9.14306 5.9682 9.38806L7.47904 10.9064L8.98987 9.38806C9.2332 9.14306 9.62904 9.14306 9.87404 9.38639C10.1182 9.62973 10.119 10.0256 9.8757 10.2706L7.92154 12.2322C7.80487 12.3506 7.64487 12.4164 7.47904 12.4164Z"
            fill="#00A2D4"
          />
        </svg>
      ) : (
        <svg
          width={size || width || "15"}
          height={size || height || "17"}
          viewBox="0 0 15 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_5255_42290"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="15"
            height="17"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.695312 0.176758H14.9055V16.7213H0.695312V0.176758Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_5255_42290)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.5062 1.42676C3.12537 1.42676 1.9787 2.54509 1.9462 3.92426V12.8568C1.9162 14.2743 3.03287 15.4409 4.43704 15.4718H11.1729C12.5637 15.4218 13.6645 14.2743 13.6554 12.8609V5.45009L9.7937 1.42676H4.5162H4.5062ZM4.5162 16.7218H4.4112C2.31787 16.6768 0.651203 14.9368 0.696203 12.8434V3.90926C0.745369 1.84176 2.45204 0.176758 4.5037 0.176758H4.5187H10.0595C10.2295 0.176758 10.392 0.245924 10.5104 0.368424L14.732 4.76592C14.8429 4.88176 14.9054 5.03759 14.9054 5.19842V12.8568C14.9187 14.9476 13.2887 16.6468 11.1945 16.7218H4.5162Z"
              fill={hover ? "#00A2D4" : color || "#242627"}
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2768 5.98699H11.9818C10.456 5.98283 9.2168 4.73949 9.2168 3.21616V0.791992C9.2168 0.446992 9.4968 0.166992 9.8418 0.166992C10.1868 0.166992 10.4668 0.446992 10.4668 0.791992V3.21616C10.4668 4.05282 11.1468 4.73449 11.9835 4.73699H14.2768C14.6218 4.73699 14.9018 5.01699 14.9018 5.36199C14.9018 5.70699 14.6218 5.98699 14.2768 5.98699Z"
            fill={hover ? "#00A2D4" : color || "#242627"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.48047 12.417C7.13547 12.417 6.85547 12.137 6.85547 11.792V6.75781C6.85547 6.41281 7.13547 6.13281 7.48047 6.13281C7.82547 6.13281 8.10547 6.41281 8.10547 6.75781V11.792C8.10547 12.137 7.82547 12.417 7.48047 12.417Z"
            fill={hover ? "#00A2D4" : color || "#242627"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.47904 12.4164C7.3132 12.4164 7.1532 12.3506 7.03654 12.2322L5.08237 10.2706C4.83904 10.0256 4.83987 9.62973 5.08404 9.38639C5.32904 9.14306 5.72487 9.14306 5.9682 9.38806L7.47904 10.9064L8.98987 9.38806C9.2332 9.14306 9.62904 9.14306 9.87404 9.38639C10.1182 9.62973 10.119 10.0256 9.8757 10.2706L7.92154 12.2322C7.80487 12.3506 7.64487 12.4164 7.47904 12.4164Z"
            fill={hover ? "#00A2D4" : color || "#242627"}
          />
        </svg>
      )}
    </div>
  );
};

export default ServicesIcon;
