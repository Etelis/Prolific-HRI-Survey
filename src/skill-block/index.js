import { registerBlockType } from "@quillforms/blocks";
import SkillTextBlockDisplay from "./display"; // Ensure this import path is correct

registerBlockType("skill-text-block", {
  supports: {
    editable: true, // Indicating the block is for display purposes, not directly editable
  },
  attributes: {
    skillName: {
      type: "string",
      default: "Skill Name", // Default value if not specified
    },
    shortDescription: {
      type: "string",
      default: "A brief description of the skill.", // Default value if not specified
    },
    fullDescription: {
      type: "string",
      default: "A more detailed description of what this skill entails and why it is important.", // Default value if not specified
    },
    items: {
      type: "array",
      default: [], // Expecting an array of items; empty by default
      items: { // Define the structure of each item in the array
        type: "object",
        properties: {
          title: { type: "string" }, // Each item should have a title
          text: { type: "string" }  // And text describing the example
        },
      }
    }
  },
  display: SkillTextBlockDisplay, // The component to use for displaying this block
});
