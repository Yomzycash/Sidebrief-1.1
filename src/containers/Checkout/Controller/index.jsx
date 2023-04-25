import React from "react";
import { Container } from "./styles";
import { CheckoutButton } from "components/button";

export const CheckoutController = ({
  backAction,
  forwardAction,
  backText,
  forwardText,
  hidePrev,
  forwardSubmit,
  containerStyle,
  backBottonStyle,
  forwardButtonStyle,
  backwardSubmit,
  forwardDisable,
  backDisable,
  entity,
  hideForward,
  forwardLoading,
  backLoading,
  $modal,
  loadingIconColor,
}) => {
  return (
    <Container style={containerStyle} $modal={$modal} hidePrev={hidePrev}>
      <CheckoutButton
        back
        action={backAction}
        text={backText}
        hide={hidePrev}
        type={backwardSubmit || "button"}
        style={backBottonStyle}
        disable={backDisable}
        loading={backLoading}
        loadingIconColor={loadingIconColor}
      />
      {!entity && (
        <CheckoutButton
          action={() => {
            forwardAction && forwardAction();
          }}
          text={forwardText}
          type={forwardSubmit ? "submit" : "button"}
          style={forwardButtonStyle}
          disable={forwardDisable}
          hide={hideForward}
          loading={forwardLoading}
          loadingIconColor={loadingIconColor}
        />
      )}
    </Container>
  );
};
