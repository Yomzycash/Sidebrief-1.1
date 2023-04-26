import React from "react";

export const HomeIcon = ({ filled, hover }) => {
  return (
    <>
      {filled ? (
         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
         <g clip-path="url(#clip0_7177_66854)">
         <path d="M17.3408 6.80134L11.652 1.11184C10.9479 0.409836 9.99426 0.015625 9.00001 0.015625C8.00576 0.015625 7.05208 0.409836 6.34801 1.11184L0.659259 6.80134C0.449578 7.00968 0.283336 7.25757 0.170171 7.53063C0.0570054 7.8037 -0.0008328 8.09651 9.05961e-06 8.39209V15.7548C9.05961e-06 16.3516 0.237062 16.9239 0.659019 17.3458C1.08098 17.7678 1.65327 18.0048 2.25001 18.0048H15.75C16.3467 18.0048 16.919 17.7678 17.341 17.3458C17.763 16.9239 18 16.3516 18 15.7548V8.39209C18.0009 8.09651 17.943 7.8037 17.8298 7.53063C17.7167 7.25757 17.5504 7.00968 17.3408 6.80134V6.80134ZM11.25 16.5048H6.75001V13.5543C6.75001 12.9576 6.98706 12.3853 7.40902 11.9634C7.83098 11.5414 8.40327 11.3043 9.00001 11.3043C9.59675 11.3043 10.169 11.5414 10.591 11.9634C11.013 12.3853 11.25 12.9576 11.25 13.5543V16.5048ZM16.5 15.7548C16.5 15.9538 16.421 16.1445 16.2803 16.2852C16.1397 16.4258 15.9489 16.5048 15.75 16.5048H12.75V13.5543C12.75 12.5598 12.3549 11.606 11.6517 10.9027C10.9484 10.1994 9.99457 9.80434 9.00001 9.80434C8.00545 9.80434 7.05162 10.1994 6.34836 10.9027C5.6451 11.606 5.25001 12.5598 5.25001 13.5543V16.5048H2.25001C2.0511 16.5048 1.86033 16.4258 1.71968 16.2852C1.57903 16.1445 1.50001 15.9538 1.50001 15.7548V8.39209C1.5007 8.19333 1.57965 8.00283 1.71976 7.86184L7.40851 2.17459C7.83128 1.75379 8.40351 1.51755 9.00001 1.51755C9.59651 1.51755 10.1687 1.75379 10.5915 2.17459L16.2803 7.86409C16.4198 8.00453 16.4987 8.19411 16.5 8.39209V15.7548Z" fill="#00C3FF"/>
         </g>
         <defs>
         <clipPath id="clip0_7177_66854">
         <rect width="18" height="18" fill="white"/>
         </clipPath>
         </defs>
         </svg>
         
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18"  fill={hover ? "#00A2D4" : "#242627"} xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_7177_66854)">
        <path 
          d="M17.3408 6.80134L11.652 1.11184C10.9479 0.409836 9.99426 0.015625 9.00001 0.015625C8.00576 0.015625 7.05208 0.409836 6.34801 1.11184L0.659259 6.80134C0.449578 7.00968 0.283336 7.25757 0.170171 7.53063C0.0570054 7.8037 -0.0008328 8.09651 9.05961e-06 8.39209V15.7548C9.05961e-06 16.3516 0.237062 16.9239 0.659019 17.3458C1.08098 17.7678 1.65327 18.0048 2.25001 18.0048H15.75C16.3467 18.0048 16.919 17.7678 17.341 17.3458C17.763 16.9239 18 16.3516 18 15.7548V8.39209C18.0009 8.09651 17.943 7.8037 17.8298 7.53063C17.7167 7.25757 17.5504 7.00968 17.3408 6.80134ZM11.25 16.5048H6.75001V13.5543C6.75001 12.9576 6.98706 12.3853 7.40902 11.9634C7.83098 11.5414 8.40327 11.3043 9.00001 11.3043C9.59675 11.3043 10.169 11.5414 10.591 11.9634C11.013 12.3853 11.25 12.9576 11.25 13.5543V16.5048ZM16.5 15.7548C16.5 15.9538 16.421 16.1445 16.2803 16.2852C16.1397 16.4258 15.9489 16.5048 15.75 16.5048H12.75V13.5543C12.75 12.5598 12.3549 11.606 11.6517 10.9027C10.9484 10.1994 9.99457 9.80435 9.00001 9.80434C8.00545 9.80435 7.05162 10.1994 6.34836 10.9027C5.6451 11.606 5.25001 12.5598 5.25001 13.5543V16.5048H2.25001C2.0511 16.5048 1.86033 16.4258 1.71968 16.2852C1.57903 16.1445 1.50001 15.9538 1.50001 15.7548V8.39209C1.5007 8.19333 1.57965 8.00283 1.71976 7.86184L7.40851 2.17459C7.83128 1.75379 8.40351 1.51755 9.00001 1.51755C9.59651 1.51755 10.1687 1.75379 10.5915 2.17459L16.2803 7.86409C16.4198 8.00453 16.4987 8.19411 16.5 8.39209V15.7548Z" 
          fill={hover ? "#00A2D4" : "#242627"}/>
        </g>
        <defs>
        <clipPath id="clip0_7177_66854">
        <rect width="18" height="18" fill="white"/>
        </clipPath>
        </defs>
        </svg>
       
      )}
    </>
  );
};


