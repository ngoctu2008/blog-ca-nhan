"use client";

import { useState, useEffect } from "react";
import { Mail, Send, Users, CheckCircle, Trash2, Eye, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: "active" | "unsubscribed" | "bounced";
  subscribed_at: string;
  last_sent_at: string | null;
}

interface NewsletterCampaign {
  id: string;
  subject: string;
  content: string;
  status: "draft" | "sending" | "sent" | "failed";
  sent_count: number;
  open_count: number;
  created_at: string;
  sent_at: string | null;
}

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"subscribers" | "campaigns">("subscribers");

  const [composeOpen, setComposeOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null; type: "subscriber" | "campaign" }>({ open: false, id: null, type: "subscriber" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, campRes] = await Promise.all([
        fetch("/api/newsletter/subscribers"),
        fetch("/api/newsletter/campaigns"),
      ]);

      if (subRes.ok) setSubscribers(await subRes.json());
      if (campRes.ok) setCampaigns(await campRes.json());
    } catch {
      toast.error("Khong the tai du lieu");
    } finally {
      setLoading(false);
    }
  };

  const handleSendCampaign = async () => {
    if (!subject.trim() || !content.trim()) {
      toast.error("Vui long nhap chu de va noi dung");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      if (response.ok) {
        toast.success("Chien dich da duoc gui!");
        setComposeOpen(false);
        setSubject("");
        setContent("");
        fetchData();
      } else {
        const data = await response.json();
        toast.error(data.error || "Gui that bai");
      }
    } catch {
      toast.error("Khong the gui chien dich");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.id) return;

    try {
      const endpoint = deleteDialog.type === "subscriber" 
        ? `/api/newsletter/subscribers/${deleteDialog.id}` 
        : `/api/newsletter/campaigns/${deleteDialog.id}`;

      const response = await fetch(endpoint, { method: "DELETE" });

      if (response.ok) {
        toast.success("Xoa thanh cong");
        fetchData();
      } else {
        toast.error("Xoa that bai");
      }
    } catch {
      toast.error("Co loi xay ra");
    } finally {
      setDeleteDialog({ open: false, id: null, type: "subscriber" });
    }
  };

  const activeSubscribers = subscribers.filter((s) => s.status === "active").length;
  const totalOpens = campaigns.reduce((sum, c) => sum + c.open_count, 0);
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent_count, 0);

  const stats = [
    { label: "Nguoi dang ky", value: subscribers.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Dang hoat dong", value: activeSubscribers, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Email da gui", value: totalSent, icon: Send, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Ty le mo", value: totalSent > 0 ? `${Math.round((totalOpens / totalSent) * 100)}%` : "0%", icon: Eye, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter</h1>
          <p className="text-gray-500 mt-1">Quan ly nguoi dang ky va gui email marketing</p>
        </div>
        <Button leftIcon={<Mail className="w-4 h-4" />} onClick={() => setComposeOpen(true)}>
          Soan email moi
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="md" className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                <Icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex gap-1">
          {[
            { id: "subscribers" as const, label: "Nguoi dang ky", count: subscribers.length },
            { id: "campaigns" as const, label: "Chien dich", count: campaigns.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
              <span className={cn(
                "ml-2 px-2 py-0.5 rounded-full text-xs",
                activeTab === tab.id ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "subscribers" && (
        <Card padding="none">
          <Table
            columns={[
              { key: "email", header: "Email" },
              { key: "name", header: "Ten", render: (s: Subscriber) => s.name || "—" },
              { key: "status", header: "Trang thai", render: (s: Subscriber) => (
                <Badge variant={s.status === "active" ? "success" : s.status === "bounced" ? "danger" : "default"} size="sm">
                  {s.status === "active" ? "Hoat dong" : s.status === "bounced" ? "Bi tra lai" : "Da huy"}
                </Badge>
              )},
              { key: "subscribed_at", header: "Ngay dang ky", render: (s: Subscriber) => new Date(s.subscribed_at).toLocaleDateString("vi-VN") },
              { key: "actions", header: "", render: (s: Subscriber) => (
                <button
                  onClick={() => setDeleteDialog({ open: true, id: s.id, type: "subscriber" })}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )},
            ]}
            data={subscribers}
            keyExtractor={(s) => s.id}
            isLoading={loading}
          />
        </Card>
      )}

      {activeTab === "campaigns" && (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} padding="md" className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{campaign.subject}</h3>
                  <Badge variant={campaign.status === "sent" ? "success" : campaign.status === "sending" ? "warning" : campaign.status === "failed" ? "danger" : "default"} size="sm">
                    {campaign.status === "sent" ? "Da gui" : campaign.status === "sending" ? "Dang gui" : campaign.status === "failed" ? "That bai" : "Ban nhap"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{campaign.content.replace(/<[^>]*>/g, "").slice(0, 150)}...</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{campaign.sent_count} da gui</span>
                  <span>{campaign.open_count} da mo</span>
                  <span>{new Date(campaign.created_at).toLocaleDateString("vi-VN")}</span>
                </div>
              </div>
              <button
                onClick={() => setDeleteDialog({ open: true, id: campaign.id, type: "campaign" })}
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Card>
          ))}
          {campaigns.length === 0 && !loading && (
            <div className="text-center py-16 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Chua co chien dich nao</p>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={composeOpen} onClose={() => setComposeOpen(false)} title="Soan email moi" size="xl">
        <div className="p-6 space-y-4">
          <Input label="Chu de" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Nhap chu de email" required />
          <Textarea label="Noi dung (HTML)" value={content} onChange={(e) => setContent(e.target.value)} rows={12} placeholder="<h1>Xin chao!</h1><p>Noi dung email...</p>" required />
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-xs text-gray-500">
            <p className="font-medium mb-1">Ho tro HTML:</p>
            <p>Ban co the su dung the HTML co ban: h1-h6, p, a, img, ul, ol, li, strong, em, v.v.</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setComposeOpen(false)}>Huy</Button>
            <Button onClick={handleSendCampaign} isLoading={isSending} leftIcon={<Send className="w-4 h-4" />}>
              Gui den {activeSubscribers} nguoi dang ky
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null, type: "subscriber" })}
        onConfirm={handleDelete}
        title="Xac nhan xoa"
        description={`Ban co chac chan muon xoa ${deleteDialog.type === "subscriber" ? "nguoi dang ky" : "chien dich"} nay?`}
        confirmText="Xoa"
      />
    </div>
  );
}
