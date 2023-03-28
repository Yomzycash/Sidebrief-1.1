import React, { useState } from "react";
import { PaymentForm } from "./Form";
import { PaymentSelector } from "./Selector";

const Payment = ({ paymentInfo }) => {
  const [activeProvider, setActiveProvider] = useState("");

  return (
    <div>
      <PaymentSelector
        activeProvider={activeProvider}
        setActiveProvider={setActiveProvider}
        currency={paymentInfo?.currency}
      />
      <PaymentForm paymentProvider={activeProvider} paymentInfo={paymentInfo} />
    </div>
  );
};

export default Payment;
