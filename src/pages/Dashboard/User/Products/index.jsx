import { React } from "react";
import { Container, Header, Body, Loading } from "./styled";
import { useGetAllCategoriesQuery } from "services/staffService";
import ProductCard from "components/cards/ProductCard";
import { GiLightningSpanner } from "react-icons/gi";
import { IoIosRocket } from "react-icons/io";
import { TbReceiptTax } from "react-icons/tb";
import { AiOutlineFileProtect } from "react-icons/ai";
import { Puff } from "react-loading-icons";
import { FaCheckDouble } from "react-icons/fa";
import { useEffect } from "react";
import { store } from "redux/Store";
import { setGeneratedLaunchCode, setLaunchResponse } from "redux/Slices";
import { removeLaunchFromStore, clearProductsInfo } from "utils/globalFunctions";
import LoadingError from "components/Fallbacks/LoadingError";

const Products = () => {
  const allCategories = useGetAllCategoriesQuery();

  const getInfo = (category) => {
    if (category?.toLowerCase() === "manage") {
      return {
        title: "Manage Business",
        body: "Make changes to already registered companies/businesses",
        icon: GiLightningSpanner,
        path: "/services/manage",
      };
    } else if (category.toLowerCase() === "tax") {
      return {
        title: "Tax",
        body: "5 mins completion time",
        icon: TbReceiptTax,
        path: "/services/tax",
      };
    } else if (category.toLowerCase() === "intellectual property") {
      return {
        title: "Intellectual Property",
        body: "Patent, Trademark, Servicemark, ...",
        icon: AiOutlineFileProtect,
        path: "/services/intellectual-property",
      };
    } else if (category.toLowerCase() === "onboard") {
      return {
        title: "Onboard a Business",
        body: "Automate your business compliance",
        icon: IoIosRocket,
        path: "/services/onboard",
      };
    } else if (category.toLowerCase() === "compliance") {
      return {
        title: "Compliance",
        body: "Automate your business compliance",
        icon: FaCheckDouble,
        path: "/services/compliance",
      };
    }
  };

  useEffect(() => {
    clearProductsInfo();
  }, []);

  // console.log(allCategories);
  return (
    <Container>
      {allCategories.data && (
        <Header>
          <p>All Products</p>
          <p>Products you can rely on through your business's journey</p>
        </Header>
      )}
      {allCategories.isLoading && (
        <Loading height="50vh">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}
      <Body>
        {allCategories.data && (
          <>
            <ProductCard
              Icon={IoIosRocket}
              title="Launch a Business"
              body="Start your business/company registration process with no paperwork"
              to="/launch"
            />
            {allCategories.data?.map((el, i) => (
              <ProductCard
                key={i}
                Icon={getInfo(el?.catergoryName)?.icon}
                title={getInfo(el?.catergoryName)?.title}
                body={getInfo(el?.catergoryName)?.body}
                to={getInfo(el?.catergoryName)?.path}
              />
            ))}
          </>
        )}
      </Body>
      {allCategories.isError && <LoadingError />}
    </Container>
  );
};

export default Products;
