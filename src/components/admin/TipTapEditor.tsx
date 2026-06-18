"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Youtube from "@tiptap/extension-youtube";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import EditorToolbar from "./EditorToolbar";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { uploadImage } from "@/lib/actions";
import { ImageIcon, Link as LinkIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface TipTapEditorProps {
  content?: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TipTapEditor({ content = "", onChange, placeholder = "Viết nội dung bài viết...", className }: TipTapEditorProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: {
          HTMLAttributes: {
            class: "rounded-lg bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-x-auto",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 pl-4 py-2 pr-4 rounded-r-xl italic",
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl max-w-full h-auto mx-auto",
        },
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary-600 underline hover:text-primary-700",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full border-collapse my-4",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-gray-100 dark:bg-gray-800 font-semibold text-left px-4 py-2 border border-gray-200 dark:border-gray-700",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "px-4 py-2 border border-gray-200 dark:border-gray-700",
        },
      }),
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: "rounded-xl mx-auto my-4",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert prose-lg max-w-none min-h-[400px] px-6 py-4 focus:outline-none",
          "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white",
          "prose-p:text-gray-700 dark:prose-p:text-gray-300",
          "prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline",
          "prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto",
          "prose-ul:list-disc prose-ol:list-decimal",
          "prose-blockquote:border-l-4 prose-blockquote:border-primary-500",
          "prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
          "[&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:text-gray-400 [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:pointer-events-none"
        ),
      },
    },
  });

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImage(formData);
      if (result.url) {
        setImageUrl(result.url);
        toast.success("Tải ảnh thành công!");
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch {
      toast.error("Lỗi khi tải ảnh");
    } finally {
      setIsUploading(false);
    }
  }, []);

  const insertImage = () => {
    if (!imageUrl || !editor) return;
    editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
    setImageUrl("");
    setImageAlt("");
    setImageModalOpen(false);
  };

  const insertImageByUrl = () => {
    if (!editor) return;
    setUploadMode("url");
    setImageModalOpen(true);
  };

  return (
    <div className={cn("border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800", className)}>
      <EditorToolbar editor={editor} onImageUpload={insertImageByUrl} />
      <EditorContent editor={editor} className="bg-white dark:bg-gray-800" />

      {/* Image Insert Modal */}
      <Modal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        title="Thêm ảnh"
        size="md"
      >
        <div className="p-6 space-y-4">
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setUploadMode("url")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                uploadMode === "url" ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              URL
            </button>
            <button
              type="button"
              onClick={() => setUploadMode("file")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                uploadMode === "file" ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Tải lên
            </button>
          </div>

          {uploadMode === "url" ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL ảnh</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ảnh (alt)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Mô tả ngắn về ảnh"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="editor-image-upload"
                />
                <label htmlFor="editor-image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-500">
                    {isUploading ? "Đang tải..." : "Nhấn để chọn ảnh"}
                  </span>
                </label>
              </div>
              {imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ảnh (alt)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Mô tả ngắn về ảnh"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setImageModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={insertImage} disabled={!imageUrl}>
              Thêm ảnh
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
