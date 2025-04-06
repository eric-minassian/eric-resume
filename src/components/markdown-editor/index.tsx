import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.min.css";
import { Component, createSignal, onMount } from "solid-js";

interface MarkdownEditorProps {
  initialValue: string;
  onInput: (value: string) => void;
  class?: string;
}

/**
 * A syntax-highlighted Markdown editor component
 */
export const MarkdownEditor: Component<MarkdownEditorProps> = (props) => {
  let textareaRef: HTMLTextAreaElement | undefined;
  let highlightRef: HTMLPreElement | undefined;
  const [content, setContent] = createSignal(props.initialValue);

  // Synchronize the textarea and highlighted content
  const syncScroll = () => {
    if (textareaRef && highlightRef) {
      highlightRef.scrollTop = textareaRef.scrollTop;
      highlightRef.scrollLeft = textareaRef.scrollLeft;
    }
  };

  // Handle input in the textarea
  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    setContent(value);
    props.onInput(value);

    if (highlightRef) {
      // Update the highlighted content
      highlightRef.innerHTML = Prism.highlight(
        value,
        Prism.languages.markdown,
        "markdown"
      );
    }
  };

  // Set up the component on mount
  onMount(() => {
    if (textareaRef && highlightRef) {
      // Set initial content
      textareaRef.value = props.initialValue;
      highlightRef.innerHTML = Prism.highlight(
        props.initialValue,
        Prism.languages.markdown,
        "markdown"
      );

      // Set up tab handling
      textareaRef.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          const start = textareaRef.selectionStart;
          const end = textareaRef.selectionEnd;

          // Insert tab at cursor
          textareaRef.value =
            textareaRef.value.substring(0, start) +
            "  " +
            textareaRef.value.substring(end);

          // Put cursor after the inserted tab
          textareaRef.selectionStart = textareaRef.selectionEnd = start + 2;

          // Trigger input event manually
          const event = new Event("input", { bubbles: true });
          textareaRef.dispatchEvent(event);
        }
      });
    }
  });

  return (
    <div class={`relative flex-1 font-mono text-sm ${props.class || ""}`}>
      <pre
        ref={highlightRef}
        class="absolute top-0 left-0 right-0 bottom-0 p-4 m-0 bg-transparent pointer-events-none overflow-auto whitespace-pre-wrap break-words text-inherit"
        aria-hidden="true"
      ></pre>
      <textarea
        ref={textareaRef}
        class="absolute top-0 left-0 right-0 bottom-0 w-full h-full p-4 m-0 bg-transparent resize-none outline-none caret-black dark:caret-white text-transparent"
        spellcheck={false}
        onInput={handleInput}
        onScroll={syncScroll}
      ></textarea>
    </div>
  );
};
