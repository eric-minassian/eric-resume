import { createSignal, JSX, Show } from "solid-js";
import { MarkdownEditor } from "~/components/markdown-editor";
import { Button } from "~/components/ui/button";
import { SelectField } from "~/components/ui/select-field";
import { renderResume } from "~/lib/resume-renderer";
import { templates } from "~/lib/templates/resume-templates";
import type { PrintMode } from "~/types";

// Import CSS for the editor and resume styling
import "~/components/markdown-editor/editor.css";

/**
 * Default demo markdown for the resume editor
 */
const DEFAULT_RESUME_MARKDOWN = `# John Doe

<div align="center">john.doe@example.com | (123) 456-7890 | [LinkedIn](https://linkedin.com/in/johndoe)</div>

---

## Summary
Experienced software engineer with a background in developing scalable web applications and a passion for problem solving.

## Experience

### Senior Software Engineer
**Tech Corp Inc.** — *Jan 2018 - Present*
- Developed high-performance web applications using modern frameworks.
- Led a team of developers to implement agile methodologies.
- Improved system performance by 25% through code optimization.

### Software Engineer
**Web Solutions LLC** — *Jun 2015 - Dec 2017*
- Designed and implemented responsive web interfaces.
- Collaborated with cross-functional teams to define project requirements.

## Education

### Bachelor of Science in Computer Science
**University of Technology** — *2011 - 2015*
- Graduated with honors, specialized in software development.

## Skills
- JavaScript, TypeScript, Python
- React, Angular, Vue
- Node.js, Express, MongoDB

## Projects
### Portfolio Website
- Created a personal portfolio website to showcase projects and skills.
`;

export default function Home() {
  // State for the resume editor
  const [markdown, setMarkdown] = createSignal<string>(DEFAULT_RESUME_MARKDOWN);
  const [selectedTemplate, setSelectedTemplate] =
    createSignal<string>("modern");
  const [printMode, setPrintMode] = createSignal<PrintMode>("single");
  const [isPrinting, setIsPrinting] = createSignal<boolean>(false);
  const [pageSize, setPageSize] = createSignal<"a4" | "letter">("a4");

  // Create template options for the dropdown
  const templateOptions = () =>
    Object.entries(templates).map(([value, template]) => ({
      value,
      label: template.name,
    }));

  // Create print mode options for the dropdown
  const printModeOptions = [
    { value: "single", label: "Single Page" },
    { value: "paged", label: "Multiple Pages" },
  ];

  // Create paper size options for the dropdown
  const pageSizeOptions = [
    { value: "a4", label: "A4" },
    { value: "letter", label: "US Letter" },
  ];

  // Generate the HTML output for the resume
  const htmlOutput = () => {
    const template = templates[selectedTemplate()];
    return renderResume(markdown(), template, printMode());
  };

  // Handle the print action
  const handlePrint: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
    e.preventDefault();
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  // TypeScript-safe event handlers for select fields
  const handleTemplateChange: JSX.EventHandler<HTMLSelectElement, Event> = (
    e
  ) => {
    const target = e.currentTarget as HTMLSelectElement;
    setSelectedTemplate(target.value);
  };

  const handlePrintModeChange: JSX.EventHandler<HTMLSelectElement, Event> = (
    e
  ) => {
    const target = e.currentTarget as HTMLSelectElement;
    setPrintMode(target.value as PrintMode);
  };

  const handlePageSizeChange: JSX.EventHandler<HTMLSelectElement, Event> = (
    e
  ) => {
    const target = e.currentTarget as HTMLSelectElement;
    setPageSize(target.value as "a4" | "letter");
  };

  // Handle markdown updates
  const handleMarkdownUpdate = (value: string) => {
    setMarkdown(value);
  };

  return (
    <main class="flex flex-col h-screen">
      {/* Header with controls */}
      <div
        id="app-header"
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b bg-background"
      >
        <h1 class="text-2xl font-bold mb-3 sm:mb-0">EricResume</h1>
        <div class="flex flex-wrap gap-4 items-end w-full sm:w-auto">
          <SelectField
            label="Template"
            value={selectedTemplate()}
            options={templateOptions()}
            onChange={handleTemplateChange}
            class="min-w-[150px]"
          />
          <SelectField
            label="Print Mode"
            value={printMode()}
            options={printModeOptions}
            onChange={handlePrintModeChange}
            class="min-w-[150px]"
          />
          <SelectField
            label="Paper Size"
            value={pageSize()}
            options={pageSizeOptions}
            onChange={handlePageSizeChange}
            class="min-w-[150px]"
          />
          <Button onClick={handlePrint} variant="default" class="mb-0.5">
            Print Resume
          </Button>
        </div>
      </div>

      {/* Content area */}
      <div class="flex flex-1 overflow-hidden">
        {/* Show regular editor view if not printing */}
        <Show when={!isPrinting()}>
          <div class="w-1/2 border-r flex flex-col editor-section">
            <div class="p-2 border-b">
              <h2 class="font-semibold">Markdown Editor</h2>
            </div>
            <MarkdownEditor
              initialValue={DEFAULT_RESUME_MARKDOWN}
              onInput={handleMarkdownUpdate}
            />
          </div>

          <div class="w-1/2 flex flex-col">
            <div class="p-2 border-b">
              <h2 class="font-semibold">Resume Preview</h2>
            </div>
            <div class="flex-1 overflow-auto p-4">
              <div innerHTML={htmlOutput()} />
            </div>
          </div>
        </Show>

        {/* Show only the resume when printing */}
        <Show when={isPrinting()}>
          <div class="w-full h-full">
            <div innerHTML={htmlOutput()} />
          </div>
        </Show>
      </div>
    </main>
  );
}
