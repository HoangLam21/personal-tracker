"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";

type ImageInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onImageSelect?: (file: File) => void;
};

export const ImageInput = ({
  onImageSelect,
  className,
  ...props
}: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageSelect?.(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleSelect(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleSelect(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={cn(
        "relative cursor-pointer border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center space-y-2 text-sm transition",
        dragOver ? "border-indigo-600 bg-indigo-50" : "border-gray-300",
        className
      )}
    >
      {preview ? (
        <div className="relative w-full">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg max-h-48 object-contain mx-auto"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <UploadCloud className="w-8 h-8 text-indigo-600" />
          <span className="text-indigo-600 font-medium">Chọn hoặc kéo ảnh vào đây</span>
          <span className="text-gray-400 text-xs">Hỗ trợ JPG, PNG, WEBP</span>
        </>
      )}
      <input
        {...props}
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
};
