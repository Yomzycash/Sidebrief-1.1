import { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    //reserving an extra page for the remaining data
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + 1,
      siblingCount,
      totalPageCount
    );

    const shouldShowwLeftDots = leftSiblingIndex > 2;
    const shouldShowwRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowwLeftDots && shouldShowwRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let LeftRange = range(1, leftItemCount);

      return [...LeftRange, DOTS, totalPageCount];
    }

    if (shouldShowwLeftDots && !shouldShowwRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowwLeftDots && shouldShowwRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
