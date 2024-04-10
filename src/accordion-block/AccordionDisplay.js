// AccordionBlock.js
import React from 'react';
import AccordionItem from '../skill-block/AccordionItem'; // Adjust the import path as necessary

const AccordionBlock = ({ attributes }) => {
  const { items = [] } = attributes;

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} text={item.text} />
      ))}
    </div>
  );
};

export default AccordionBlock;
