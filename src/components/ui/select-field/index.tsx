import { Component, For, JSX } from "solid-js";
import { cn } from "~/lib/utils";
import { Label } from "../label";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: Option[];
  onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event>;
  class?: string;
}

/**
 * A reusable select field component with label
 */
export const SelectField: Component<SelectFieldProps> = (props) => {
  return (
    <div class={cn("flex flex-col", props.class)}>
      <Label class="mb-1">{props.label}</Label>
      <select
        value={props.value}
        onChange={props.onChange}
        class="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm 
              ring-offset-background focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <For each={props.options}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
    </div>
  );
};
