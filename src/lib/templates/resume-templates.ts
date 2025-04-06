import type { ResumeTemplate } from "../../types";

/**
 * Collection of predefined resume templates with their styling options
 */
export const templates: Record<string, ResumeTemplate> = {
  modern: {
    name: "Modern",
    styles: {
      "": {
        "font-family": "Arial",
        color: "black",
        "line-height": "1.5",
        "font-size": "14px",
      },
      h1: {
        "font-size": "2.2em",
        color: "black",
        "font-weight": "700",
        "border-bottom": "none",
        "letter-spacing": "-0.03em",
        "text-align": "center",
      },
      h2: {
        "font-size": "1.6em",
        "margin-top": "1.4em",
        "margin-bottom": "0.5em",
        color: "#1e40af",
        "font-weight": "600",
        "border-bottom": "2px solid #dbeafe",
        "padding-bottom": "0.2em",
      },
      h3: {
        "font-size": "1.2em",
        "margin-top": "1em",
        "margin-bottom": "0.3em",
        color: "#1e3a8a",
        "font-weight": "600",
      },
      p: {
        "font-size": "1em",
        "margin-bottom": "0.8em",
        "line-height": "1.6",
      },
      ul: {
        "list-style-type": "disc",
        "margin-left": "1.5em",
        "margin-bottom": "1em",
      },
      li: {
        "margin-bottom": "0.4em",
      },
      a: {
        color: "#2563eb",
        "text-decoration": "none",
        "border-bottom": "1px dotted #93c5fd",
      },
      "a:hover": {
        "border-bottom": "1px solid #2563eb",
      },
      blockquote: {
        "border-left": "4px solid #dbeafe",
        "padding-left": "1em",
        color: "#475569",
        "font-style": "italic",
      },
      hr: {
        border: "none",
        "border-top": "1px solid #e2e8f0",
        margin: "1.5em 0",
      },
      strong: {
        "font-weight": "600",
        color: "#111827",
      },
      em: {
        "font-style": "italic",
        color: "#374151",
      },
    },
  },
  classic: {
    name: "Classic",
    styles: {
      "": {
        "font-family": "'Georgia', 'Times New Roman', serif",
        color: "#111",
        "line-height": "1.6",
        "font-size": "14px",
      },
      h1: {
        "font-size": "2.5em",
        "margin-bottom": "0.3em",
        "text-align": "center",
        "font-weight": "normal",
        "border-bottom": "1px solid #222",
        "padding-bottom": "0.2em",
      },
      h2: {
        "font-size": "1.8em",
        "margin-top": "1.2em",
        "margin-bottom": "0.5em",
        "font-weight": "normal",
        color: "#222",
        "border-bottom": "1px solid #666",
        "padding-bottom": "0.2em",
      },
      h3: {
        "font-size": "1.4em",
        "margin-top": "1em",
        "margin-bottom": "0.3em",
        "font-weight": "normal",
        "font-style": "italic",
        color: "#333",
      },
      p: {
        "font-size": "1em",
        "margin-bottom": "1em",
        "line-height": "1.6",
        "text-align": "justify",
      },
      ul: {
        "list-style-type": "square",
        "margin-left": "1.5em",
        "margin-bottom": "1em",
      },
      li: {
        "margin-bottom": "0.5em",
      },
      a: {
        color: "#005b99",
        "text-decoration": "none",
      },
      "a:hover": {
        "text-decoration": "underline",
      },
      blockquote: {
        "border-left": "3px solid #ccc",
        "padding-left": "1em",
        color: "#555",
        "font-style": "italic",
      },
      hr: {
        border: "none",
        "border-top": "1px solid #ccc",
        margin: "1.5em 0",
      },
      strong: {
        "font-weight": "bold",
        color: "#000",
      },
      em: {
        "font-style": "italic",
        color: "#222",
      },
    },
  },
  minimalist: {
    name: "Minimalist",
    styles: {
      "": {
        "font-family": "'Helvetica Neue', Arial, sans-serif",
        color: "#333",
        "line-height": "1.5",
        "font-size": "13px",
        "font-weight": "300",
      },
      h1: {
        "font-size": "1.8em",
        "margin-bottom": "1em",
        color: "#000",
        "font-weight": "500",
        "letter-spacing": "-0.02em",
        "text-transform": "uppercase",
      },
      h2: {
        "font-size": "1.2em",
        "margin-top": "1.5em",
        "margin-bottom": "0.8em",
        color: "#000",
        "font-weight": "500",
        "text-transform": "uppercase",
        "letter-spacing": "0.05em",
      },
      h3: {
        "font-size": "1.1em",
        "margin-top": "1em",
        "margin-bottom": "0.5em",
        color: "#333",
        "font-weight": "500",
      },
      p: {
        "font-size": "1em",
        "margin-bottom": "0.8em",
        "line-height": "1.6",
      },
      ul: {
        "list-style-type": "none",
        "margin-left": "0",
        "margin-bottom": "1em",
      },
      li: {
        "margin-bottom": "0.4em",
        "padding-left": "1em",
        "text-indent": "-1em",
      },
      "li:before": {
        content: "'-'",
        "margin-right": "0.5em",
        color: "#999",
      },
      a: {
        color: "#000",
        "text-decoration": "none",
        "border-bottom": "1px solid #ddd",
      },
      "a:hover": {
        "border-bottom": "1px solid #000",
      },
      blockquote: {
        "border-left": "2px solid #eee",
        "padding-left": "1em",
        color: "#666",
        "font-style": "italic",
      },
      hr: {
        border: "none",
        "border-top": "1px solid #eee",
        margin: "1.5em 0",
      },
      strong: {
        "font-weight": "500",
        color: "#000",
      },
      em: {
        "font-style": "italic",
        color: "#444",
      },
    },
  },
  professional: {
    name: "Professional",
    styles: {
      "": {
        "font-family": "'Calibri', 'Segoe UI', sans-serif",
        color: "#333",
        "line-height": "1.5",
        "font-size": "13px",
      },
      h1: {
        "font-size": "2em",
        "margin-bottom": "0.5em",
        color: "#1f497d",
        "font-weight": "600",
        "border-bottom": "2px solid #1f497d",
        "padding-bottom": "0.3em",
      },
      h2: {
        "font-size": "1.5em",
        "margin-top": "1.3em",
        "margin-bottom": "0.5em",
        color: "#1f497d",
        "font-weight": "600",
        "border-bottom": "1px solid #ddd",
        "padding-bottom": "0.2em",
      },
      h3: {
        "font-size": "1.2em",
        "margin-top": "1em",
        "margin-bottom": "0.4em",
        color: "#1f497d",
        "font-weight": "600",
      },
      p: {
        "font-size": "1em",
        "margin-bottom": "0.8em",
        "line-height": "1.5",
      },
      ul: {
        "list-style-type": "disc",
        "margin-left": "1.5em",
        "margin-bottom": "1em",
      },
      li: {
        "margin-bottom": "0.4em",
      },
      a: {
        color: "#0563c1",
        "text-decoration": "none",
      },
      "a:hover": {
        "text-decoration": "underline",
      },
      blockquote: {
        "border-left": "3px solid #eee",
        "padding-left": "1em",
        color: "#555",
        "font-style": "italic",
      },
      hr: {
        border: "none",
        "border-top": "1px solid #ddd",
        margin: "1.5em 0",
      },
      strong: {
        "font-weight": "600",
        color: "#222",
      },
      em: {
        "font-style": "italic",
        color: "#444",
      },
      table: {
        width: "100%",
        "border-collapse": "collapse",
        margin: "1em 0",
      },
      "th, td": {
        padding: "0.5em",
        border: "1px solid #ddd",
      },
      th: {
        "background-color": "#f2f2f2",
        "font-weight": "600",
        "text-align": "left",
      },
    },
  },
  creative: {
    name: "Creative",
    styles: {
      "": {
        "font-family": "'Montserrat', 'Avenir Next', sans-serif",
        color: "#333",
        "line-height": "1.6",
        "font-size": "14px",
      },
      h1: {
        "font-size": "2.4em",
        "margin-bottom": "0.5em",
        color: "#ff5252",
        "font-weight": "700",
        "text-transform": "uppercase",
        "letter-spacing": "0.05em",
      },
      h2: {
        "font-size": "1.6em",
        "margin-top": "1.5em",
        "margin-bottom": "0.6em",
        color: "#333",
        "font-weight": "600",
        "text-transform": "uppercase",
        "letter-spacing": "0.03em",
        "border-left": "4px solid #ff5252",
        "padding-left": "0.6em",
      },
      h3: {
        "font-size": "1.2em",
        "margin-top": "1em",
        "margin-bottom": "0.4em",
        color: "#444",
        "font-weight": "600",
        "letter-spacing": "0.02em",
      },
      p: {
        "font-size": "1em",
        "margin-bottom": "1em",
        "line-height": "1.6",
      },
      ul: {
        "list-style-type": "none",
        "margin-left": "0.5em",
        "margin-bottom": "1em",
      },
      li: {
        "margin-bottom": "0.5em",
        "padding-left": "1.2em",
        position: "relative",
      },
      "li:before": {
        content: "'→'",
        color: "#ff5252",
        position: "absolute",
        left: "0",
      },
      a: {
        color: "#ff5252",
        "text-decoration": "none",
        "font-weight": "500",
      },
      "a:hover": {
        "border-bottom": "1px solid #ff5252",
      },
      blockquote: {
        "border-left": "3px solid #ff5252",
        "padding-left": "1em",
        color: "#666",
        "font-style": "italic",
      },
      hr: {
        border: "none",
        "border-top": "2px dotted #eee",
        margin: "2em 0",
      },
      strong: {
        "font-weight": "600",
        color: "#222",
      },
      em: {
        "font-style": "italic",
        color: "#555",
      },
    },
  },
};
