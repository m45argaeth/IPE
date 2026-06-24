"use client"

import * as React from "react"
import { Send, Shuffle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/lib/i18n"
import { randomExample } from "@/lib/packets"

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onRandom: () => void
  onClear: () => void
  hasResult: boolean
}

export function MessageInput({
  value,
  onChange,
  onSend,
  onRandom,
  onClear,
  hasResult,
}: MessageInputProps) {
  const { t } = useI18n()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSend()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.messageInput.placeholder}
          className="flex-1 font-mono"
        />
        <Button onClick={onSend} disabled={!value.trim()}>
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">{t.messageInput.send}</span>
        </Button>
        <Button variant="outline" onClick={onRandom}>
          <Shuffle className="h-4 w-4" />
          <span className="hidden sm:inline">{t.messageInput.randomMessage}</span>
        </Button>
        {hasResult && (
          <Button variant="ghost" size="icon" onClick={onClear}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
