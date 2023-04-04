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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { sortTableData } from "utils/staffHelper";
// import Paginator from "components/Paginator";
// import CheckBox from "components/input/Checkbox2";
// import { Puff } from "react-loading-icons";
// import { GeneralTable } from "components/Tables";
// import { columns } from "./tableColumn";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserService = () => {
  const [tableArr, setTableArr] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  // const { data, isLoading, refetch } = useGetAllServicesQuery();
  //const myService = useViewAllComplyByMetaQuery();
  const userMeta = useSelector((state) => state.UserDataReducer.userInfo.id);
  const { data, isLoading, refetch, isSuccess } = useViewAllComplyByMetaQuery({
    meta: userMeta,
  });

  // const allService = myService?.data;
  // console.log("allService", allService)
  // const loader = myService?.isLoading;

  // const sortedArr = useMemo(() => {
  // 	const sortArr = [...tableArr];
  // 	return sortArr.sort(sortTableData);
  // }, [tableArr])

  const itemsPerPage = 10;

  // const handlePageClick = (e) => {
  // 	const newOffset = (e.selected * itemsPerPage) % sortedArr?.length;
  // 	setItemOffset(newOffset);
  // };

  // useEffect(() => {
  // 	const endOffset = itemOffset + itemsPerPage;
  // 	setCurrentItems(sortedArr?.slice(itemOffset, endOffset));
  // 	setPageCount(Math.ceil(sortedArr?.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, sortedArr]);
  // console.log("sortedArr", sortedArr)

  // console.log("serviceBody", serviceBody )

  useEffect(() => {
    refetch();
  }, []);

  const submitted = data?.filter((el) => el.status === "submitted") || [];
  const draft = data?.filter((el) => el.status === "pending") || [];

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Services</PageTitle>
              <Wrapper>
               <SummaryCard shown={9} total={30} />
              </Wrapper>
              
            </div>
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
          </TopContent>
          <BottomContent>
            <SearchWrapper>
              <Search className={"searchbox"} placeholder={"Search for a service"} />
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
