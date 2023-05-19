import React, { useState } from 'react'
import {
    DropdownContainer,
    DropdownContent,
    DropdownList,
    DropdownItem
} from "./styled"

const Dropdown = ({ options }) => {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => {
        setOpen(!open);
    }
    
    return (
        <DropdownContainer>
      {/* <DropdownButton onClick={toggleDropdown}>Options</DropdownButton> */}
      <DropdownContent open={open}>
        {options.map((item, index) => (
          <DropdownList 
            key={index} 
            text={item.text} 
            path={item.path} 
            total={item.total} 
            status={item.status} 
        />
        ))}
      </DropdownContent>
    </DropdownContainer>
    )
}

export default Dropdown