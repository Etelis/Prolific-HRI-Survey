// index.js
import { registerBlockType } from "@quillforms/blocks";
import AccordionBlock from "./AccordionDisplay"; // Update the import path as needed

registerBlockType("accordion-block", {
  supports: {
    editable: false,
  },
  attributes: {
    items: {
      type: "array",
      default: [],
    },
  },
  display: (props) => <AccordionBlock {...props} />,
});
