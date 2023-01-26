import { useEffect, useRef } from "react";
import { BodyText, Checkbox, HeadText, DownloadTag } from "./style";
import { createColumnHelper } from "@tanstack/react-table";
import { TypeIndicator } from "components/Indicators";
import { Download as DownloadSvg, DeleteRedSvg, ViewSvg } from "asset/svg";
import { ThreeDotMenu } from "components/Menu";

const ColumnHelper = createColumnHelper();

const getStatusColor = (status) => {
	switch (status) {
		case "pending":
			return "#FFBF29";
		case "completed":
			return "#00D448";
		default:
			return "#000";
	}
};

export const invoiceColumns = [
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
	ColumnHelper.accessor("invoiceName", {
		header: () => <HeadText>Invoice</HeadText>,
		cell: (info) => {
			return <BodyText>{info.getValue()}</BodyText>;
		},
	}),
	ColumnHelper.accessor("status", {
		header: () => <HeadText></HeadText>,
		cell: (info) => {
			return (
				<TypeIndicator
					color={getStatusColor(info.getValue())}
					type={info.getValue()}
				/>
			);
		},
	}),
	ColumnHelper.accessor("amount", {
		header: () => <HeadText>Amount</HeadText>,
		cell: (info) => {
			return <BodyText>{info.getValue()}</BodyText>;
		},
	}),
	ColumnHelper.accessor("date", {
		header: () => <HeadText>Date</HeadText>,
		cell: (info) => {
			return <BodyText>{info.getValue()}</BodyText>;
		},
	}),
	ColumnHelper.accessor("downloadLink", {
		header: () => <HeadText></HeadText>,
		cell: (info) => {
			return (
				<DownloadTag href={info.getValue()} download>
					<DownloadSvg />
					Download
				</DownloadTag>
			);
		},
	}),
	ColumnHelper.display({
		id: "actions",
		cell: ({ row }) => {
			const contextContent = [
				{
					text: "View",
					Icon: ViewSvg,
					action: () => console.log("view", row.id),
					style: "normal",
				},
				{
					text: "Download",
					Icon: DownloadSvg,
					action: () => console.log("download", row.id),
					style: "normal",
				},
				{
					text: "Delete",
					Icon: DeleteRedSvg,
					action: () => console.log("delete", row.id),
					style: "danger",
				},
			];

			return <ThreeDotMenu contextContent={contextContent} />;
		},
	}),
];

const IndeterminateCheckbox = ({
	indeterminate,
	className = "",
	checked,
	...rest
}) => {
	const ref = useRef(null);

	useEffect(() => {
		if (typeof indeterminate === "boolean") {
			ref.current.indeterminate = !checked && indeterminate;
		}
	}, [ref, indeterminate, checked]);

	return <Checkbox type="checkbox" ref={ref} checked={checked} {...rest} />;
};
