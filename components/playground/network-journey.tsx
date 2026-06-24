"use client"

import * as React from "react"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Packet, NetworkPath } from "@/lib/packets"

interface NetworkJourneyProps {
  packets: Packet[]
  path: NetworkPath
  isAnimating: boolean
  lostPackets: Packet[]
}

export function NetworkJourney({
  packets,
  path,
  isAnimating,
  lostPackets,
}: NetworkJourneyProps) {
  const { t } = useI18n()
  const [activePacket, setActivePacket] = React.useState<number>(-1)
  const [currentHop, setCurrentHop] = React.useState<number>(0)

  React.useEffect(() => {
    if (!isAnimating || packets.length === 0) {
      setActivePacket(-1)
      setCurrentHop(0)
      return
    }

    let pktIdx = 0
    let hopIdx = 0

    const interval = setInterval(() => {
      if (pktIdx >= packets.length) {
        clearInterval(interval)
        setActivePacket(-1)
        return
      }

      setActivePacket(pktIdx)
      setCurrentHop(hopIdx)

      hopIdx++
      if (hopIdx >= path.nodes.length) {
        hopIdx = 0
        pktIdx++
      }
    }, 400)

    return () => clearInterval(interval)
  }, [isAnimating, packets, path.nodes.length])

  if (packets.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.networkJourney.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.networkJourney.subtitle}</p>
      </CardHeader>
      <CardContent>
        {/* Router path visualization */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {path.nodes.map((node, i) => (
            <React.Fragment key={node.id}>
              <div
                className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-2 text-center transition-all ${
                  i === currentHop && isAnimating
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950 animate-pulse-glow"
                    : "bg-muted/30"
                } ${node.type === "sender" ? "border-green-500 bg-green-50 dark:bg-green-950" : ""} ${node.type === "receiver" ? "border-purple-500 bg-purple-50 dark:bg-purple-950" : ""}`}
              >
                <span className="text-lg">
                  {node.type === "sender" ? "📱" : node.type === "receiver" ? "🖥️" : "🔀"}
                </span>
                <span className="text-xs font-medium">{node.name}</span>
              </div>
              {i < path.nodes.length - 1 && (
                <span className="text-muted-foreground">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Packet travel visualization */}
        <div className="space-y-2">
          {packets.map((pkt, i) => {
            const isLost = lostPackets.some((lp) => lp.id === pkt.id)
            const isActive = activePacket === i
            const progress = isActive
              ? Math.min(100, (currentHop / (path.nodes.length - 1)) * 100)
              : isLost ? 100 : 0

            return (
              <div
                key={pkt.id}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                  isLost
                    ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950 opacity-60"
                    : isActive
                      ? "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
                      : "bg-muted/20"
                }`}
              >
                <Badge variant="secondary" className={`shrink-0 ${isLost ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" : ""}`}>
                  #{pkt.seq}
                </Badge>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isLost ? "bg-red-400" : "bg-blue-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-xs font-mono text-muted-foreground">
                  {pkt.data}
                </span>
                {isLost && (
                  <span className="text-xs text-red-500">✕</span>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
