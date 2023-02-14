import React from "react";
import ReactPaginate from "react-paginate";
import "./style.css";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useTheme } from "styled-components";

const Left = () => {
	const theme = useTheme();

	return (
		<div
			style={{
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				gap: "8px",
				color: theme.grey1,
			}}
		>
			<HiArrowSmLeft size={20} color={theme.grey1} /> Previous
		</div>
	);
};
const Right = () => {
	const theme = useTheme();

	return (
		<div
			style={{
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				gap: "8px",
				color: theme.grey1,
			}}
		>
			Next <HiArrowSmRight size={20} color={theme.grey1} />
		</div>
	);
};
const Paginator = ({ handlePageClick, pageCount }) => {
	return (
		<div
			style={{
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				width: "100%",
			}}
		>
			<ReactPaginate
				breakLabel="..."
				nextLabel={<Right />}
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				previousLabel={<Left />}
				renderOnZeroPageCount={null}
				containerClassName="pagination"
				pageLinkClassName="page-num"
				previousLinkClassName="page-num"
				nextLinkClassName="page-num"
				activeLinkClassName="active"
				pageClassName="page-item"
				breakClassName="page-item"
			/>
		</div>
	);
};

export default Paginator;
