
import { React, useEffect, useState, useMemo } from "react";
import {
  Container,
  Header,
  MainHeader,
  TopContent,
  PageTitle,
  Wrapper,
  Drop,
  BottomContent,
  Loading,
  Flex,
  SearchWrapper,
  SubHeader,
  TitleWrapper,
} from "./styled";
import ActiveNav from "components/navbar/ActiveNav";
import { useViewAllComplyByMetaQuery } from "services/complyService";
import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import { compareAsc, format } from "date-fns";
import Fuse from "fuse.js";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchResult } from "components/navbar/SearchResult";
import { userNavigateToServiceDetailPage } from "utils/globalFunctions";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  width: "100%",
  height: "100%",
};

const iconStyle = { width: "17px", height: "17px" };

const UserService = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [tableArr, setTableArr] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const userMeta = useSelector((state) => state.UserDataReducer.userInfo.id);
  const { data, isLoading, refetch, isSuccess } = useViewAllComplyByMetaQuery({
    meta: userMeta,
  });
  const navigate = useNavigate();


  useEffect(() => {
    refetch();
  }, []);

  const submitted = data?.filter((el) => el.status === "submitted") || [];
  const draft = data?.filter((el) => el.status === "pending") || [];

  const fuseOptions = {
    shouldSort: true,
    keys: [
      "complyCode",
      "serviceId",
      "status"
    ]
  }

  const userServices = [...(submitted || []), ...(draft || [])];

  const fuse = new Fuse(userServices, fuseOptions);

  const onItemClick = (item) => {
    setSearchFocused(false);
    const complyCode = item.complyCode;
    userNavigateToServiceDetailPage(navigate, complyCode);
  }

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Services</PageTitle>
              {/* <Wrapper>
               <SummaryCard shown={9} total={30} />
              </Wrapper> */}
              
            </div>
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
          </TopContent>
          <BottomContent>
            <SearchWrapper onFocus={() => setSearchFocused(true)}>
              <Search 
                className={"searchbox"} 
                placeholder={"Search for a service"} 
                iconStyle={iconStyle}
                style={searchStyle}
                onChange={(value) => setSearchValue(value)}
                value={searchValue}
              />
              <SearchResult 
                items={fuse
                  .search(searchValue)
                  .slice(0,5)
                  .map((el) => {
                    return {
                      complyCode:el.item.complyCode,
                      serviceId: el.item.serviceId,
                      status:el.item.status
                    }
                  })}
                  show={searchFocused}
                  unShow={() => setSearchFocused(false)}
                  onItemClick={onItemClick}
                  searchResult={searchValue}
              />
            </SearchWrapper>
          </BottomContent>

          <SubHeader>
            <ActiveNav
              text="All"
              total={isSuccess ? data.length : 0}
              path={"/dashboard/services/all"}
            />
            <ActiveNav
              text="Submitted"
              total={submitted.length}
              path="/dashboard/services/submitted"
            />
            <ActiveNav text="Draft" total={draft.length} path="/dashboard/services/draft" />
          </SubHeader>
          <Outlet />
        </MainHeader>
      </Header>
    </Container>
  );
};

export default UserService;
