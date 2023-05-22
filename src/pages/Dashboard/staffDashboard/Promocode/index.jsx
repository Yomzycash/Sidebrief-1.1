import { RewardIcon } from "asset/Icons";
import EmptyContent from "components/Fallbacks/EmptyContent";
import LoadingError from "components/Fallbacks/LoadingError";
import ProductHeader from "components/Header/ProductHeader";
import FeatureTable from "components/Tables/FeatureTable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllPromoCodesQuery, useUpdatePromoCodeMutation } from "services/staffService";
import { useActions } from "./actions";
import { PromoBody, PromoContainer } from "./styled";

const AllPromocodes = () => {
  const [dataArr, setDataArr] = useState([]);
  const [clickedPromo, setClickedPromo] = useState({});

  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetAllPromoCodesQuery();
  const [updatePromoCode, updateState] = useUpdatePromoCodeMutation();

  const { getTable, handleTableRowClick, handleSearch, handlePromoCreate, handleFilterChange } =
    useActions({
      data,
      dataArr,
      setDataArr,
      updatePromoCode,
      refetch,
      clickedPromo,
      setClickedPromo,
      updateState,
    });

  useEffect(() => {
    if (data) setDataArr(data);
  }, [data]);

  const summary = {
    current: data?.length || 0,
    total: data?.length || 0,
  };

  const filterList = ["All", "Active", "Inactive"];

  return (
    <PromoContainer>
      <ProductHeader
        title="All Promo Codes"
        summary={summary}
        filterList={filterList}
        action={handlePromoCreate}
        actionText="Create Promo Code"
        searchPlaceholder="Search promo code..."
        onSearchChange={handleSearch}
        ButtonIcon={RewardIcon}
        handleFilterChange={handleFilterChange}
      />
      <PromoBody>
        {!data && !isLoading ? (
          isError ? (
            <LoadingError />
          ) : (
            <EmptyContent
              emptyText="Promo codes will appear here when you create one"
              buttonText="Create Promo Code"
              action={() => navigate("/staff-dashboard/promo-codes/create")}
            />
          )
        ) : (
          <FeatureTable
            header={getTable()?.header}
            body={getTable()?.body}
            onClick={handleTableRowClick}
            bodyFullData={dataArr}
            loading={isLoading}
            rowCursor="pointer"
          />
        )}
        {!isLoading && !isError && dataArr?.length === 0 && (
          <EmptyContent emptyText="Search doesn't match" />
        )}
      </PromoBody>
    </PromoContainer>
  );
};

export default AllPromocodes;
