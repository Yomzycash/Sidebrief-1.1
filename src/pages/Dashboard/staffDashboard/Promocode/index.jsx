import { RewardIcon } from "asset/Icons";
import EmptyContent from "components/Fallbacks/EmptyContent";
import LoadingError from "components/Fallbacks/LoadingError";
import ProductHeader from "components/Header/ProductHeader";
import FeatureTable from "components/Tables/FeatureTable";
import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllPromoCodesQuery } from "services/staffService";
import { useActions } from "./actions";
import { PromoBody, PromoContainer, Action, Status } from "./styled";

const AllPromocodes = () => {
  const [dataArr, setDataArr] = useState([]);
  // const [filteredData, setFilteredData] = useState(dataArr);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllPromoCodesQuery();

  const { handleCellClick, handleSearch, handlePromoCreate, handlePromoEdit } = useActions(
    data,
    dataArr,
    setDataArr
  );

  useEffect(() => {
    if (data) setDataArr(data);
  }, [data]);

  const summary = {
    current: data?.length || 0,
    total: data?.length || 0,
  };

  const filterList = ["All", "Active", "Inactive"];

  // Tabele header
  const header = ["Promo Code", "Discount", "Expiry Date", "Status", "Action"];

  // Table body
  const dataBody = dataArr?.map((el) => [
    el?.promoCode,
    el?.promoDiscount + "%",
    format(new Date(el?.promoExpiry), "dd-MMM-yyyy"),
    el?.promoStatus ? <Status active>Active</Status> : <Status>Inactive</Status>,
    <Action>
      <div value="Enable" onClick={(e) => handlePromoEdit(e)}>
        Edit
      </div>
      <div value="disable">Disable</div>
    </Action>,
  ]);

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
      />
      <PromoBody>
        {!data && !isLoading ? (
          isError ? (
            <LoadingError />
          ) : (
            <EmptyContent
              emptyText="Users taxes requests will appear here when they create one"
              buttonText="Create Tax"
              action={() => navigate("/staff-dashboard/promo-codes/create")}
            />
          )
        ) : (
          <FeatureTable
            header={header}
            body={dataBody}
            onCellClick={handleCellClick}
            bodyFullData={dataArr}
            loading={isLoading}
          />
        )}
      </PromoBody>
    </PromoContainer>
  );
};

export default AllPromocodes;
