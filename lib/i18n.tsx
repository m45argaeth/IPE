"use client"

import * as React from "react"

export type Locale = "id" | "en"
export const LOCALES: Locale[] = ["id", "en"]
export const DEFAULT_LOCALE: Locale = "id"
const STORAGE_KEY = "ipe-locale"

/* ------------------------------------------------------------------ */
/*  English dictionary                                                 */
/* ------------------------------------------------------------------ */

const en = {
  header: { playground: "Playground", tryNow: "Try Now" },
  hero: {
    badge: "An educational playground for how messages travel across the internet",
    title: "Internet Packet Explorer",
    subtitle:
      "Discover how your messages are split into packets, travel through routers, and reassemble at their destination — all visualized in your browser.",
    tryNow: "Try Now",
    randomExample: "Random Message",
    mono: "Your message doesn't travel as one piece. It becomes packets.",
  },
  features: {
    heading: "Messages are packets in a sea of routers.",
    subtitle:
      "Every message you send gets chopped into packets, each carrying a piece of the puzzle. They travel different paths and reunite at the destination.",
    packetSplit: {
      title: "Packet Splitting",
      formula: "message → [pkt1, pkt2, pkt3, ...]",
      body: "See how a single message is broken into smaller packets, each with a sequence number so they can be reassembled in order.",
    },
    networkJourney: {
      title: "Network Journey",
      formula: "sender → router₁ → router₂ → ... → server",
      body: "Watch packets travel through multiple routers. Each hop brings them closer to their destination, just like the real internet.",
    },
    reassembly: {
      title: "Reassembly",
      formula: "packets → sort by seq → original message",
      body: "At the destination, packets are sorted by their sequence numbers and combined back into the original message.",
    },
  },
  how: {
    heading: "How it works",
    subtitle: "Three steps, entirely in your browser.",
    steps: [
      {
        title: "1. Type a message",
        body: "Enter any text — from a simple greeting to an HTTP request. This represents the data you want to send.",
      },
      {
        title: "2. We split it into packets",
        body: "Your message is divided into smaller chunks called packets. Each packet gets a sequence number for reassembly.",
      },
      {
        title: "3. Watch the journey",
        body: "See packets travel through routers, optionally lose some along the way, and reassemble at the destination.",
      },
    ],
  },
  cta: {
    heading: "Ready to explore how the internet works?",
    subtitle:
      "No sign-up, no server calls. Just you, your curiosity, and the fascinating world of network packets.",
    button: "Open the Playground",
  },
  playground: {
    title: "The Playground",
    subtitle:
      "Type a message and watch it split into packets, travel through the network, and reassemble. Everything runs locally in your browser.",
    intro: {
      title: "Welcome to Internet Packet Explorer",
      body: "This playground lets you explore how data travels across the internet as packets. Type a message below, or click 'Random Message' to get started.",
    },
  },
  messageInput: {
    placeholder: "Type a message (e.g. HELLO WORLD)…",
    send: "Send",
    randomMessage: "Random Message",
    clear: "Clear",
  },
  packetSplitter: {
    title: "Packet Splitting",
    subtitle: "Your message, broken into packets:",
    header: "Packet",
    seqLabel: "Seq",
    totalLabel: "Total",
    dataLabel: "Data",
  },
  networkJourney: {
    title: "Network Journey",
    subtitle: "Packets traveling through the network:",
    yourDevice: "Your Device",
    server: "Server",
    hop: "hop",
  },
  packetReassembly: {
    title: "Reassembly",
    subtitle: "Packets combined back into the original message:",
    originalMessage: "Original message",
    reassembled: "Reassembled",
    missing: "Missing packets — message incomplete!",
    complete: "All packets received — message complete!",
  },
  packetLoss: {
    title: "Packet Loss Simulation",
    subtitle: "Toggle between normal delivery and packet loss:",
    normal: "Normal",
    packetLoss: "Packet Loss",
    delivered: "delivered",
    lost: "lost",
    explanation: "In real networks, packets can be lost due to congestion, errors, or timeouts. TCP retransmits lost packets.",
  },
  insights: {
    heading: "Did you know?",
    items: {
      id: [
        "Internet menggunakan protocol TCP/IP untuk memecah data menjadi paket kecil yang bisa dikirim secara efisien.",
        "Setiap paket bisa menempuh rute yang berbeda melalui internet, lalu digabungkan kembali di tujuan.",
        "Teknologi paket switching pertama kali dikembangkan oleh ARPANET pada tahun 1960-an.",
        "TCP memastikan paket yang hilang dikirim ulang secara otomatis, sehingga data tetap utuh.",
        "Rata-rata paket internet berukuran 1500 bytes (MTU) — lebih kecil dari satu foto smartphone.",
        "Packet loss rate normal di internet adalah 1-2%. Di atas 5%, koneksi mulai terasa lambat.",
      ],
      en: [
        "The internet uses TCP/IP protocol to break data into small packets for efficient transmission.",
        "Each packet can take a different route through the internet, then be reassembled at the destination.",
        "Packet switching technology was first developed by ARPANET in the 1960s.",
        "TCP ensures lost packets are automatically retransmitted, keeping data intact.",
        "Average internet packets are 1500 bytes (MTU) — smaller than a single smartphone photo.",
        "Normal packet loss on the internet is 1-2%. Above 5%, connections start feeling slow.",
      ],
    },
  },
  share: {
    copyResult: "Copy result",
    copied: "Copied!",
    shareLink: "Share link",
    linkCopied: "Link copied!",
  },
  footer: {
    tagline: "Internet Packet Explorer — discover how messages travel across the internet.",
    home: "Home",
    playground: "Playground",
    madeWith: "Made with ❤️ by",
  },
}

/* ------------------------------------------------------------------ */
/*  Indonesian dictionary                                              */
/* ------------------------------------------------------------------ */

const id: typeof en = {
  header: { playground: "Playground", tryNow: "Coba Sekarang" },
  hero: {
    badge: "Playground edukasi tentang bagaimana pesan melakukan perjalanan melalui internet",
    title: "Internet Packet Explorer",
    subtitle:
      "Temukan bagaimana pesanmu dipecah menjadi paket, melakukan perjalanan melalui router, dan dirakit kembali di tujuan — semuanya divisualisasikan di browser-mu.",
    tryNow: "Coba Sekarang",
    randomExample: "Pesan Acak",
    mono: "Pesanmu tidak berjalan sebagai satu kesatuan. Ia menjadi paket.",
  },
  features: {
    heading: "Pesan adalah paket di lautan router.",
    subtitle:
      "Setiap pesan yang kamu kirim akan dipecah menjadi paket, masing-masing membawa sebagian dari teka-teki. Mereka menempuh jalur berbeda dan berkumpul kembali di tujuan.",
    packetSplit: {
      title: "Pemecahan Paket",
      formula: "pesan → [pkt1, pkt2, pkt3, ...]",
      body: "Lihat bagaimana satu pesan dipecah menjadi paket-paket kecil, masing-masing dengan nomor urut agar bisa dirakit kembali secara berurutan.",
    },
    networkJourney: {
      title: "Perjalanan Jaringan",
      formula: "pengirim → router₁ → router₂ → ... → server",
      body: "Saksikan paket melakukan perjalanan melalui beberapa router. Setiap hop membawa mereka lebih dekat ke tujuan, seperti internet yang sesungguhnya.",
    },
    reassembly: {
      title: "Perakitan Kembali",
      formula: "paket → urutkan by seq → pesan asli",
      body: "Di tujuan, paket diurutkan berdasarkan nomor urutnya dan digabungkan kembali menjadi pesan asli.",
    },
  },
  how: {
    heading: "Cara kerjanya",
    subtitle: "Tiga langkah, sepenuhnya di browser.",
    steps: [
      {
        title: "1. Ketik pesan",
        body: "Masukkan teks apa saja — dari sapaan sederhana hingga permintaan HTTP. Ini merepresentasikan data yang ingin kamu kirim.",
      },
      {
        title: "2. Kami pecah menjadi paket",
        body: "Pesanmu dibagi menjadi bagian-bagian kecil yang disebut paket. Setiap paket mendapat nomor urut untuk perakitan kembali.",
      },
      {
        title: "3. Saksikan perjalanannya",
        body: "Lihat paket melakukan perjalanan melalui router, kehilangan beberapa di perjalanan, dan dirakit kembali di tujuan.",
      },
    ],
  },
  cta: {
    heading: "Siap menjelajahi bagaimana internet bekerja?",
    subtitle:
      "Tanpa daftar, tanpa panggilan server. Hanya kamu, rasa ingin tahumu, dan dunia fascinasi dari paket jaringan.",
    button: "Buka Playground",
  },
  playground: {
    title: "Playground",
    subtitle:
      "Ketik pesan dan saksikan ia dipecah menjadi paket, melakukan perjalanan melalui jaringan, dan dirakit kembali. Semuanya berjalan lokal di browser-mu.",
    intro: {
      title: "Selamat Datang di Internet Packet Explorer",
      body: "Playground ini memungkinkanmu menjelajahi bagaimana data melakukan perjalanan melalui internet sebagai paket. Ketik pesan di bawah, atau klik 'Pesan Acak' untuk memulai.",
    },
  },
  messageInput: {
    placeholder: "Ketik pesan (misalnya HELLO WORLD)…",
    send: "Kirim",
    randomMessage: "Pesan Acak",
    clear: "Hapus",
  },
  packetSplitter: {
    title: "Pemecahan Paket",
    subtitle: "Pesanmu, dipecah menjadi paket:",
    header: "Paket",
    seqLabel: "Seq",
    totalLabel: "Total",
    dataLabel: "Data",
  },
  networkJourney: {
    title: "Perjalanan Jaringan",
    subtitle: "Paket melakukan perjalanan melalui jaringan:",
    yourDevice: "Perangkatmu",
    server: "Server",
    hop: "hop",
  },
  packetReassembly: {
    title: "Perakitan Kembali",
    subtitle: "Paket digabungkan kembali menjadi pesan asli:",
    originalMessage: "Pesan asli",
    reassembled: "Dirakit kembali",
    missing: "Paket hilang — pesan tidak lengkap!",
    complete: "Semua paket diterima — pesan lengkap!",
  },
  packetLoss: {
    title: "Simulasi Kehilangan Paket",
    subtitle: "Alihkan antara pengiriman normal dan kehilangan paket:",
    normal: "Normal",
    packetLoss: "Kehilangan Paket",
    delivered: "diterima",
    lost: "hilang",
    explanation: "Di jaringan nyata, paket bisa hilang karena kemacetan, error, atau timeout. TCP mengirim ulang paket yang hilang.",
  },
  insights: {
    heading: "Tahukah kamu?",
    items: {
      id: [
        "Internet menggunakan protocol TCP/IP untuk memecah data menjadi paket kecil yang bisa dikirim secara efisien.",
        "Setiap paket bisa menempuh rute yang berbeda melalui internet, lalu digabungkan kembali di tujuan.",
        "Teknologi paket switching pertama kali dikembangkan oleh ARPANET pada tahun 1960-an.",
        "TCP memastikan paket yang hilang dikirim ulang secara otomatis, sehingga data tetap utuh.",
        "Rata-rata paket internet berukuran 1500 bytes (MTU) — lebih kecil dari satu foto smartphone.",
        "Packet loss rate normal di internet adalah 1-2%. Di atas 5%, koneksi mulai terasa lambat.",
      ],
      en: [
        "The internet uses TCP/IP protocol to break data into small packets for efficient transmission.",
        "Each packet can take a different route through the internet, then be reassembled at the destination.",
        "Packet switching technology was first developed by ARPANET in the 1960s.",
        "TCP ensures lost packets are automatically retransmitted, keeping data intact.",
        "Average internet packets are 1500 bytes (MTU) — smaller than a single smartphone photo.",
        "Normal packet loss on the internet is 1-2%. Above 5%, connections start feeling slow.",
      ],
    },
  },
  share: {
    copyResult: "Salin hasil",
    copied: "Tersalin!",
    shareLink: "Bagikan tautan",
    linkCopied: "Tautan tersalin!",
  },
  footer: {
    tagline: "Internet Packet Explorer — temukan bagaimana pesan melakukan perjalanan melalui internet.",
    home: "Beranda",
    playground: "Playground",
    madeWith: "Dibuat dengan ❤️ oleh",
  },
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

export type Dict = typeof en

const DICTS: Record<Locale, Dict> = { en, id }

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "id" || stored === "en") setLocaleState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale
  }, [locale])

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTS[locale],
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider")
  return ctx
}
