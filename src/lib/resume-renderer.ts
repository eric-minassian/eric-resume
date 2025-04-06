import { marked } from "marked";
import type { PrintMode, ResumeTemplate } from "../types";

/**
 * The approximate number of characters that can fit in a single page
 * This is a rough estimate and will be adjusted based on testing
 */
const SINGLE_PAGE_CHAR_LIMIT = 2500;

/**
 * Scaling factors for single page mode
 */
const SCALING_LEVELS = [
  { scale: 1.0, padding: "40px", fontSize: "1em" },
  { scale: 0.95, padding: "35px", fontSize: "0.95em" },
  { scale: 0.9, padding: "30px", fontSize: "0.9em" },
  { scale: 0.85, padding: "25px", fontSize: "0.85em" },
  { scale: 0.8, padding: "20px", fontSize: "0.8em" },
  { scale: 0.75, padding: "15px", fontSize: "0.75em" },
  { scale: 0.7, padding: "10px", fontSize: "0.7em" },
];

/**
 * Utility for generating CSS from a styles object
 */
export const generateCssFromObject = (
  styleObj: Record<string, string>,
  scale = 1.0
) => {
  let cssString = "";

  // Apply scaling to font sizes if needed
  const scaleValue = (value: string, property: string): string => {
    if (scale === 1.0) return value;

    // Scale font sizes
    if (property.includes("font-size") && value.endsWith("em")) {
      const size = parseFloat(value);
      return `${(size * scale).toFixed(2)}em`;
    }

    // Scale margins and paddings
    if (
      (property.includes("margin") || property.includes("padding")) &&
      (value.endsWith("em") || value.endsWith("px"))
    ) {
      const unit = value.endsWith("em") ? "em" : "px";
      const size = parseFloat(value);
      return `${(size * scale).toFixed(2)}${unit}`;
    }

    return value;
  };

  for (const selector in styleObj) {
    if (selector === "") {
      // Process the main container styles
      const styles = styleObj[selector]
        .split(";")
        .map((style) => {
          const [property, value] = style.split(":").map((s) => s.trim());
          if (!property || !value) return style;
          return `${property}: ${scaleValue(value, property)}`;
        })
        .join("; ");

      cssString += `.resume-container { ${styles} }\n`;
    } else {
      // Process child element styles
      const styles = styleObj[selector]
        .split(";")
        .map((style) => {
          const [property, value] = style.split(":").map((s) => s.trim());
          if (!property || !value) return style;
          return `${property}: ${scaleValue(value, property)}`;
        })
        .join("; ");

      cssString += `.resume-container ${selector} { ${styles} }\n`;
    }
  }

  return cssString;
};

/**
 * Split content into pages based on approximate character count
 * This is a simple implementation that could be improved with more sophisticated analysis
 */
export const splitIntoPages = (htmlContent: string): string[] => {
  // Simple approach - split by sections (using h2 as page breaks)
  const sections = htmlContent.split(/<h2[^>]*>/);

  if (sections.length <= 1) {
    return [htmlContent]; // If there are no h2 elements, return the whole content as one page
  }

  const pages: string[] = [];
  let currentPage = "";

  // Add the first section (everything before the first h2)
  currentPage = sections[0];

  // Process remaining sections
  for (let i = 1; i < sections.length; i++) {
    const section = "<h2>" + sections[i];

    // If adding this section would make the page too long, start a new page
    if ((currentPage + section).length > SINGLE_PAGE_CHAR_LIMIT && i > 1) {
      pages.push(currentPage);
      currentPage = section;
    } else {
      currentPage += section;
    }
  }

  // Add the last page
  if (currentPage) {
    pages.push(currentPage);
  }

  return pages;
};

/**
 * Generate HTML for a single-page resume that fits on one page
 * Includes adaptive sizing mechanism to ensure content fits
 */
export const generateSinglePageResume = (
  htmlContent: string,
  pageSize: "a4" | "letter" = "a4"
): string => {
  const scalingCSS = SCALING_LEVELS.map(
    (level, index) => `
    .resume-container[data-scale="${index}"] {
      --scale-factor: ${level.scale};
      --container-padding: ${level.padding};
      font-size: ${level.fontSize};
    }
  `
  ).join("\n");

  return `
    <div class="resume-page ${pageSize} single-page">
      <div class="resume-container" data-scale="0">
        ${htmlContent}
      </div>
      <script type="text/javascript">
      (function() {
        // This script adjusts the content to fit on a single page
        function checkAndAdjustSize() {
          const container = document.querySelector('.resume-container');
          const page = document.querySelector('.resume-page');
          if (!container || !page) return;
          
          // Get the available height (page height minus margins)
          const pageHeight = page.offsetHeight;
          
          // Check if content overflows
          const currentScale = parseInt(container.getAttribute('data-scale') || '0');
          const contentHeight = container.scrollHeight;
          
          // If content fits, we're done
          if (contentHeight <= pageHeight) return;
          
          // If we haven't reached max scaling level, increase the scale
          const nextScale = currentScale + 1;
          if (nextScale < ${SCALING_LEVELS.length}) {
            container.setAttribute('data-scale', nextScale.toString());
            // Check again after DOM update
            setTimeout(checkAndAdjustSize, 10);
          }
        }
        
        // Run on load and on resize
        window.addEventListener('load', checkAndAdjustSize);
        window.addEventListener('resize', checkAndAdjustSize);
        // Initial check
        setTimeout(checkAndAdjustSize, 100);
      })();
      </script>
      <style>
        ${scalingCSS}
        .resume-container {
          padding: var(--container-padding, 40px);
          transition: all 0.2s ease;
        }
      </style>
    </div>
  `;
};

/**
 * Generate HTML for a multi-page resume with page breaks
 */
export const generateMultiPageResume = (
  pages: string[],
  pageSize: "a4" | "letter" = "a4"
): string => {
  return pages
    .map(
      (pageContent, index) => `
    <div class="resume-page ${pageSize}">
      <div class="resume-container">
        ${pageContent}
      </div>
    </div>
    ${index < pages.length - 1 ? '<div class="resume-page-break"></div>' : ""}
  `
    )
    .join("\n");
};

/**
 * Render markdown content into HTML with the specified template and print mode
 */
export const renderResume = (
  markdown: string,
  template: ResumeTemplate,
  printMode: PrintMode
): string => {
  // First convert markdown to HTML
  const htmlContent = marked(markdown);

  // Generate the appropriate HTML based on print mode
  let resumeHtml: string;
  let templateStyles: string;

  if (printMode === "single") {
    // For single mode, fit everything on one page with potential scaling
    templateStyles = generateCssFromObject(template.styles);
    resumeHtml = generateSinglePageResume(htmlContent);
  } else {
    // For paged mode, split the content into pages
    templateStyles = generateCssFromObject(template.styles);
    const pages = splitIntoPages(htmlContent);
    resumeHtml = generateMultiPageResume(pages);
  }

  // Combine everything together
  return `
    <style>
      ${templateStyles}
    </style>
    ${resumeHtml}
  `;
};
