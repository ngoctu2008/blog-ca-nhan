"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import ColorPicker from "@/components/ui/ColorPicker";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  sort_order: number;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3b82f6",
    sort_order: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) setCategories(await res.json());
    } catch {
      toast.error("Khong the tai danh muc");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingCategory ? `/api/categories/${editingCategory.id}` : "/api/categories";
    const method = editingCategory ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingCategory ? "Cap nhat thanh cong" : "Tao moi thanh cong");
        setModalOpen(false);
        setEditingCategory(null);
        resetForm();
        fetchCategories();
      } else {
        toast.error("Co loi xay ra");
      }
    } catch {
      toast.error("Khong the luu");
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.id) return;

    try {
      const res = await fetch(`/api/categories/${deleteDialog.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Xoa thanh cong");
        fetchCategories();
      } else {
        toast.error("Xoa that bai");
      }
    } catch {
      toast.error("Co loi xay ra");
    } finally {
      setDeleteDialog({ open: false, id: null });
    }
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      color: category.color || "#3b82f6",
      sort_order: category.sort_order,
    });
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingCategory(null);
    resetForm();
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "", color: "#3b82f6", sort_order: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quan ly danh muc</h1>
          <p className="text-gray-500 mt-1">Tao va quan ly cac danh muc bai viet</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={openCreate}>
          Them danh muc
        </Button>
      </div>

      {categories.length === 0 && !loading ? (
        <EmptyState
          title="Chua co danh muc"
          description="Tao danh muc dau tien de phan loai bai viet"
          icon={<FolderOpen className="w-8 h-8" />}
          action={<Button onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>Them danh muc</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Card key={cat.id} padding="md" className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: cat.color || "#3b82f6" }}>
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                  <p className="text-xs text-gray-500">/{cat.slug}</p>
                  {cat.description && <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteDialog({ open: true, id: cat.id })} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCategory ? "Sua danh muc" : "Them danh muc"}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input label="Ten danh muc" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Input label="Slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
          <Textarea label="Mo ta" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mau sac</label>
            <ColorPicker value={formData.color} onChange={(color) => setFormData({ ...formData, color })} />
          </div>
          <Input label="Thu tu" type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Huy</Button>
            <Button type="submit">{editingCategory ? "Cap nhat" : "Tao moi"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null })}
        onConfirm={handleDelete}
        title="Xac nhan xoa"
        description="Ban co chac chan muon xoa danh muc nay? Cac bai viet thuoc danh muc se khong bi xoa."
      />
    </div>
  );
}
