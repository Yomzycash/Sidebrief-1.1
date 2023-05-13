import React, { useEffect, useState } from "react";
import { Container, ButtonContainer, LastWrapper } from "./styled";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import EmptyContent from "components/Fallbacks/EmptyContent";
import { useCategoriesActions } from "../../actions";
import LoadingError from "components/Fallbacks/LoadingError";
import MobileBusiness from "layout/MobileBusiness";
import { useMediaQuery } from "@mui/material";
import { ReactComponent as NoteIcon } from "asset/images/note.svg";

//

const Intellectual = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    submitted,
    drafts,
    paidDrafts,
    isLoading,
    isError,
    isSuccess,
    complyFullInfo,
    handleCategoryCreate,
  } = useCategoriesActions({
    category: "Intellectual Property",
    createPath: "/services/intellectual-property",
  });

  const { pathname } = useLocation();

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;
  let paidDraftTotal = paidDrafts?.length;
  let allTotal = complyFullInfo?.length;

  useEffect(() => {
    removeComplyFromLocalStorage();
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
  };

  const summary = {
    current: submittedTotal + draftTotal || 0,
    total: submittedTotal + draftTotal || 0,
  };

  const filterList = ["All"];

  const navInfo = [
    {
      text: "All",
      total: allTotal || 0,
      path: "/dashboard/my-products/intellectual-property/all-intellectual-properties",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/my-products/intellectual-property/submitted-intellectual-properties",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Drafts",
      total: draftTotal || 0,
      path: "/dashboard/my-products/intellectual-property/draft-intellectual-properties",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/my-products/intellectual-property/paid-draft-intellectual-properties",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/dashboard/my-products/intellectual-property" &&
    "/dashboard/my-products/intellectual-property/all-intellectual-properties";
  const matches = useMediaQuery("(max-width:700px)");

  let pathNavigation = {
    All: "all",
    Submitted: "submitted",
    Drafts: "draft",
    "Paid Drafts": "paid-draft",
  };
  let options = [
    {
      title: submittedTotal + draftTotal > 0 ? "All" : "",
      totalLength: submittedTotal + draftTotal,
    },
    {
      title: submittedTotal > 0 ? "Submitted" : "",
      totalLength: submittedTotal,
    },

    {
      title: draftTotal > 0 ? "Drafts" : "",
      totalLength: draftTotal,
    },
    {
      title: paidDraftTotal > 0 ? "Paid Drafts" : "",
      totalLength: paidDraftTotal,
    },
  ];
  options = options.filter((el) => el?.title !== "");

  const navigate = useNavigate();
  const selectedValue = (option) => {
    console.log(option);
    navigate(
      `/dashboard/my-products/intellectual-property/${pathNavigation[option?.title]}-intellectual-properties`
    );
  };
  const handleIntellectual = () => {
    navigate("/services/intellectual-property");
  };

  return (
    <Container>
      {matches ? (
        <MobileBusiness
        realSelectedValue={selectedValue}
        originalOptions={options}
          title={"Intellectual Property"}
          initialTitle={"All"}
          initialLength={submittedTotal + draftTotal}
          mobile
        />
      ) : (
        <ProductHeader
          title="Intellectual Property"
          searchPlaceholder="Search intellectual property..."
          summary={summary}
          filterList={filterList}
          action={handleCategoryCreate}
          actionText="Create Intellectual Property"
          emptyText="Your businesses will appear here when you launch one"
          onSearchChange={handleSearch}
          navInfo={navInfo}
          defaultActive={isFirstNav}
        />
      )}
      {!allTotal && !isLoading ? (
        isError ? (
          <LoadingError />
        ) : (
          <EmptyContent
            emptyText="Your intellectual properties will appear here when you create one"
            buttonText="Create Intellectual Property"
            action={handleCategoryCreate}
          />
        )
      ) : (
        <Outlet
          context={{
            submitted,
            paidDrafts,
            drafts,
            searchValue,
            isLoading,
            isError,
            isSuccess,
          }}
        />
      )}
      {matches && (
        <LastWrapper>
          <ButtonContainer>
            <button onClick={handleIntellectual}>
              <NoteIcon />
              Create Intellectual Property
            </button>
          </ButtonContainer>
        </LastWrapper>
      )}
    </Container>
  );
};
export default Intellectual;
