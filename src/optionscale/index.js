import { registerBlockType } from "@quillforms/blocks";
import MyCustomBlockDisplay from "./display"; // Ensure the import path and name are correct

registerBlockType("option-scale", {
  supports: {
    editable: true,
  },
  attributes: {
    start: {
      type: "number",
      default: 1,
    },
    end: {
      type: "number",
      default: 5,
    },
    startLabel: {
      type: "string",
      default: "",
    },
    endLabel: {
      type: "string",
      default: "",
    },
    labels: {
      type: "object",
      default: {},
    }
  },
  display: MyCustomBlockDisplay,
});
