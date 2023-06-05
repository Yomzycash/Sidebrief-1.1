import React from "react";

export const TaxIcon = ({ filled, hover }) => {
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
          <g clipPath="url(#clip0_7239_67055)">
            <path
              d="M14.2495 0H10.4995C10.3005 0 10.1098 0.0790176 9.96912 0.21967C9.82847 0.360322 9.74945 0.551088 9.74945 0.75C9.74945 0.948912 9.82847 1.13968 9.96912 1.28033C10.1098 1.42098 10.3005 1.5 10.4995 1.5H14.2495C14.5836 1.50129 14.9131 1.57822 15.2132 1.725L0.219201 16.7198C0.147568 16.7889 0.0904312 16.8717 0.0511245 16.9632C0.0118177 17.0547 -0.00887195 17.1531 -0.00973731 17.2527C-0.0106027 17.3523 0.00837361 17.451 0.0460843 17.5432C0.0837949 17.6354 0.139485 17.7191 0.209904 17.7895C0.280324 17.86 0.364063 17.9157 0.456235 17.9534C0.548407 17.9911 0.647167 18.0101 0.746751 18.0092C0.846336 18.0083 0.944751 17.9876 1.03625 17.9483C1.12776 17.909 1.21052 17.8519 1.2797 17.7803L16.2745 2.78625C16.4212 3.0864 16.4982 3.41589 16.4995 3.75V7.5C16.4995 7.69891 16.5785 7.88968 16.7191 8.03033C16.8598 8.17098 17.0505 8.25 17.2495 8.25C17.4484 8.25 17.6391 8.17098 17.7798 8.03033C17.9204 7.88968 17.9995 7.69891 17.9995 7.5V3.75C17.9983 2.7558 17.6028 1.80267 16.8998 1.09967C16.1968 0.396662 15.2436 0.00119089 14.2495 0V0Z"
              fill="#00A2D4"
            />
            <path
              d="M4.5 7.5C5.09334 7.5 5.67336 7.32405 6.16671 6.99441C6.66006 6.66477 7.04458 6.19623 7.27164 5.64805C7.4987 5.09987 7.55811 4.49667 7.44236 3.91473C7.3266 3.33279 7.04088 2.79824 6.62132 2.37868C6.20176 1.95912 5.66721 1.6734 5.08527 1.55765C4.50333 1.44189 3.90013 1.5013 3.35195 1.72836C2.80377 1.95543 2.33524 2.33994 2.00559 2.83329C1.67595 3.32664 1.5 3.90666 1.5 4.5C1.5 5.29565 1.81607 6.05871 2.37868 6.62132C2.94129 7.18393 3.70435 7.5 4.5 7.5ZM4.5 3C4.79667 3 5.08668 3.08797 5.33336 3.2528C5.58003 3.41762 5.77229 3.65189 5.88582 3.92598C5.99935 4.20007 6.02906 4.50167 5.97118 4.79264C5.9133 5.08361 5.77044 5.35088 5.56066 5.56066C5.35088 5.77044 5.08361 5.9133 4.79264 5.97118C4.50166 6.02906 4.20006 5.99935 3.92597 5.88582C3.65189 5.77229 3.41762 5.58003 3.2528 5.33336C3.08797 5.08668 3 4.79667 3 4.5C3 4.10218 3.15804 3.72065 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3V3Z"
              fill="#00A2D4"
            />
            <path
              d="M13.5 10.5C12.9067 10.5 12.3266 10.6759 11.8333 11.0056C11.3399 11.3352 10.9554 11.8038 10.7284 12.352C10.5013 12.9001 10.4419 13.5033 10.5576 14.0853C10.6734 14.6672 10.9591 15.2018 11.3787 15.6213C11.7982 16.0409 12.3328 16.3266 12.9147 16.4424C13.4967 16.5581 14.0999 16.4987 14.6481 16.2716C15.1962 16.0446 15.6648 15.6601 15.9944 15.1667C16.3241 14.6734 16.5 14.0933 16.5 13.5C16.5 12.7044 16.1839 11.9413 15.6213 11.3787C15.0587 10.8161 14.2957 10.5 13.5 10.5V10.5ZM13.5 15C13.2033 15 12.9133 14.912 12.6666 14.7472C12.42 14.5824 12.2277 14.3481 12.1142 14.074C12.0007 13.7999 11.9709 13.4983 12.0288 13.2074C12.0867 12.9164 12.2296 12.6491 12.4393 12.4393C12.6491 12.2296 12.9164 12.0867 13.2074 12.0288C13.4983 11.9709 13.7999 12.0006 14.074 12.1142C14.3481 12.2277 14.5824 12.42 14.7472 12.6666C14.912 12.9133 15 13.2033 15 13.5C15 13.8978 14.842 14.2794 14.5607 14.5607C14.2794 14.842 13.8978 15 13.5 15Z"
              fill="#00A2D4"
            />
          </g>
          <defs>
            <clipPath id="clip0_7239_67055">
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
          <g clipPath="url(#clip0_7228_67017)">
            <path
              d="M14.2495 0H10.4995C10.3005 0 10.1098 0.0790176 9.96912 0.21967C9.82847 0.360322 9.74945 0.551088 9.74945 0.75C9.74945 0.948912 9.82847 1.13968 9.96912 1.28033C10.1098 1.42098 10.3005 1.5 10.4995 1.5H14.2495C14.5836 1.50129 14.9131 1.57822 15.2132 1.725L0.219201 16.7198C0.147568 16.7889 0.0904312 16.8717 0.0511245 16.9632C0.0118177 17.0547 -0.00887195 17.1531 -0.00973731 17.2527C-0.0106027 17.3523 0.00837361 17.451 0.0460843 17.5432C0.0837949 17.6354 0.139485 17.7191 0.209904 17.7895C0.280324 17.86 0.364063 17.9157 0.456235 17.9534C0.548407 17.9911 0.647167 18.0101 0.746751 18.0092C0.846336 18.0083 0.944751 17.9876 1.03625 17.9483C1.12776 17.909 1.21052 17.8519 1.2797 17.7803L16.2745 2.78625C16.4212 3.0864 16.4982 3.41589 16.4995 3.75V7.5C16.4995 7.69891 16.5785 7.88968 16.7191 8.03033C16.8598 8.17098 17.0505 8.25 17.2495 8.25C17.4484 8.25 17.6391 8.17098 17.7798 8.03033C17.9204 7.88968 17.9995 7.69891 17.9995 7.5V3.75C17.9983 2.7558 17.6028 1.80267 16.8998 1.09967C16.1968 0.396662 15.2436 0.00119089 14.2495 0V0Z"
              fill={hover ? "#00A2D4" : "#242627"}
            />
            <path
              d="M4.5 7.5C5.09334 7.5 5.67336 7.32405 6.16671 6.99441C6.66006 6.66477 7.04458 6.19623 7.27164 5.64805C7.4987 5.09987 7.55811 4.49667 7.44236 3.91473C7.3266 3.33279 7.04088 2.79824 6.62132 2.37868C6.20176 1.95912 5.66721 1.6734 5.08527 1.55765C4.50333 1.44189 3.90013 1.5013 3.35195 1.72836C2.80377 1.95543 2.33524 2.33994 2.00559 2.83329C1.67595 3.32664 1.5 3.90666 1.5 4.5C1.5 5.29565 1.81607 6.05871 2.37868 6.62132C2.94129 7.18393 3.70435 7.5 4.5 7.5ZM4.5 3C4.79667 3 5.08668 3.08797 5.33336 3.2528C5.58003 3.41762 5.77229 3.65189 5.88582 3.92598C5.99935 4.20007 6.02906 4.50167 5.97118 4.79264C5.9133 5.08361 5.77044 5.35088 5.56066 5.56066C5.35088 5.77044 5.08361 5.9133 4.79264 5.97118C4.50166 6.02906 4.20006 5.99935 3.92597 5.88582C3.65189 5.77229 3.41762 5.58003 3.2528 5.33336C3.08797 5.08668 3 4.79667 3 4.5C3 4.10218 3.15804 3.72065 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3Z"
              fill={hover ? "#00A2D4" : "#242627"}
            />
            <path
              d="M13.5 10.5C12.9067 10.5 12.3266 10.6759 11.8333 11.0056C11.3399 11.3352 10.9554 11.8038 10.7284 12.352C10.5013 12.9001 10.4419 13.5033 10.5576 14.0853C10.6734 14.6672 10.9591 15.2018 11.3787 15.6213C11.7982 16.0409 12.3328 16.3266 12.9147 16.4424C13.4967 16.5581 14.0999 16.4987 14.6481 16.2716C15.1962 16.0446 15.6648 15.6601 15.9944 15.1667C16.3241 14.6734 16.5 14.0933 16.5 13.5C16.5 12.7044 16.1839 11.9413 15.6213 11.3787C15.0587 10.8161 14.2957 10.5 13.5 10.5ZM13.5 15C13.2033 15 12.9133 14.912 12.6666 14.7472C12.42 14.5824 12.2277 14.3481 12.1142 14.074C12.0007 13.7999 11.9709 13.4983 12.0288 13.2074C12.0867 12.9164 12.2296 12.6491 12.4393 12.4393C12.6491 12.2296 12.9164 12.0867 13.2074 12.0288C13.4983 11.9709 13.7999 12.0006 14.074 12.1142C14.3481 12.2277 14.5824 12.42 14.7472 12.6666C14.912 12.9133 15 13.2033 15 13.5C15 13.8978 14.842 14.2794 14.5607 14.5607C14.2794 14.842 13.8978 15 13.5 15Z"
              fill={hover ? "#00A2D4" : "#242627"}
            />
          </g>
          <defs>
            <clipPath id="clip0_7228_67017">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
};
