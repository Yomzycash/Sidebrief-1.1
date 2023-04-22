import React from "react";

export const OnboardIcon = ({filled, hover }) => {
   return (
    <>
        { filled ? (
            <svg 
                width="20" 
                height="18" 
                viewBox="0 0 20 20" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg" >
                <path  d="M7.4863 5.25292C7.45964 5.25292 7.43297 5.25625 7.4063 5.26292C4.9313 5.87208 2.91797 8.55375 2.91797 11.2404C2.91797 14.6204 5.66797 17.3704 9.0488 17.3704C12.0963 17.3704 14.643 15.1996 15.1046 12.2079C15.108 12.1829 15.1196 12.1104 15.0513 12.0296C14.9863 11.9538 14.883 11.9088 14.7746 11.9088C13.5988 11.9088 12.7013 11.9354 12.0005 11.9554C10.3038 12.0063 9.60214 12.0254 8.9088 11.5113C7.8638 10.7371 7.77547 9.40708 7.77547 5.49542C7.77547 5.42542 7.74547 5.36708 7.68547 5.32042C7.62964 5.27625 7.5588 5.25292 7.4863 5.25292M9.0488 18.6204C4.9788 18.6204 1.66797 15.3096 1.66797 11.2404C1.66797 8.01375 4.10797 4.78708 7.10714 4.04875C7.57547 3.93458 8.0788 4.04125 8.45714 4.33625C8.81797 4.61958 9.02547 5.04208 9.02547 5.49542C9.02547 9.14958 9.1488 10.1329 9.65297 10.5071C9.9838 10.7513 10.4371 10.7488 11.9646 10.7063C12.6746 10.6854 13.5838 10.6588 14.7746 10.6588C15.2496 10.6588 15.6971 10.8621 16.0005 11.2163C16.2821 11.5454 16.4055 11.9754 16.3405 12.3988C15.7838 16.0029 12.7171 18.6204 9.0488 18.6204"   fill="#00A2D4"/>
                <path  d="M11.6771 2.08348C11.5854 4.18265 11.7213 6.89432 11.7846 7.96848C11.7879 8.03265 11.8346 8.07932 11.8979 8.08265C12.7546 8.13182 15.7063 8.26848 17.8288 7.95598C17.8338 6.78598 17.0329 5.19932 15.8271 3.99432C14.5904 2.75932 13.1271 2.08348 11.6954 2.08348H11.6771ZM14.4304 9.40682C13.3388 9.40682 12.3779 9.36265 11.8254 9.33098C11.1304 9.29015 10.5771 8.73598 10.5371 8.04098C10.4721 6.93932 10.3313 4.14015 10.4313 1.97515C10.4588 1.34598 10.9671 0.845149 11.5888 0.834316C13.3696 0.782649 15.2071 1.60932 16.7104 3.11015C18.1754 4.57432 19.1054 6.49848 19.0788 8.01265C19.0688 8.60348 18.6396 9.09682 18.0596 9.18432C16.9279 9.35515 15.6029 9.40682 14.4304 9.40682V9.40682Z" fill="#00A2D4"/>
                <path d="M10.3965 0.832031H19.0789V9.40645H10.3965V0.832031Z" fill="#00A2D4"/>
            </svg>
            ) : (
                <svg 
                    width="20" 
                    height="18" 
                    viewBox="0 0 22 22" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                   <path  d="M7.4863 5.25292C7.45964 5.25292 7.43297 5.25625 7.4063 5.26292C4.9313 5.87208 2.91797 8.55375 2.91797 11.2404C2.91797 14.6204 5.66797 17.3704 9.0488 17.3704C12.0963 17.3704 14.643 15.1996 15.1046 12.2079C15.108 12.1829 15.1196 12.1104 15.0513 12.0296C14.9863 11.9538 14.883 11.9088 14.7746 11.9088C13.5988 11.9088 12.7013 11.9354 12.0005 11.9554C10.3038 12.0063 9.60214 12.0254 8.9088 11.5113C7.8638 10.7371 7.77547 9.40708 7.77547 5.49542C7.77547 5.42542 7.74547 5.36708 7.68547 5.32042C7.62964 5.27625 7.5588 5.25292 7.4863 5.25292M9.0488 18.6204C4.9788 18.6204 1.66797 15.3096 1.66797 11.2404C1.66797 8.01375 4.10797 4.78708 7.10714 4.04875C7.57547 3.93458 8.0788 4.04125 8.45714 4.33625C8.81797 4.61958 9.02547 5.04208 9.02547 5.49542C9.02547 9.14958 9.1488 10.1329 9.65297 10.5071C9.9838 10.7513 10.4371 10.7488 11.9646 10.7063C12.6746 10.6854 13.5838 10.6588 14.7746 10.6588C15.2496 10.6588 15.6971 10.8621 16.0005 11.2163C16.2821 11.5454 16.4055 11.9754 16.3405 12.3988C15.7838 16.0029 12.7171 18.6204 9.0488 18.6204"   fill={hover ? "#00A2D4" : "#242627"}   />
                   <path d="M1.67711 2.08348C1.58544 4.18265 1.72128 6.89432 1.78461 7.96848C1.78794 8.03265 1.83461 8.07932 1.89794 8.08265C2.75461 8.13182 5.70628 8.26848 7.82878 7.95598C7.83378 6.78598 7.03294 5.19932 5.82711 3.99432C4.59044 2.75932 3.12711 2.08348 1.69544 2.08348H1.67711ZM4.43044 9.40682C3.33878 9.40682 2.37794 9.36265 1.82544 9.33098C1.13044 9.29015 0.577111 8.73598 0.537111 8.04098C0.472111 6.93932 0.331278 4.14015 0.431278 1.97515C0.458778 1.34598 0.967111 0.845149 1.58878 0.834316C3.36961 0.782649 5.20711 1.60932 6.71044 3.11015C8.17544 4.57432 9.10544 6.49848 9.07878 8.01265C9.06878 8.60348 8.63961 9.09682 8.05961 9.18432C6.92794 9.35515 5.60294 9.40682 4.43044 9.40682V9.40682Z" fill={hover ? "#00A2D4" : "#242627"}/>
                   <path d="M10.3965 0.832031H19.0789V9.40645H10.3965V0.832031Z"  fill={hover ? "#00A2D4" : "#242627"} />
                </svg>
        )}
    </>
   );
};