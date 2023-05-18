import { SubscriptionFormContainer } from "./styles";
import { InputWithLabel } from "components/input";
import { CommonButton } from "components/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { subFormElements, subscriptionSchema, useCardInput } from "./constants";

export const SubscriptionForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
  });

  const { formatInput, parseCardInput } = useCardInput({ setValue });

  const subscribe = (data) => {
    console.log(parseCardInput(data));
  };

  return (
    <SubscriptionFormContainer onSubmit={handleSubmit(subscribe)}>
      {subFormElements.map((el) => (
        <InputWithLabel
          key={el.id}
          label={el.label}
          containerStyle={el.classname}
          type={el.type}
          name={el.name}
          register={register}
          errorMessage={errors[el.name] && errors[el.name]?.message}
          onChange={(e) => {
            formatInput(e.target.value, el.name);
          }}
        />
      ))}
      <CommonButton text={"Subscribe"} classname={"submit"} type={"submit"} />
    </SubscriptionFormContainer>
  );
};
