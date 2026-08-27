//src/components/ui/dropdown-select.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function DropdownSelect({
  options,
  value,
  onChange,
  className = "",
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="group flex w-full h-11 items-center justify-between rounded-md border border-neutral-300 bg-white px-4 text-sm text-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#98002e]/20 focus:border-[#98002e] cursor-pointer"
      >
        <span className="font-medium">{selected?.label}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        role="listbox"
        className={`absolute left-0 right-0 z-20 mt-2 origin-top overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/95 shadow-xl shadow-neutral-900/10 backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="flex flex-col p-2">
          {options.map((option, idx) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(option.value)}
                style={{ transitionDelay: isOpen ? `${idx * 30}ms` : "0ms" }}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#5f2167]/[0.06] to-[#98002e]/[0.06] text-fluid-gradient"
                    : "text-neutral-700 hover:bg-slate-50"
                }`}
              >
                <span>{option.label}</span>
                {isActive && (
                  <svg
                    className="h-4 w-4 shrink-0 text-[#98002e]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}