"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { createPost } from "@/lib/actions";
import { generateSlug } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Toggle from "@/components/ui/Toggle";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";

// Dynamic import TipTap to avoid SSR issues
const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center text-gray-400">
      <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      Dang tai trinh soan thao...
    </div>
  ),
});

interface Category {
  id: string;
  name: string;
}

export default function NewPostPage({ categories = [] }: { categories?: Category[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("<p>Bat dau viet bai viet cua ban...</p>");
  const [title, setTitle] = useState("");

  const categoryOptions = [
    { value: "", label: "Chon danh muc" },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Vui long nhap tieu de");
      return;
    }
    if (!content.trim() || content === "<p></p>") {
      toast.error("Vui long nhap noi dung");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("title", title);
    formData.append("slug", generateSlug(title));
    formData.append("featured", featured.toString());
    formData.append("cover_image", coverImage);
    formData.append("content", content);

    try {
      const result = await createPost(formData);
      if (result?.error) {
        toast.error(result.error);
        setIsSubmitting(false);
      }
    } catch {
      toast.error("Co loi xay ra");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Viet bai moi</h1>
        <p className="text-gray-500 mt-1">Tao bai viet moi voi trinh soan thao nang cao</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          name="title" 
          label="Tieu de" 
          required 
          placeholder="Nhap tieu de bai viet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select name="category_id" label="Danh muc" options={categoryOptions} />
          <Select name="status" label="Trang thai" options={[
            { value: "draft", label: "Ban nhap" },
            { value: "published", label: "Xuat ban ngay" },
          ]} />
        </div>

        <Textarea name="excerpt" label="Tom tat" rows={3} placeholder="Tom tat ngan ve bai viet (hien thi o trang chu)" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Anh bia</label>
          <ImageUpload value={coverImage} onChange={setCoverImage} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Noi dung</label>
          <Suspense fallback={
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center text-gray-400">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Dang tai trinh soan thao...
            </div>
          }>
            <TipTapEditor content={content} onChange={setContent} placeholder="Viet noi dung bai viet..." />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="meta_title" label="Meta Title" placeholder="Tieu de SEO" />
          <Input name="meta_description" label="Meta Description" placeholder="Mo ta SEO" />
        </div>

        <Input name="tags" label="Tags" placeholder="tag1, tag2, tag3" helperText="Phan cach bang dau phay" />

        <Toggle checked={featured} onChange={setFeatured} label="Bai viet noi bat" description="Hien thi o muc tin noi bat tren trang chu" />

        <div className="flex gap-3 pt-4 sticky bottom-0 bg-gray-50 dark:bg-gray-950 pb-4">
          <Button type="submit" isLoading={isSubmitting}>Luu bai viet</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Huy</Button>
        </div>
      </form>
    </div>
  );
}
