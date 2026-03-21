"use client";

import { type ColorResult, SketchPicker } from "react-color";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  Italic,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheck2Icon,
  SpellCheckIcon,
  Underline,
  Undo2Icon,
  Upload,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Level } from "@tiptap/extension-heading";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const curFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(curFontSize);
  const [inputVal, setInputVal] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputVal(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputVal);
  };

  const handleKeyDow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputVal);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize <= 0) return;
    updateFontSize(newSize.toString());
  };

  return (
    <div className="flex items-center gap-x-1">
      <button
        onClick={decrement}
        className="h-4 shrink-0 flex flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>

      {isEditing ? (
        <input
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDow}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(curFontSize);
          }}
          className={cn(
            "h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <span className="truncate">{fontSize}</span>
        </button>
      )}
      <button
        onClick={increment}
        className="h-4 shrink-0 flex flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const options = [
    { label: "Normal", value: null },
    { label: "1", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "2", value: "2" },
  ];

  const currentLineHeight =
    editor?.getAttributes("textStyle").lineHeight || null;
  const selectedOption =
    options.find((option) => option.value === currentLineHeight) || options[0];

  const handleSelect = (value: string | null) => {
    if (!editor) return;

    const chain = editor.chain().focus();

    if (value) {
      chain.setLineHeight(value).run();
      return;
    }

    chain.unsetLineHeight().run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex w-34 shrink-0 h-7 items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <span className="truncate">Line {selectedOption.label}</span>
          <ChevronDownIcon size={16} className="size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {options.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => handleSelect(value)}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 justify-center rounded-sm hover:bg-neutral-200/80",
              selectedOption.value === value && "bg-neutral-200/80",
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onclick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Order List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onclick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex shrink-0 h-7 flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 w-full">
        {lists.map(({ label, icon: Icon, isActive, onclick }) => (
          <button
            key={label}
            onClick={onclick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 justify-center rounded-sm hover:bg-neutral-200/80",
              isActive() && "bg-neutral-200/80",
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const upload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imgUrl = URL.createObjectURL(file);
        onChange(imgUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    onChange(imageUrl);
    setImageUrl("");
    setIsDialogOpen(false);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex shrink-0 h-7 flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
            )}
          >
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex flex-col gap-x-2 w-max items-start">
          <DropdownMenuItem onSelect={upload} className="w-full">
            <Upload className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image by URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleImageUrlSubmit();
              }
            }}
          ></Input>
          <DialogFooter>
            <Button type="button" onSelect={handleImageUrlSubmit}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();

  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  console.log(editor?.getAttributes("link").href);

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(e) => {
        if (e) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex shrink-0 h-7 flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 w-[240px]">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex shrink-0 h-7 flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 w-full">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={label}
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .setTextAlign(value as "left" | "center" | "right" | "justify")
                .run()
            }
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 justify-center rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80",
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#000000";

  const onClick = (color: ColorResult) => {
    editor?.chain().focus().toggleHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex shrink-0 h-7 flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-full">
        <SketchPicker onChange={onClick} color={value} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex shrink-0 h-7 flex-col items-center gap-x-2 px-2 py-1 justify-between rounded-sm hover:bg-neutral-200/80",
          )}
        >
          <SpellCheck2Icon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-full">
        <SketchPicker color={value} onChangeComplete={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
        icon: SpellCheckIcon,
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
    <div className="w-full bg-[#f1f4f9] px-2.5 py-1 rounded-[24px] min-h-[40px] flex items-center! justify-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((section) => (
        <ToolBarButton
          key={section.label}
          onClick={section.onClick}
          isActive={section.isActive}
          icon={section.icon}
        />
      ))}
      <Separator orientation="vertical" className="bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation="vertical" className="bg-neutral-300" />
      <LineHeightButton />
      <Separator orientation="vertical" className="bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />
      <Separator orientation="vertical" className="bg-neutral-300" />
      {sections[1].map((section) => (
        <ToolBarButton key={section.label} {...section} />
      ))}
      <TextColorButton />
      <HighlightButton />
      <Separator orientation="vertical" className="bg-neutral-300" />
      {sections[2].map((section) => (
        <ToolBarButton key={section.label} {...section} />
      ))}
    </div>
  );
};
export default ToolBar;
