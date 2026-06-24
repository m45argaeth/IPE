/**
 * Core packet logic for the Internet Packet Explorer.
 * Simulates how messages are split into packets, travel through
 * the network, and are reassembled at the destination.
 */

export interface Packet {
  seq: number
  total: number
  data: string
  id: string
}

export interface RouterNode {
  id: string
  name: string
  type: "sender" | "router" | "receiver"
}

export interface NetworkPath {
  nodes: RouterNode[]
  hops: number
}

export interface SimulationResult {
  packets: Packet[]
  path: NetworkPath
  deliveredPackets: Packet[]
  lostPackets: Packet[]
}

/** Split a message into packets. Each packet gets a sequence number. */
export function splitMessage(message: string, maxPacketSize: number = 6): Packet[] {
  const trimmed = message.toUpperCase().trim()
  if (!trimmed) return []

  const chunks: string[] = []
  for (let i = 0; i < trimmed.length; i += maxPacketSize) {
    chunks.push(trimmed.slice(i, i + maxPacketSize))
  }

  return chunks.map((data, index) => ({
    seq: index + 1,
    total: chunks.length,
    data,
    id: `pkt-${index + 1}-${Date.now()}`,
  }))
}

/** Simulate a network journey through router nodes. */
export function simulateNetworkJourney(): NetworkPath {
  const routerPool: RouterNode[] = [
    { id: "r1", name: "ISP Gateway", type: "router" },
    { id: "r2", name: "Core Router", type: "router" },
    { id: "r3", name: "Exchange Point", type: "router" },
    { id: "r4", name: "Backbone Node", type: "router" },
    { id: "r5", name: "Edge Router", type: "router" },
    { id: "r6", name: "CDN Node", type: "router" },
  ]

  // Randomly pick 3-4 intermediate routers
  const numRouters = 3 + Math.floor(Math.random() * 2)
  const shuffled = [...routerPool].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, numRouters)

  return {
    nodes: [
      { id: "sender", name: "Your Device", type: "sender" },
      ...selected,
      { id: "receiver", name: "Server", type: "receiver" },
    ],
    hops: numRouters + 1,
  }
}

/** Simulate packet loss — randomly drops some packets. */
export function simulatePacketLoss(
  packets: Packet[],
  lossRate: number = 0.3,
): { delivered: Packet[]; lost: Packet[] } {
  const delivered: Packet[] = []
  const lost: Packet[] = []

  for (const pkt of packets) {
    if (Math.random() < lossRate) {
      lost.push(pkt)
    } else {
      delivered.push(pkt)
    }
  }

  // If all were lost, keep at least the first one
  if (delivered.length === 0 && packets.length > 0) {
    delivered.push(packets[0])
    lost.splice(lost.indexOf(packets[0]), 1)
  }

  return { delivered, lost }
}

/** Reassemble packets back into the original message. */
export function reassemble(packets: Packet[]): string {
  return packets
    .sort((a, b) => a.seq - b.seq)
    .map((p) => p.data)
    .join("")
}

/** Preset messages for demonstration. */
export const PRESET_MESSAGES: Array<{ label: string; message: string }> = [
  { label: "Simple Greeting", message: "HELLO WORLD" },
  { label: "HTTP Request", message: "GET /api/data HTTP/1.1" },
  { label: "TCP Handshake", message: "SYN-ACK-CONNECT" },
  { label: "DNS Query", message: "RESOLVE example.com" },
  { label: "Email Header", message: "FROM:alice TO:bob SUBJECT:HI" },
  { label: "JSON Payload", message: '{"msg":"ping","ts":1234}' },
]

/** Get a random preset message. */
export function randomExample(): string {
  const idx = Math.floor(Math.random() * PRESET_MESSAGES.length)
  return PRESET_MESSAGES[idx].message
}
