"use client"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Packet } from "@/lib/packets"

interface PacketSplitterProps {
  packets: Packet[]
}

export function PacketSplitter({ packets }: PacketSplitterProps) {
  const { t } = useI18n()

  if (packets.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.packetSplitter.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.packetSplitter.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {packets.map((pkt, i) => (
            <div
              key={pkt.id}
              className="animate-fade-up rounded-xl border bg-muted/30 p-4 font-mono"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">
                  {t.packetSplitter.header} #{pkt.seq}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {pkt.seq}/{pkt.total}
                </span>
              </div>
              <div className="rounded-lg bg-background p-3 text-center text-lg font-bold tracking-wider">
                {pkt.data}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{t.packetSplitter.seqLabel}: {pkt.seq}</span>
                <span>{t.packetSplitter.totalLabel}: {pkt.total}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
