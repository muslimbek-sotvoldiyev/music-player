"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  Search,
  Home,
  Library,
  Sun,
  Moon,
  Filter,
  X,
  ChevronDown,
  Volume2,
} from "lucide-react"

const mockArtists = [
  {
    name: "Billie Eilish",
    genre: "Pop",
    artwork: "/the-weeknd-album-cover-dark-moody.png",
    songs: [
      {
        title: "i love you",
        duration: "4:51",
        file: "/music/billieelilish/iloveyou.mp3", // Using the real MP3 file provided by user
        lyricsFile: "/music/billieelilish/iloveyou.txt",
        artwork: "/music/billieelilish/iloveyou.png",
      },
    ],
  },
  {
    name: "The Weeknd",
    genre: "Pop",
    artwork: "/the-weeknd-album-cover-dark-moody.png",
    songs: [
      {
        title: "Timeless",
        duration: "4:15",
        file: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Weeknd%2C%20Playboi%20Carti%20-%20Timeless-vTbHhFDDwlFBsxaOnC3jivYOTpVwew.mp3", // Using the real MP3 file provided by user
        lyricsFile: "/music/theweeknd/timeless.txt",
        artwork: "/the-weeknd-album-cover-dark-moody.png",
      },
      {
        title: "Blinding Lights",
        duration: "3:20",
        file: "/music/theweeknd/blinding-lights.mp3",
        lyricsFile: "/music/theweeknd/blinding-lights.txt",
        artwork: "/blinding-lights-neon-city-lights.png",
      },
      {
        title: "Save Your Tears",
        duration: "3:35",
        file: "/music/theweeknd/save-your-tears.mp3",
        lyricsFile: "/music/theweeknd/save-your-tears.txt",
        artwork: "/save-your-tears-emotional-dark.png",
      },
    ],
  },
    {
  name: "Shokir",
  genre: "Pop",
  artwork: "/music/shokir/shokir.png",
  songs: [
    {
      title: "Aura",
      file: "/music/shokir/Aura.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "1:47"
    },
    {
      title: "Ava",
      file: "/music/shokir/Ava.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:38"
    },
    {
      title: "Aytishlaricha",
      file: "/music/shokir/Aytishlaricha.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "3:07"
    },
    {
      title: "Baxtlik",
      file: "/music/shokir/Baxtlik.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:30"
    },
    {
      title: "Erkak-kishi",
      file: "/music/shokir/Erkak-kishi.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "1:57"
    },
    {
      title: "Fayzee-Bor",
      file: "/music/shokir/Fayzee-Bor.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:19"
    },
    {
      title: "Kuz",
      file: "/music/shokir/Kuz.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:40"
    },
    {
      title: "Manipulyator",
      file: "/music/shokir/Manipulyator.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "3:05"
    },
    {
      title: "Prada",
      file: "/music/shokir/Prada.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:24"
    },
    {
      title: "PXQ",
      file: "/music/shokir/PXQ.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:40"
    },
    {
      title: "Qaro-ko'zlaring",
      file: "/music/shokir/Qaro-kozlaring.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:51"
    },
    {
      title: "Qimilla",
      file: "/music/shokir/Qimilla.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:36"
    },
    {
      title: "Romantika",
      file: "/music/shokir/Romantika.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:40"
    },
    {
      title: "Sarob",
      file: "/music/shokir/Sarob.m4a",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "3:00"
    },
    {
      title: "Shokir - Feling",
      file: "/music/shokir/Shokir - Feling.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:13"
    },
    {
      title: "Shokir - Kema",
      file: "/music/shokir/Shokir - Kema.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "3:39"
    },
    {
      title: "Shokir - Notiq",
      file: "/music/shokir/Shokir - Notiq.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:30"
    },
    {
      title: "Shokir - Qand",
      file: "/music/shokir/Shokir - Qand.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "2:04"
    },
    {
      title: "Yoqolar",
      file: "/music/shokir/Yoqolar.mp3",
      lyricsFile: "",
      artwork: "/music/shokir/shokir.png",
      duration: "3:00"
    }
  ]
  },
  {
    name: "Dua Lipa",
    genre: "Pop",
    artwork: "/dua-lipa-colorful-pop-album-cover.png",
    songs: [
      {
        title: "Levitating",
        duration: "3:23",
        file: "/music/dualipa/levitating.mp3",
        lyricsFile: "/music/dualipa/levitating.txt",
        artwork: "/levitating-disco-ball-space.png",
      },
      {
        title: "Don't Start Now",
        duration: "3:03",
        file: "/music/dualipa/dont-start-now.mp3",
        lyricsFile: "/music/dualipa/dont-start-now.txt",
        artwork: "/don-t-start-now-retro-disco.png",
      },
    ],
  },
]

interface Song {
  title: string
  duration: string
  file: string
  lyricsFile?: string
  artist?: string
  artwork?: string
  lyrics?: string
  id?: string
  image?: string
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      pulse: number
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles with music-themed colors
    const colors = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"]
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        // Pulsing effect
        const pulseFactor = Math.sin(particle.pulse) * 0.3 + 0.7
        const currentSize = particle.size * pulseFactor
        const currentOpacity = particle.opacity * pulseFactor

        // Draw particle with glow effect
        ctx.save()
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Connect nearby particles
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (1 - distance / 100) * 0.2
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}

export default function MusicStreamApp() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState<string>("All")
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)
  const [lyricsAnimating, setLyricsAnimating] = useState(false)
  const [currentLyricLine, setCurrentLyricLine] = useState(0)
  const [expandedPlayer, setExpandedPlayer] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null) // Added ref for click outside detection

  const allSongs = mockArtists.flatMap((artist) =>
    artist.songs.map((song) => ({
      ...song,
      artist: artist.name,
      artwork: song.artwork || artist.artwork,
      id: `${artist.name}-${song.title}`,
      image: song.artwork || artist.artwork,
    })),
  )

  const loadLyrics = async (lyricsFile: string): Promise<string> => {
    try {
      const response = await fetch(lyricsFile)
      if (response.ok) {
        return await response.text()
      }
    } catch (error) {
      console.log("[v0] Failed to load lyrics:", error)
    }
    return "Lyrics not available for this song."
  }

  const filteredArtists =
    selectedGenre === "All" ? mockArtists : mockArtists.filter((artist) => artist.genre === selectedGenre)

  const genres = ["All", ...Array.from(new Set(mockArtists.map((artist) => artist.genre)))]

  const searchResults = allSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleWishlist = (songId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(songId)
      if (exists) {
        return prev.filter((id) => id !== songId)
      } else {
        return [...prev, songId]
      }
    })
  }

  const isInWishlist = (songId: string) => {
    return wishlist.includes(songId)
  }

  const playSong = async (song: Song) => {
    console.log("[v0] Attempting to play song:", song.file)

    if (song.lyricsFile) {
      const lyrics = await loadLyrics(song.lyricsFile)
      song.lyrics = lyrics
    }

    setCurrentSong(song)
    setShowPlayer(true)

    if (audioRef.current) {
      audioRef.current.src = song.file
      audioRef.current.load()

      // Add event listeners for better error handling
      const handleCanPlay = () => {
        console.log("[v0] Audio can play, starting playback")
        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true)
            console.log("[v0] Successfully playing:", song.file)
          })
          .catch((error) => {
            console.log("[v0] Play failed:", error)
            setIsPlaying(false)
          })
      }

      const handleError = (e: Event) => {
        console.log("[v0] Audio error:", e)
        setIsPlaying(false)
        alert("Sorry, this audio file couldn't be played. Please try another song.")
      }

      audioRef.current.addEventListener("canplay", handleCanPlay, { once: true })
      audioRef.current.addEventListener("error", handleError, { once: true })
    }
  }

  const playNext = () => {
    if (!currentSong) return

    const currentIndex = allSongs.findIndex(
      (song) => song.title === currentSong.title && song.artist === currentSong.artist,
    )

    let nextIndex
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * allSongs.length)
    } else {
      nextIndex = (currentIndex + 1) % allSongs.length
    }

    playSong(allSongs[nextIndex])
  }

  const playPrevious = () => {
    if (!currentSong) return

    const currentIndex = allSongs.findIndex(
      (song) => song.title === currentSong.title && song.artist === currentSong.artist,
    )

    let prevIndex
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * allSongs.length)
    } else {
      prevIndex = currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1
    }

    playSong(allSongs[prevIndex])
  }

  const seekTo = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * duration
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics)
  }

  const getCurrentLyricLine = (currentTime: number, duration: number) => {
    if (!currentSong?.lyrics) return 0
    const lines = currentSong.lyrics.split("\n").filter((line) => line.trim())
    const progress = currentTime / duration
    return Math.floor(progress * lines.length)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showPlayer && playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setShowPlayer(false)
      }
    }

    if (showPlayer) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPlayer])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    if ("mediaSession" in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist || "Unknown Artist",
        artwork: [
          { src: currentSong.artwork || "/abstract-soundscape.png", sizes: "96x96", type: "image/png" },
          { src: currentSong.artwork || "/abstract-soundscape.png", sizes: "128x128", type: "image/png" },
          { src: currentSong.artwork || "/abstract-soundscape.png", sizes: "192x192", type: "image/png" },
          { src: currentSong.artwork || "/abstract-soundscape.png", sizes: "256x256", type: "image/png" },
          { src: currentSong.artwork || "/abstract-soundscape.png", sizes: "384x384", type: "image/png" },
          { src: currentSong.artwork || "/abstract-soundscape.png", sizes: "512x512", type: "image/png" },
        ],
      })

      navigator.mediaSession.setActionHandler("play", () => {
        setIsPlaying(true)
        audioRef.current?.play()
      })

      navigator.mediaSession.setActionHandler("pause", () => {
        setIsPlaying(false)
        audioRef.current?.pause()
      })

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        playPrevious()
      })

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        playNext()
      })
    }
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      if (showLyrics && currentSong?.lyrics) {
        setCurrentLyricLine(getCurrentLyricLine(audio.currentTime, audio.duration))
      }
    }
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        playNext()
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [isRepeat, showLyrics, currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("[v0] Play failed:", error)
          setIsPlaying(false)
        })
    }
  }

  return (
    <div className="min-h-screen dynamic-bg text-foreground relative overflow-hidden mobile-safe-area">
      <ParticleBackground />

      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none z-1" />

      <div className="sticky top-0 z-20 glass-card border-b border-gray-200/50 backdrop-blur-xl">
        <div className="flex items-center justify-between p-4 lg:px-8">
          <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-wave drop-shadow-sm">
            🎵 MusicStream
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] hover:bg-white/10 transition-all duration-300"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] hover:bg-white/10 transition-all duration-300"
            >
              <Filter className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("search")}
              className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] hover:bg-white/10 transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-8 space-y-6 mobile-safe-bottom">
        {activeTab === "search" && (
          <div className="animate-float-up">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search songs or artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pl-12 rounded-2xl glass-card border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-primary mobile-transition text-base"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            {searchQuery && (
              <div className="space-y-3">
                <h3 className="mobile-title">Search Results</h3>
                {searchResults.map((song, index) => (
                  <Card key={index} className="mobile-music-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => playSong(song)}>
                        <div className="w-14 h-14 rounded-xl overflow-hidden album-art-glow">
                          <img
                            src={song.artwork || "/placeholder.svg"}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="mobile-title truncate">{song.title}</p>
                          <p className="mobile-subtitle truncate">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleWishlist(song.id || "")}
                          className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] ${isInWishlist(song.id || "") ? "text-red-500" : ""}`}
                        >
                          <Heart className="h-5 w-5" fill={isInWishlist(song.id || "") ? "currentColor" : "none"} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => playSong(song)}
                          className="mobile-control-btn primary min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px]"
                        >
                          <Play className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "library" && (
          <div className="animate-float-up">
            <h2 className="mobile-title mb-6">Your Library</h2>
            {wishlist.length === 0 ? (
              <Card className="mobile-music-card text-center py-12">
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-pulse-ring" />
                <p className="mobile-title text-muted-foreground mb-2">No songs in your library yet</p>
                <p className="mobile-caption">Add songs to your wishlist to see them here</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {wishlist.map((songId) => {
                  const song = allSongs.find((s) => s.id === songId)
                  if (!song) return null
                  return (
                    <Card key={songId} className="mobile-music-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => playSong(song)}>
                          <div className="w-14 h-14 rounded-xl overflow-hidden album-art-glow">
                            <img
                              src={song.artwork || "/placeholder.svg"}
                              alt={song.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="mobile-title truncate">{song.title}</p>
                            <p className="mobile-subtitle truncate">{song.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWishlist(songId)}
                            className="mobile-control-btn text-red-500 min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target"
                          >
                            <Heart className="h-5 w-5" fill="currentColor" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => playSong(song)}
                            className="mobile-control-btn primary min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target"
                          >
                            <Play className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "home" && !selectedArtist && (
          <>
            <section className="animate-float-up">
              <h2 className="mobile-title mb-4">Recently Played</h2>
              <div className="mobile-grid">
                {allSongs.slice(0, 6).map((song, index) => (
                  <Card key={index} className="mobile-music-card cursor-pointer" onClick={() => playSong(song)}>
                    <div className="aspect-square rounded-xl mb-3 overflow-hidden album-art-glow">
                      <img
                        src={song.artwork || "/placeholder.svg"}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="mobile-title text-balance">{song.title}</h3>
                    <p className="mobile-subtitle">{song.artist}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section className="animate-float-up">
              <h2 className="mobile-title mb-4">Artists</h2>
              <div className="space-y-4">
                {filteredArtists.map((artist, index) => (
                  <Card key={index} className="mobile-music-card">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-full overflow-hidden cursor-pointer mobile-transition album-art-glow"
                        onClick={() => setSelectedArtist(artist.name)}
                      >
                        <img
                          src={artist.artwork || "/placeholder.svg"}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="mobile-title cursor-pointer mobile-transition hover:text-primary"
                          onClick={() => setSelectedArtist(artist.name)}
                        >
                          {artist.name}
                        </h3>
                        <p className="mobile-subtitle">
                          {artist.songs.length} songs • {artist.genre}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {artist.songs.map((song, songIndex) => (
                        <div
                          key={songIndex}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 cursor-pointer mobile-transition"
                          onClick={() =>
                            playSong({
                              ...song,
                              artist: artist.name,
                              artwork: song.artwork || artist.artwork,
                              id: `${artist.name}-${song.title}`,
                              image: song.artwork || artist.artwork,
                            })
                          }
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                              <img
                                src={song.artwork || artist.artwork}
                                alt={song.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm truncate">{song.title}</p>
                              <p className="mobile-caption truncate">{song.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 mobile-control-btn"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleWishlist(`${artist.name}-${song.title}`)
                              }}
                            >
                              <Heart
                                className="h-4 w-4"
                                fill={isInWishlist(`${artist.name}-${song.title}`) ? "currentColor" : "none"}
                              />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 mobile-control-btn">
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {selectedArtist && (
          <div className="animate-fade-in">
            <Button variant="ghost" onClick={() => setSelectedArtist(null)} className="mb-4">
              ← Back to Artists
            </Button>
            {(() => {
              const artist = mockArtists.find((a) => a.name === selectedArtist)
              if (!artist) return null

              return (
                <div>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                      <img
                        src={artist.artwork || "/placeholder.svg"}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                      <p className="text-muted-foreground text-lg">
                        {artist.songs.length} songs • {artist.genre}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {artist.songs.map((song, index) => (
                      <Card key={index} className="p-4 hover:bg-accent/10 transition-colors">
                        <div className="flex items-center justify-between">
                          <div
                            className="flex items-center gap-4 cursor-pointer flex-1"
                            onClick={() =>
                              playSong({
                                ...song,
                                artist: artist.name,
                                artwork: song.artwork || artist.artwork,
                                id: `${artist.name}-${song.title}`,
                                image: song.artwork || artist.artwork,
                              })
                            }
                          >
                            <div className="w-16 h-16 rounded overflow-hidden">
                              <img
                                src={song.artwork || artist.artwork}
                                alt={song.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{song.title}</h3>
                              <p className="text-muted-foreground">{song.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleWishlist(`${artist.name}-${song.title}`)}
                            >
                              <Heart
                                className="h-5 w-5"
                                fill={isInWishlist(`${artist.name}-${song.title}`) ? "currentColor" : "none"}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                playSong({
                                  ...song,
                                  artist: artist.name,
                                  artwork: song.artwork || artist.artwork,
                                  id: `${artist.name}-${song.title}`,
                                  image: song.artwork || artist.artwork,
                                })
                              }
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>

      {currentSong && !showPlayer && (
        <div
          className="fixed bottom-20 left-4 right-4 glass-card rounded-2xl p-4 cursor-pointer player-slide-up mobile-safe-bottom"
          onClick={() => setShowPlayer(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden album-art-glow">
              <img
                src={currentSong.image || "/abstract-soundscape.png"}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{currentSong.title}</p>
              <p className="mobile-caption truncate">{currentSong.artist}</p>
            </div>
            <div className="flex-1 mx-3">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={(e) => seekTo(Number.parseInt(e.target.value))}
                className="w-full mobile-range-input-mini"
                onClick={(e) => e.stopPropagation()}
                style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
              />
            </div>
            <div className="mobile-player-controls">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mobile-control-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  playPrevious()
                }}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 mobile-control-btn primary"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlayPause()
                }}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mobile-control-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  playNext()
                }}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {showPlayer && currentSong && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            ref={playerRef}
            className="glass-card rounded-3xl w-full max-w-md player-slide-up shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPlayer(false)}
                  className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target"
                >
                  <X className="h-5 w-5" />
                </Button>
                <h3 className="font-semibold">Now Playing</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWishlist(currentSong.id || "")}
                  className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target ${isInWishlist(currentSong.id || "") ? "text-red-500" : ""}`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(currentSong.id || "") ? "fill-current" : ""}`} />
                </Button>
              </div>

              <div
                className={`flex justify-center mb-6 mobile-transition-slow ${
                  showLyrics ? "transform -translate-y-4 scale-90" : ""
                }`}
              >
                <div className="w-72 h-72 rounded-2xl overflow-hidden album-art-glow animate-pulse-ring">
                  <img
                    src={currentSong.image || "/placeholder.svg"}
                    alt={currentSong.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-balance mb-2">{currentSong.title}</h2>
                <p className="mobile-subtitle">{currentSong.artist}</p>
              </div>

              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={(e) => seekTo(Number.parseInt(e.target.value))}
                  className="w-full mb-3 mobile-range-input"
                  style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
                />
                <div className="flex justify-between mobile-caption">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="mobile-player-controls mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target ${isShuffle ? "text-primary" : ""}`}
                >
                  <Shuffle className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playPrevious}
                  className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target"
                >
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button
                  size="icon"
                  className="h-16 w-16 mobile-control-btn primary touch-target"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playNext}
                  className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target"
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] touch-target ${isRepeat ? "text-primary" : ""}`}
                >
                  <Repeat className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex justify-center mb-4">
                <Button
                  variant={showLyrics ? "default" : "outline"}
                  onClick={toggleLyrics}
                  className={`px-8 py-3 font-semibold rounded-2xl mobile-transition ${
                    showLyrics
                      ? "premium-button text-primary-foreground"
                      : "mobile-control-btn border-primary text-primary"
                  }`}
                >
                  {showLyrics ? "Show Album Art" : "Show Lyrics"}
                </Button>
              </div>

              {showLyrics && (
                <div className="animate-float-up">
                  <div className="glass-card rounded-2xl p-4 lyrics-mobile">
                    <div className="text-center leading-relaxed">
                      {currentSong.lyrics ? (
                        currentSong.lyrics.split("\n").map((line, index) => (
                          <div
                            key={index}
                            className={`lyrics-line ${
                              index === currentLyricLine ? "active" : index < currentLyricLine ? "past" : "upcoming"
                            }`}
                          >
                            {line || "\u00A0"}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                          Loading lyrics...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number.parseInt(e.target.value))}
                  className="flex-1 mobile-range-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {expandedPlayer && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpandedPlayer(false)}
                className="text-white hover:bg-white/10 min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px]"
              >
                <ChevronDown className="h-6 w-6" />
              </Button>
              <h3 className="text-lg font-semibold text-white">Now Playing</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleWishlist(currentSong.id || "")}
                className={`min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] ${
                  wishlist.includes(currentSong.id || "") ? "text-red-500" : "text-white hover:bg-white/10"
                }`}
              >
                <Heart className={`h-6 w-6 ${wishlist.includes(currentSong.id || "") ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8">
              {showLyrics ? (
                <div className="w-full max-w-md animate-float-up">
                  <div className="glass-card rounded-2xl p-6 lyrics-mobile max-h-[400px] overflow-y-auto">
                    <div className="text-center leading-relaxed">
                      {currentSong.lyrics ? (
                        currentSong.lyrics.split("\n").map((line, index) => (
                          <div
                            key={index}
                            className={`lyrics-line ${
                              index === currentLyricLine ? "active" : index < currentLyricLine ? "past" : "upcoming"
                            }`}
                          >
                            {line || "\u00A0"}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                          Loading lyrics...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-sm mb-8 animate-float-up">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                    <img
                      src={currentSong.image || "/placeholder.svg"}
                      alt={currentSong.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="w-full max-w-md text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h2>
                <p className="text-lg text-gray-300">{currentSong.artist}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={(e) => seekTo(Number.parseInt(e.target.value))}
                  className="w-full mobile-range-input"
                  style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="mobile-player-controls mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] ${isShuffle ? "text-primary" : ""}`}
                >
                  <Shuffle className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playPrevious}
                  className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px]"
                >
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button size="icon" className="h-16 w-16 mobile-control-btn primary" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playNext}
                  className="mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px]"
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] ${isRepeat ? "text-primary" : ""}`}
                >
                  <Repeat className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex justify-center mb-4">
                <Button
                  variant={showLyrics ? "default" : "outline"}
                  onClick={toggleLyrics}
                  className={`px-8 py-3 font-semibold rounded-2xl mobile-transition ${
                    showLyrics
                      ? "premium-button text-primary-foreground"
                      : "mobile-control-btn border-primary text-primary"
                  }`}
                >
                  {showLyrics ? "Show Album Art" : "Show Lyrics"}
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number.parseInt(e.target.value))}
                  className="flex-1 mobile-range-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 mobile-nav mobile-safe-bottom">
        <div className="flex items-center justify-around p-4 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("home")}
            className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] relative touch-target ${activeTab === "home" ? "text-primary" : ""}`}
          >
            <Home className="h-6 w-6" />
            {activeTab === "home" && <div className="nav-indicator" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("search")}
            className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] relative touch-target ${activeTab === "search" ? "text-primary" : ""}`}
          >
            <Search className="h-6 w-6" />
            {activeTab === "search" && <div className="nav-indicator" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("library")}
            className={`mobile-control-btn min-h-[48px] min-w-[48px] md:min-h-[40px] md:min-w-[40px] relative touch-target ${activeTab === "library" ? "text-primary" : ""}`}
          >
            <Library className="h-6 w-6" />
            {activeTab === "library" && <div className="nav-indicator" />}
          </Button>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" />
    </div>
  )
}
