"use client";

import { useState, useEffect } from "react";
import { Palette, Monitor, Sun, Moon, Layout, Type, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Toggle from "@/components/ui/Toggle";
import ColorPicker from "@/components/ui/ColorPicker";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";

interface AppearanceData {
  id: string;
  theme: string;
  font_family: string;
  header_style: string;
  show_hero: boolean;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image: string | null;
  sidebar_position: string;
  show_trending: boolean;
  show_newsletter: boolean;
  custom_css: string | null;
}

export default function AppearancePage() {
  const [settings, setSettings] = useState<AppearanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings/appearance");
      if (res.ok) setSettings(await res.json());
    } catch {
      toast.error("Khong the tai cai dat");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);

    try {
      const res = await fetch("/api/settings/appearance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Luu thanh cong");
      } else {
        toast.error("Luu that bai");
      }
    } catch {
      toast.error("Co loi xay ra");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tuy chinh giao dien</h1>
        <p className="text-gray-500 mt-1">Tuy chinh mau sac, bo cuc va hien thi website</p>
      </div>

      <Card padding="lg">
        <div className="space-y-6">
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Giao dien</label>
            <div className="flex gap-3">
              {[
                { value: "light", label: "Sang", icon: Sun },
                { value: "dark", label: "Toi", icon: Moon },
                { value: "system", label: "Tu dong", icon: Monitor },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSettings({ ...settings, theme: option.value })}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                    settings.theme === option.value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <div className="pt-4 border-t border-gray-100">
            <Toggle
              checked={settings.show_hero}
              onChange={(checked) => setSettings({ ...settings, show_hero: checked })}
              label="Hien thi Hero Section"
              description="Hien thi banner lon o dau trang chu"
            />
          </div>

          {settings.show_hero && (
            <div className="space-y-4 pl-4 border-l-2 border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tieu de Hero</label>
                <input
                  type="text"
                  value={settings.hero_title || ""}
                  onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  placeholder="Chia se kien thuc giao duc"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mo ta Hero</label>
                <input
                  type="text"
                  value={settings.hero_subtitle || ""}
                  onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  placeholder="Noi ket noi cong dong giao vien"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Anh nen Hero</label>
                <ImageUpload
                  value={settings.hero_image || ""}
                  onChange={(url) => setSettings({ ...settings, hero_image: url })}
                  aspectRatio="21/9"
                />
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">Vi tri Sidebar</label>
            <div className="flex gap-3">
              {[
                { value: "left", label: "Trai" },
                { value: "right", label: "Phai" },
                { value: "none", label: "An" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSettings({ ...settings, sidebar_position: option.value })}
                  className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                    settings.sidebar_position === option.value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <Toggle
              checked={settings.show_trending}
              onChange={(checked) => setSettings({ ...settings, show_trending: checked })}
              label="Hien thi bai viet xu huong"
              description="Hien thi muc xu huong o sidebar"
            />
            <Toggle
              checked={settings.show_newsletter}
              onChange={(checked) => setSettings({ ...settings, show_newsletter: checked })}
              label="Hien thi form dang ky nhan tin"
              description="Hien thi form newsletter o sidebar"
            />
          </div>

          {/* Custom CSS */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
            <textarea
              value={settings.custom_css || ""}
              onChange={(e) => setSettings({ ...settings, custom_css: e.target.value })}
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              placeholder="/* Nhap CSS tuy chinh */"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={saving} leftIcon={<Palette className="w-4 h-4" />}>
          Luu thay doi
        </Button>
      </div>
    </div>
  );
}
