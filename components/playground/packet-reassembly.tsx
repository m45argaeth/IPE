"use client"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Packet } from "@/lib/packets"

interface PacketReassemblyProps {
  originalMessage: string
  receivedPackets: Packet[]
  totalPackets: number
}

export function PacketReassembly({
  originalMessage,
  receivedPackets,
  totalPackets,
}: PacketReassemblyProps) {
  const { t } = useI18n()

  if (receivedPackets.length === 0) return null

  const isComplete = receivedPackets.length === totalPackets
  const reassembled = receivedPackets
    .sort((a, b) => a.seq - b.seq)
    .map((p) => p.data)
    .join("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.packetReassembly.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.packetReassembly.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Original message */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{t.packetReassembly.originalMessage}</span>
              <Badge variant="secondary">Original</Badge>
            </div>
            <div className="rounded-lg bg-background p-3 text-center font-mono text-lg font-bold tracking-wider">
              {originalMessage}
            </div>
          </div>

          {/* Reassembly visualization */}
          <div className="flex items-center justify-center gap-2">
            {receivedPackets
              .sort((a, b) => a.seq - b.seq)
              .map((pkt, i) => (
                <div
                  key={pkt.id}
                  className="animate-packet-receive rounded-lg border bg-blue-50 px-3 py-2 font-mono text-sm font-bold dark:bg-blue-950"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {pkt.data}
                </div>
              ))}
          </div>

          {/* Result */}
          <div className={`rounded-xl border p-4 ${isComplete ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{t.packetReassembly.reassembled}</span>
              {isComplete ? (
                <Badge className="bg-green-600">{t.packetReassembly.complete}</Badge>
              ) : (
                <Badge variant="destructive">{t.packetReassembly.missing}</Badge>
              )}
            </div>
            <div className="rounded-lg bg-background p-3 text-center font-mono text-lg font-bold tracking-wider">
              {reassembled}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
