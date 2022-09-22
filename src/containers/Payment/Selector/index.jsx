import { Container, PayProvide } from "./styles";
import { paymentProviders } from "../constants";

export const PaymentSelector = () => {
	return (
		<Container>
			{paymentProviders.map((el, index) => (
				<PayProvide key={index}>
					<img src={el.image} alt={el.name} />
				</PayProvide>
			))}
		</Container>
	);
};
