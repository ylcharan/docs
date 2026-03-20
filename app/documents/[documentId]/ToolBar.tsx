"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  Bold,
  ChevronDownIcon,
  Italic,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheck2Icon,
  Underline,
  Undo2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Level } from "@tiptap/extension-heading";

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const heading = [
    { label: "Normal Text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  const currentHeadingLevel = () => {
    for (let level = 0; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex min-w-7 shrink-0 h-7 items-center gap-x-2 px-2 py-1 justify-center rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <span className="truncate">{currentHeadingLevel()}</span>
          <ChevronDownIcon size={16} className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {heading.map(({ label, value, fontSize }) => (
          <button
            key={label}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 justify-center rounded-sm hover:bg-neutral-200/80",
              ((value === 0 && editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: value })) &&
                "bg-neutral-200/80",
            )}
          >
            <span style={{ fontSize }} className="text-sm">
              {label}
            </span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fontFamilies = [
    { label: "Sans", value: "sans-serif" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "monospace" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex w-[120px] shrink-0 h-7 items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon size={16} className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fontFamilies.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 justify-center rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80",
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80",
      )}
    >
      {Icon && <Icon size={16} />}
    </button>
  );
};

const ToolBar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck2Icon,
        onClick: () => {
          const curr = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            curr === "false" ? "true" : "false",
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: Bold,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: Italic,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: Underline,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {
          console.log("Comment button clicked");
        },
        isActive: false,
      },
      {
        label: "List Todo Icon",
        icon: ListTodoIcon,
        onClick: () => {
          console.log("List Todo Icon button clicked");
        },
        isActive: editor?.isActive("taskItem"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="w-full bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((section) => (
        <ToolBarButton
          key={section.label}
          onClick={section.onClick}
          isActive={section.isActive}
          icon={section.icon}
        />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((section) => (
        <ToolBarButton key={section.label} {...section} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((section) => (
        <ToolBarButton key={section.label} {...section} />
      ))}
    </div>
  );
};
export default ToolBar;
