import { registerBlockType } from "@quillforms/blocks";
import TutorialTextBlockDisplay from "./display"; // Ensure this import path is correct

registerBlockType("tutorial-text-block", {
  supports: {
    editable: true, // Indicating the block is for display purposes, not directly editable
  },
  attributes: {
    text: {
      type: "string",
      default: "This is a tutorial text. Learn more about the topic.", // Default value if not specified
    }
  },
  display: TutorialTextBlockDisplay, // The component to use for displaying this block
});
