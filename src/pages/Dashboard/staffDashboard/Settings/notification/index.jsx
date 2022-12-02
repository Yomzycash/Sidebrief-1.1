import { Container, Heading, Options, Top } from "./styles";
import { Switch } from "components/switch";
import { notificationOptions } from "./constants";

const StaffNotification = () => {
	return (
		<>
			<Top>
				<p>
					We may send you important notifications about your account
					outside of your notification settings.
				</p>
			</Top>
			<Container>
				<Heading>Email Notifications</Heading>
				<Options>
					{notificationOptions.map((el) => (
						<Switch
							key={el.id}
							id={el.id}
							text={el.title}
							subText={el.subtitle}
						/>
					))}
				</Options>
			</Container>
		</>
	);
};

export default StaffNotification;
