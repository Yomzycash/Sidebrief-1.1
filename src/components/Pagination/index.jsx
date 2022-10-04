import React, { useRef } from "react";
import ReactPaginate from "react-paginate";

const Pagination = () => {
  const pagination = useRef();

  const handlePageClick = ({ selected }) => console.log(selected);

  return (
    <ReactPaginate
      ref={pagination}
      pageCount={Math.ceil(613 / 25)}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      activeClassName="active"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      previousLinkClassName="page-link"
      pageClassName="page-item"
      breakClassName="page-item"
      nextClassName="page-item"
      previousClassName="page-item"
      previousLabel={<>&laquo;</>}
      nextLabel={<>&raquo;</>}
    />
  );
};

export default Pagination;
