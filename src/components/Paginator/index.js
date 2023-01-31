import React from "react";
import ReactPaginate from "react-paginate";
import "./style.css";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

const left = (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      gap: "8px",
      color: "#242627",
    }}
  >
    <HiArrowSmLeft size={20} color="#242627" /> Previous
  </div>
);
const right = (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      gap: "8px",
      color: "#242627",
    }}
  >
    <HiArrowSmRight size={20} color="#242627" /> Next
  </div>
);
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
        nextLabel={right}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={left}
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
