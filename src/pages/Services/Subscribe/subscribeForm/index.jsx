import { Container } from "./styles";
import { subFormElements, subscriptionSchema, useCardInput } from "./constants";
import { InputWithLabel } from "components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/button";
import { useCreateSubscriptionMutation } from "services/productService";

export const SubscribeForm = ({ productId, priceId }) => {
  const [createSubscription] = useCreateSubscriptionMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
  });

  const { formatInput, parseCardInput } = useCardInput({ setValue });

  const userEmail = localStorage.getItem("userEmail");

  const submitCard = (data) => {
    const requiredData = {
      email: userEmail,
      ...parseCardInput(data),
      productId: productId,
      priceId: priceId,
    };
    createSubscription(requiredData);
    reset();
  };

  console.log({ productId, priceId });

  return (
    <Container onSubmit={handleSubmit(submitCard)}>
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
          placeholder={el.placeholder}
        />
      ))}
      <CommonButton text={"Subscribe"} classname={"submit"} type={"submit"} />
    </Container>
  );
};
