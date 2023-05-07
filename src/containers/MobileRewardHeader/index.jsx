import HeaderSearch from 'components/HeaderSearch'
import CustomDropdown from 'components/input/CustomDropdown'
import React from 'react'
import styled from 'styled-components'

const MobileRewardHeader = ({rewardsCategories,handleCategory,category, options, setSelected}) => {
  return (
    <MobileContainer>
    <Categories>
      {rewardsCategories?.map((cat, index) => (
        <div
          key={index}
          onClick={() => handleCategory(cat)}
          style={{
            color: cat === category.get("category") ? "#00A2D4" : "",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {cat}
          
        </div>
      ))}
    </Categories>
          <HeaderSearch title="Rewards" />
          <CustomDropdown
        options={options}
        selectedValue={setSelected}
        intialvalue={"All Rewards"}
      />
      </MobileContainer>
      
  )
}

export default MobileRewardHeader
const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;
const Categories = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  overflow-x: auto;
`;
