"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { useI18n } from "@/lib/i18n"
import {
  splitMessage,
  simulateNetworkJourney,
  simulatePacketLoss,
  randomExample,
  type Packet,
  type NetworkPath,
} from "@/lib/packets"
import { PlaygroundIntro } from "@/components/playground/playground-intro"
import { MessageInput } from "@/components/playground/message-input"
import { PacketSplitter } from "@/components/playground/packet-splitter"
import { NetworkJourney } from "@/components/playground/network-journey"
import { PacketReassembly } from "@/components/playground/packet-reassembly"
import { PacketLossSimulation } from "@/components/playground/packet-loss-simulation"
import { EducationalInsights } from "@/components/playground/educational-insights"
import { ShareFeatures } from "@/components/playground/share-features"

export function PlaygroundInner() {
  const { t } = useI18n()
  const searchParams = useSearchParams()

  const [message, setMessage] = React.useState("")
  const [activeMessage, setActiveMessage] = React.useState<string | null>(null)
  const [packets, setPackets] = React.useState<Packet[]>([])
  const [path, setPath] = React.useState<NetworkPath | null>(null)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isLossMode, setIsLossMode] = React.useState(false)
  const [deliveredPackets, setDeliveredPackets] = React.useState<Packet[]>([])
  const [lostPackets, setLostPackets] = React.useState<Packet[]>([])

  React.useEffect(() => {
    const urlMsg = searchParams.get("msg")
    if (urlMsg) {
      const decoded = decodeURIComponent(urlMsg)
      setMessage(decoded)
      setActiveMessage(decoded)
    }
  }, [searchParams])

  const handleSend = React.useCallback(() => {
    const trimmed = message.trim().toUpperCase()
    if (!trimmed) return

    const newPackets = splitMessage(trimmed)
    const newPath = simulateNetworkJourney()

    setActiveMessage(trimmed)
    setPackets(newPackets)
    setPath(newPath)
    setIsAnimating(true)
    setDeliveredPackets([])
    setLostPackets([])

    // Simulate delivery
    const { delivered, lost } = simulatePacketLoss(newPackets, isLossMode ? 0.3 : 0)

    // Animate packets one by one
    let idx = 0
    const interval = setInterval(() => {
      if (idx >= newPackets.length) {
        clearInterval(interval)
        setIsAnimating(false)
        return
      }

      const pkt = newPackets[idx]
      const isLost = lost.some((lp) => lp.id === pkt.id)

      if (isLost) {
        setLostPackets((prev) => [...prev, pkt])
      } else {
        setDeliveredPackets((prev) => [...prev, pkt])
      }

      idx++
    }, 400)
  }, [message, isLossMode])

  const handleRandom = React.useCallback(() => {
    const msg = randomExample()
    setMessage(msg)
  }, [])

  const handleClear = React.useCallback(() => {
    setMessage("")
    setActiveMessage(null)
    setPackets([])
    setPath(null)
    setIsAnimating(false)
    setDeliveredPackets([])
    setLostPackets([])
    setIsLossMode(false)
  }, [])

  const handleToggleLoss = React.useCallback(
    (loss: boolean) => {
      setIsLossMode(loss)
      if (activeMessage && packets.length > 0) {
        // Re-simulate with new mode
        const { delivered, lost } = simulatePacketLoss(packets, loss ? 0.3 : 0)
        setDeliveredPackets(delivered)
        setLostPackets(lost)
        setIsAnimating(true)

        let idx = 0
        const interval = setInterval(() => {
          if (idx >= packets.length) {
            clearInterval(interval)
            setIsAnimating(false)
            return
          }
          idx++
        }, 400)
      }
    },
    [activeMessage, packets],
  )

  const hasResult = activeMessage !== null

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.playground.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{t.playground.subtitle}</p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl space-y-8">
        <PlaygroundIntro />

        <MessageInput
          value={message}
          onChange={setMessage}
          onSend={handleSend}
          onRandom={handleRandom}
          onClear={handleClear}
          hasResult={hasResult}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            {t.playground.title}
          </h2>
          <ShareFeatures message={activeMessage} />
        </div>

        {packets.length > 0 && (
          <>
            <PacketSplitter packets={packets} />

            {path && (
              <NetworkJourney
                packets={packets}
                path={path}
                isAnimating={isAnimating}
                lostPackets={lostPackets}
              />
            )}

            <PacketLossSimulation
              isLossMode={isLossMode}
              onToggle={handleToggleLoss}
              deliveredCount={deliveredPackets.length}
              lostCount={lostPackets.length}
              totalCount={packets.length}
            />

            {deliveredPackets.length > 0 && (
              <PacketReassembly
                originalMessage={activeMessage || ""}
                receivedPackets={deliveredPackets}
                totalPackets={packets.length}
              />
            )}
          </>
        )}

        <EducationalInsights />
      </div>
    </>
  )
}
