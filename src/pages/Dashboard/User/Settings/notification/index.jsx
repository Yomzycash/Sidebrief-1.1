import { Container, Heading, Options } from "./styles";
import { Switch } from "components/switch";
import { notificationOptions } from "./constants";

const Notification = () => {
	return (
		<Container>
			<Heading>Email Notification</Heading>
			<Options>
				{notificationOptions.map((el) => (
					<Switch key={el.id} id={el.id} text={el.text} />
				))}
			</Options>
		</Container>
	);
};

export default Notification;
