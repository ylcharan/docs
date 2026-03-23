"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { ListKit } from "@tiptap/extension-list";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import { ImageResize } from "tiptap-extension-resize-image";
import { useEditorStore } from "@/store/useEditorStore";
import {
  TextStyle,
  FontFamily,
  Color,
  TextStyleKit,
  LineHeight,
} from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Ruler from "./Ruler";

export const Editor = () => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px !important;",
        class:
          "focus:outline-none print:border-0 bg-white border-[#c7c7c7] border-1 flex flex-col min-h-[1050px] w-204 pt-10 pr-14 pb-10 cursor-text tiptap",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      ListKit,
      TableKit,
      ImageResize,
      Image,
      TextStyleKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Color,
      LineHeight,
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
  });
  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible w-max">
      <Ruler />
      <div className="min-w-max flex justify-center w-204 py-4 print:py-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
