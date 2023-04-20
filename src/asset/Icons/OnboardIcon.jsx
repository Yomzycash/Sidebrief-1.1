import React from "react";

export const OnboardIcon = ({filled, hover }) => {
   return (
    <>
        { filled ? (
            <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg" >
                <path d="M3.14086 13.4648L6.02419 16.3481C8.0492 18.3731 8.74086 18.3398 10.7409 16.3481L15.3825 11.7064C16.9992 10.0898 17.4075 9.01476 15.3825 6.98976L12.4992 4.10643C10.3409 1.9481 9.3992 2.48977 7.78253 4.10643L3.14086 8.7481C1.14919 10.7481 0.982528 11.3064 3.14086 13.4648Z"  fill="#00A2D4" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.0002 14.4906L15.4502 15.399C14.6752 16.6906 15.2752 17.749 16.7835 17.749C18.2919 17.749 18.8919 16.6906 18.1169 15.399L17.5669 14.4906C17.1335 13.774 16.4252 13.774 16.0002 14.4906Z" fill="#00A2D4" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66602 10.7003C6.29935 9.44201 11.1827 9.40034 15.8327 10.592L16.2493 10.7003" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ) : (
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 22 22" 
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3.14086 13.4648L6.02419 16.3481C8.0492 18.3731 8.74086 18.3398 10.7409 16.3481L15.3825 11.7064C16.9992 10.0898 17.4075 9.01476 15.3825 6.98976L12.4992 4.10643C10.3409 1.9481 9.3992 2.48977 7.78253 4.10643L3.14086 8.7481C1.14919 10.7481 0.982528 11.3064 3.14086 13.4648Z" fill={hover ? "#00A2D4" : "#242627"}  stroke="#242627" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.0002 14.4906L15.4502 15.399C14.6752 16.6906 15.2752 17.749 16.7835 17.749C18.2919 17.749 18.8919 16.6906 18.1169 15.399L17.5669 14.4906C17.1335 13.774 16.4252 13.774 16.0002 14.4906Z" stroke="#242627" fill={hover ? "#00A2D4" : "#242627"}  />
                    <path d="M1.66602 10.7003C6.29935 9.44201 11.1827 9.40034 15.8327 10.592L16.2493 10.7003" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill={hover ? "#00A2D4" : "#242627"}  />
                
                </svg>
        )}
    </>
   );
};

