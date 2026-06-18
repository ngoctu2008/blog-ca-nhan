"use client";

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface NewsletterFormProps {
  variant?: "inline" | "card" | "footer";
  title?: string;
  description?: string;
  className?: string;
}

export default function NewsletterForm({
  variant = "card",
  title = "Đăng ký nhận tin",
  description = "Nhận thông báo khi có bài viết mới và các thông tin giáo dục hữu ích.",
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Vui lòng nhập email hợp lệ");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        toast.success("Đăng ký thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    } catch {
      toast.error("Không thể kết nối đến server");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email của bạn"
            disabled={isSubmitting || isSuccess}
            className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none disabled:opacity-50"
          />
        </div>
        <Button type="submit" isLoading={isSubmitting} disabled={isSuccess} size="sm">
          {isSuccess ? <CheckCircle className="w-4 h-4" /> : "Đăng ký"}
        </Button>
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <h3 className="text-white font-semibold mb-4">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              disabled={isSubmitting || isSuccess}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isSuccess ? <CheckCircle className="w-4 h-4" /> : "Đăng ký"}
          </button>
        </form>
        {isSuccess && (
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Cảm ơn bạn đã đăng ký!
          </p>
        )}
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className={cn("bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white", className)}>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-primary-100 mt-1 text-sm">{description}</p>
        </div>
      </div>

      {isSuccess ? (
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
          <CheckCircle className="w-6 h-6 text-green-300 shrink-0" />
          <div>
            <p className="font-medium">Đăng ký thành công!</p>
            <p className="text-sm text-primary-200">Bạn sẽ nhận được thông báo qua email.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-white/10 border border-white/20 pl-12 pr-4 py-3.5 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none transition-all disabled:opacity-50"
            />
          </div>
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3"
          >
            Đăng ký ngay
          </Button>
          <p className="text-xs text-primary-200 text-center">
            Không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
          </p>
        </form>
      )}
    </div>
  );
}
