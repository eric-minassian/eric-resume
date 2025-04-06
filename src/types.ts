import type { JSX } from "solid-js";

/**
 * Types for the resume application
 */

/**
 * Resume template definition
 */
export interface ResumeTemplate {
  /** Name of the template */
  name: string;
  /** CSS styles for different HTML elements */
  styles: Record<string, JSX.CSSProperties>;
}

/**
 * Print mode options for the resume
 */
export type PrintMode = "single" | "paged";
