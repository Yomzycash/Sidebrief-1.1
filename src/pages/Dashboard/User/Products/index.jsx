import { React } from "react";
import { Container, Header, Body } from "./styled";
import { useGetAllCategoriesQuery, useGetAllServicesQuery } from "services/staffService";
import ProductCard from "components/cards/ProductCard";
import { GiLightningSpanner } from "react-icons/gi";
import { MdRocketLaunch } from "react-icons/md";
import { HiRocketLaunch } from "react-icons/hi2";
import { TbReceiptTax } from "react-icons/tb";
import { AiOutlineFileProtect } from "react-icons/ai";

const Products = () => {
  const allCategories = useGetAllCategoriesQuery();

  const getInfo = (category) => {
    if (category?.toLowerCase() === "manage") {
      return {
        title: "Manage Business",
        body: "Make changes to already registered companies",
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
        icon: HiRocketLaunch,
        path: "/services/onboard",
      };
    }
  };

  console.log(allCategories);
  return (
    <Container>
      <Header>
        <p>All Products</p>
        <p>Products you can rely on through your business's journey</p>
      </Header>
      <Body>
        <ProductCard
          Icon={MdRocketLaunch}
          title="Launch a Business"
          body="Start your business registration process with no paperwork"
          to="/launch"
        />
        {allCategories.data?.map((el) => (
          <ProductCard
            Icon={getInfo(el?.catergoryName)?.icon}
            title={getInfo(el?.catergoryName)?.title}
            body={getInfo(el?.catergoryName)?.body}
            to={getInfo(el?.catergoryName)?.path}
          />
        ))}
      </Body>
    </Container>
  );
};

export default Products;
