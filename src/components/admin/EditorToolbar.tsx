"use client";

import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Link as LinkIcon,
  Image as ImageIcon, AlignLeft, AlignCenter, AlignRight,
  Undo, Redo, Table, Minus, Youtube, Highlighter,
  Subscript, Superscript, Type, Paintbrush
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

function ToolbarButton({ onClick, isActive, disabled, children, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "p-1.5 rounded-lg transition-all duration-150",
        isActive
          ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

interface EditorToolbarProps {
  editor: any;
  onImageUpload?: () => void;
}

export default function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Nhập URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addYoutubeVideo = () => {
    const url = window.prompt("Nhập URL YouTube:");
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const setHighlight = () => {
    const color = window.prompt("Nhập màu highlight (hex):", "#fef08a");
    if (color) {
      editor.chain().focus().toggleHighlight({ color }).run();
    }
  };

  const toolbarGroups = [
    // History
    [
      { icon: Undo, action: () => editor.chain().focus().undo().run(), title: "Hoàn tác" },
      { icon: Redo, action: () => editor.chain().focus().redo().run(), title: "Làm lại" },
    ],
    // Text style
    [
      { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive("bold"), title: "In đậm (Ctrl+B)" },
      { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive("italic"), title: "In nghiêng (Ctrl+I)" },
      { icon: Underline, action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive("underline"), title: "Gạch chân" },
      { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive("strike"), title: "Gạch ngang" },
    ],
    // Headings
    [
      { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive("heading", { level: 1 }), title: "Tiêu đề 1" },
      { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive("heading", { level: 2 }), title: "Tiêu đề 2" },
      { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive("heading", { level: 3 }), title: "Tiêu đề 3" },
    ],
    // Lists
    [
      { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive("bulletList"), title: "Danh sách" },
      { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive("orderedList"), title: "Danh sách số" },
    ],
    // Alignment
    [
      { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign("left").run(), isActive: editor.isActive({ textAlign: "left" }), title: "Căn trái" },
      { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign("center").run(), isActive: editor.isActive({ textAlign: "center" }), title: "Căn giữa" },
      { icon: AlignRight, action: () => editor.chain().focus().setTextAlign("right").run(), isActive: editor.isActive({ textAlign: "right" }), title: "Căn phải" },
    ],
    // Insert
    [
      { icon: LinkIcon, action: setLink, isActive: editor.isActive("link"), title: "Thêm liên kết" },
      { icon: ImageIcon, action: onImageUpload, title: "Thêm ảnh" },
      { icon: Youtube, action: addYoutubeVideo, title: "Thêm video YouTube" },
      { icon: Table, action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), title: "Thêm bảng" },
    ],
    // Special
    [
      { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive("blockquote"), title: "Trích dẫn" },
      { icon: Code, action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive("codeBlock"), title: "Code block" },
      { icon: Highlighter, action: setHighlight, isActive: editor.isActive("highlight"), title: "Đánh dấu" },
      { icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run(), title: "Đường kẻ ngang" },
    ],
    // Subscript/Superscript
    [
      { icon: Subscript, action: () => editor.chain().focus().toggleSubscript().run(), isActive: editor.isActive("subscript"), title: "Chỉ số dưới" },
      { icon: Superscript, action: () => editor.chain().focus().toggleSuperscript().run(), isActive: editor.isActive("superscript"), title: "Chỉ số trên" },
    ],
  ];

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900 p-2 flex flex-wrap gap-1">
      {toolbarGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex items-center gap-0.5">
          {group.map((item, itemIndex) => (
            <ToolbarButton
              key={itemIndex}
              onClick={item.action}
              isActive={item.isActive}
              title={item.title}
            >
              <item.icon className="w-4 h-4" />
            </ToolbarButton>
          ))}
          {groupIndex < toolbarGroups.length - 1 && (
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}
