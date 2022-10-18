import React from "react";

export const BankAccountIcon = ({ filled, hover }) => {
  return (
    <div>
      {filled ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.7689 8.3818H22C22 4.98459 19.9644 3 16.5156 3H7.48444C4.03556 3 2 4.98459 2 8.33847V15.6615C2 19.0154 4.03556 21 7.48444 21H16.5156C19.9644 21 22 19.0154 22 15.6615V15.3495H17.7689C15.8052 15.3495 14.2133 13.7975 14.2133 11.883C14.2133 9.96849 15.8052 8.41647 17.7689 8.41647V8.3818ZM17.7689 9.87241H21.2533C21.6657 9.87241 22 10.1983 22 10.6004V13.131C21.9952 13.5311 21.6637 13.8543 21.2533 13.8589H17.8489C16.8548 13.872 15.9855 13.2084 15.76 12.2643C15.6471 11.6783 15.8056 11.0736 16.1931 10.6122C16.5805 10.1509 17.1573 9.88007 17.7689 9.87241ZM17.92 12.533H18.2489C18.6711 12.533 19.0133 12.1993 19.0133 11.7877C19.0133 11.3761 18.6711 11.0424 18.2489 11.0424H17.92C17.7181 11.0401 17.5236 11.1166 17.38 11.255C17.2364 11.3934 17.1555 11.5821 17.1556 11.779C17.1555 12.1921 17.4964 12.5282 17.92 12.533ZM6.73778 8.3818H12.3822C12.8044 8.3818 13.1467 8.04812 13.1467 7.63649C13.1467 7.22487 12.8044 6.89119 12.3822 6.89119H6.73778C6.31903 6.89116 5.9782 7.2196 5.97333 7.62783C5.97331 8.04087 6.31415 8.37705 6.73778 8.3818Z"
            fill="#00A2D4"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.9124 13.7467H15.5391C13.9583 13.7467 12.6716 12.4609 12.6708 10.8809C12.6708 9.29922 13.9574 8.01255 15.5391 8.01172H18.9124C19.2574 8.01172 19.5374 8.29172 19.5374 8.63672C19.5374 8.98172 19.2574 9.26172 18.9124 9.26172H15.5391C14.6466 9.26255 13.9208 9.98839 13.9208 10.8801C13.9208 11.7709 14.6474 12.4967 15.5391 12.4967H18.9124C19.2574 12.4967 19.5374 12.7767 19.5374 13.1217C19.5374 13.4667 19.2574 13.7467 18.9124 13.7467Z"
            fill={hover ? "#00A2D4" : "#242627"}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.9204 11.4531H15.6604C15.3154 11.4531 15.0354 11.1731 15.0354 10.8281C15.0354 10.4831 15.3154 10.2031 15.6604 10.2031H15.9204C16.2654 10.2031 16.5454 10.4831 16.5454 10.8281C16.5454 11.1731 16.2654 11.4531 15.9204 11.4531Z"
            fill={hover ? "#00A2D4" : "#242627"}
          />
          <mask
            id="mask0_3407_27378"
            // style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="2"
            y="3"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.3385 3H19.5373V18.9774H2.3385V3Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_3407_27378)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.33647 4.25C5.2698 4.25 3.58813 5.93167 3.58813 7.99833V13.9792C3.58813 16.0458 5.2698 17.7275 7.33647 17.7275H14.5398C16.6065 17.7275 18.2873 16.0458 18.2873 13.9792V7.99833C18.2873 5.93167 16.6065 4.25 14.5398 4.25H7.33647ZM14.5398 18.9775H7.33647C4.58063 18.9775 2.33813 16.735 2.33813 13.9792V7.99833C2.33813 5.24167 4.58063 3 7.33647 3H14.5398C17.2956 3 19.5373 5.24167 19.5373 7.99833V13.9792C19.5373 16.735 17.2956 18.9775 14.5398 18.9775Z"
              fill={hover ? "#00A2D4" : "#242627"}
            />
          </g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.2423 8.03125H6.74316C6.39816 8.03125 6.11816 7.75125 6.11816 7.40625C6.11816 7.06125 6.39816 6.78125 6.74316 6.78125H11.2423C11.5873 6.78125 11.8673 7.06125 11.8673 7.40625C11.8673 7.75125 11.5873 8.03125 11.2423 8.03125Z"
            fill={hover ? "#00A2D4" : "#242627"}
          />
        </svg>
      )}
    </div>
  );
};
