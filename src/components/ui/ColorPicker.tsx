"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e",
  "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e",
  "#78716c", "#1f2937",
];

export default function ColorPicker({ value = "#3b82f6", onChange, label }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(value);

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              "w-8 h-8 rounded-lg transition-all duration-200",
              value === color ? "ring-2 ring-offset-2 ring-gray-900 scale-110" : "hover:scale-105"
            )}
            style={{ backgroundColor: color }}
          />
        ))}
        <div className="flex items-center gap-2 ml-2">
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              onChange(e.target.value);
            }}
            className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
          />
          <span className="text-xs text-gray-500 font-mono">{value}</span>
        </div>
      </div>
    </div>
  );
}
