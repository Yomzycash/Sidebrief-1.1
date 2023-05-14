import React, { useState } from "react";
import Accordion from "components/Accordion";

const AccordionContent = ({ items }) => {
    const [activeAccordion, setActiveAccordion] = useState(false);

    const handleEachAccordion = (index) => {
        setActiveAccordion(index === activeAccordion ? null : index);
    }

    const handleOpenAcccordion = (index) => {
        setActiveAccordion(index);
    }
    return (
        <div>
            {items.map((item, index) => (
                <Accordion
                    key={index}
                    index={index}
                    name={item.name}
                    type={item.type}
                    country={item.country}
                    date={item.date}
                    code={item.code}
                    countryISO={item.countryISO}
                    navigate={item.navigate}
                    product={item.product}
                    action={item.action}
                    isActive={index=activeAccordion}
                    onClick={() => handleEachAccordion(index)}
                    onAccordionOpen={() => handleOpenAcccordion(index)}
                />
            ))}
        </div>
    )
}

export default AccordionContent