import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
	HeadText,
	BodyText,
	NameContainer,
	Email,
	Checkbox,
	Delete,
	Edit,
} from "./styles";
import { format } from "date-fns";

const ColumnHelper = createColumnHelper();

export const columns = [
	ColumnHelper.display({
		id: "checkbox",
		header: ({ table }) => {
			return (
				<IndeterminateCheckbox
					checked={table.getIsAllRowsSelected()}
					indeterminate={table.getIsSomeRowsSelected()}
					onChange={table.getToggleAllRowsSelectedHandler()}
				/>
			);
		},
		cell: ({ row }) => {
			return (
				<IndeterminateCheckbox
					checked={row.getIsSelected()}
					indeterminate={row.getIsSomeSelected()}
					onChange={row.getToggleSelectedHandler()}
				/>
			);
		},
	}),
	ColumnHelper.accessor("name", {
		header: () => <HeadText>Name</HeadText>,
		cell: (info) => (
			<NameContainer>
				<BodyText>{info.getValue()}</BodyText>
				<Email>{info.row.original.email}</Email>
			</NameContainer>
		),
	}),
	ColumnHelper.accessor("dateAdded", {
		header: () => <HeadText>Date Added</HeadText>,
		cell: (info) => {
			return (
				<BodyText>
					{format(new Date(info.getValue()), "MMM dd, yyyy")}
				</BodyText>
			);
		},
	}),
	ColumnHelper.accessor("lastActive", {
		header: () => <HeadText>Last Active</HeadText>,
		cell: (info) => {
			return (
				<BodyText>
					{format(new Date(info.getValue()), "MMM dd, yyyy")}
				</BodyText>
			);
		},
	}),
	ColumnHelper.accessor("role", {
		header: () => <HeadText>Role</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.display({
		id: "delete",
		cell: ({ row }) => {
			return <Delete>delete</Delete>;
		},
	}),
	ColumnHelper.display({
		id: "edit",
		cell: ({ row }) => {
			return <Edit>edit</Edit>;
		},
	}),
];

const IndeterminateCheckbox = ({
	indeterminate,
	className = "",
	checked,
	...rest
}) => {
	const ref = React.useRef(null);

	React.useEffect(() => {
		if (typeof indeterminate === "boolean") {
			ref.current.indeterminate = !checked && indeterminate;
		}
	}, [ref, indeterminate, checked]);

	return <Checkbox type="checkbox" ref={ref} checked={checked} {...rest} />;
};
