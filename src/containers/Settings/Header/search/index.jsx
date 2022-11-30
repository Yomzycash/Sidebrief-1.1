import { Container, Input } from "./styles";
import { MagGlass } from "asset/svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const searchSchema = yup.object().shape({
	query: yup.string().notRequired(),
});

export const Search = ({ triggerSearch }) => {
	const { handleSubmit, register, reset } = useForm({
		resolver: yupResolver(searchSchema),
	});

	const onSubmit = (data) => {
		triggerSearch(data.query);
		reset();
	};

	return (
		<Container onSubmit={handleSubmit(onSubmit)}>
			<MagGlass />
			<Input
				name="query"
				placeholder={`Search for a setting`}
				{...register("query")}
			/>
			<button type={"submit"} style={{ display: "none" }}>
				submit
			</button>
		</Container>
	);
};
