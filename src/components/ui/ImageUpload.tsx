"use client";

import { cn } from "@/lib/utils";
import { Upload, X, ImageIcon } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { uploadImage } from "@/lib/actions";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: string;
}

export default function ImageUpload({ value, onChange, className, aspectRatio = "16/9" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to Supabase
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImage(formData);
      if (result.url) {
        onChange(result.url);
        setPreview(result.url);
      }
    } catch {
      setPreview(value);
    } finally {
      setIsUploading(false);
    }
  }, [onChange, value]);

  const handleRemove = () => {
    setPreview(undefined);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <div
            className="rounded-xl overflow-hidden bg-gray-100"
            style={{ aspectRatio }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            "w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50",
            "hover:border-primary-400 hover:bg-primary-50 transition-all duration-200",
            "flex flex-col items-center justify-center gap-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          style={{ aspectRatio }}
        >
          {isUploading ? (
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500">Nhấn để tải ảnh lên</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
