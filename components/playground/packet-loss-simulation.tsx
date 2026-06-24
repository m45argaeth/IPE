"use client"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PacketLossSimulationProps {
  isLossMode: boolean
  onToggle: (loss: boolean) => void
  deliveredCount: number
  lostCount: number
  totalCount: number
}

export function PacketLossSimulation({
  isLossMode,
  onToggle,
  deliveredCount,
  lostCount,
  totalCount,
}: PacketLossSimulationProps) {
  const { t } = useI18n()

  if (totalCount === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.packetLoss.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.packetLoss.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggle(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !isLossMode
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.packetLoss.normal}
            </button>
            <button
              onClick={() => onToggle(true)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isLossMode
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.packetLoss.packetLoss}
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600">{deliveredCount}</Badge>
              <span className="text-sm text-muted-foreground">{t.packetLoss.delivered}</span>
            </div>
            {lostCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="destructive">{lostCount}</Badge>
                <span className="text-sm text-muted-foreground">{t.packetLoss.lost}</span>
              </div>
            )}
          </div>

          {/* Loss rate visualization */}
          {totalCount > 0 && (
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(deliveredCount / totalCount) * 100}%` }}
              />
              {lostCount > 0 && (
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{ width: `${(lostCount / totalCount) * 100}%`, marginTop: "-12px" }}
                />
              )}
            </div>
          )}

          {/* Explanation */}
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t.packetLoss.explanation}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
