"use client"

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
} from "lucide-react"

const mockArtists = [
    {
    name: "The Weeknd",
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
}

export default function MusicStreamApp() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState<string>("All")
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<Song[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)
  const [lyricsAnimating, setLyricsAnimating] = useState(false)
  const [currentLyricLine, setCurrentLyricLine] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null) // Added ref for click outside detection

  const allSongs = mockArtists.flatMap((artist) =>
    artist.songs.map((song) => ({
      ...song,
      artist: artist.name,
      artwork: song.artwork || artist.artwork,
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

  const toggleWishlist = (song: Song) => {
    setWishlist((prev) => {
      const exists = prev.some((s) => s.title === song.title && s.artist === song.artist)
      if (exists) {
        return prev.filter((s) => !(s.title === song.title && s.artist === song.artist))
      } else {
        return [...prev, song]
      }
    })
  }

  const isInWishlist = (song: Song) => {
    return wishlist.some((s) => s.title === song.title && s.artist === song.artist)
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

  const seekTo = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value[0] / 100) * duration
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleLyrics = () => {
    if (showLyrics) {
      setLyricsAnimating(true)
      setTimeout(() => {
        setShowLyrics(false)
        setLyricsAnimating(false)
      }, 300)
    } else {
      setShowLyrics(true)
      setLyricsAnimating(true)
      setTimeout(() => setLyricsAnimating(false), 300)
    }
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
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>
      </div>
      <audio ref={audioRef} preload="metadata" /> {/* Added preload for better loading */}
      <div className={`transition-all duration-300 ${showPlayer ? "pb-32" : "pb-20"} max-w-7xl mx-auto`}>
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between p-4 lg:px-8">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MusicStream
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setActiveTab("search")}>
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="px-4 lg:px-8 pb-4">
              <div className="flex gap-2 overflow-x-auto">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGenre(genre)}
                    className="whitespace-nowrap"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 lg:p-8 space-y-6">
          {activeTab === "search" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search songs or artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {searchQuery && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Search Results</h3>
                  {searchResults.map((song, index) => (
                    <Card key={index} className="p-3 hover:bg-accent/10 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => playSong(song)}>
                          <div className="w-12 h-12 rounded overflow-hidden">
                            <img
                              src={song.artwork || "/placeholder.svg"}
                              alt={song.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{song.title}</p>
                            <p className="text-sm text-muted-foreground">{song.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWishlist(song)}
                            className={isInWishlist(song) ? "text-red-500" : ""}
                          >
                            <Heart className="h-4 w-4" fill={isInWishlist(song) ? "currentColor" : "none"} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => playSong(song)}>
                            <Play className="h-4 w-4" />
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
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Your Library</h2>
              {wishlist.length === 0 ? (
                <Card className="p-8 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No songs in your library yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Add songs to your wishlist to see them here</p>
                </Card>
              ) : (
                <div className="space-y-2">
                  {wishlist.map((song, index) => (
                    <Card key={index} className="p-3 hover:bg-accent/10 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => playSong(song)}>
                          <div className="w-12 h-12 rounded overflow-hidden">
                            <img
                              src={song.artwork || "/placeholder.svg"}
                              alt={song.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{song.title}</p>
                            <p className="text-sm text-muted-foreground">{song.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWishlist(song)}
                            className="text-red-500"
                          >
                            <Heart className="h-4 w-4" fill="currentColor" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => playSong(song)}>
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "home" && !selectedArtist && (
            <>
              <section className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {allSongs.slice(0, 6).map((song, index) => (
                    <Card
                      key={index}
                      className="p-4 cursor-pointer hover:bg-accent/10 transition-all duration-200 hover:scale-105"
                      onClick={() => playSong(song)}
                    >
                      <div className="aspect-square rounded-lg mb-3 overflow-hidden">
                        <img
                          src={song.artwork || "/placeholder.svg"}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-sm text-balance">{song.title}</h3>
                      <p className="text-xs text-muted-foreground">{song.artist}</p>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Artists</h2>
                <div className="grid lg:grid-cols-2 gap-4">
                  {filteredArtists.map((artist, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-16 h-16 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setSelectedArtist(artist.name)}
                        >
                          <img
                            src={artist.artwork || "/placeholder.svg"}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3
                            className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
                            onClick={() => setSelectedArtist(artist.name)}
                          >
                            {artist.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {artist.songs.length} songs • {artist.genre}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {artist.songs.map((song, songIndex) => (
                          <div
                            key={songIndex}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() =>
                              playSong({
                                ...song,
                                artist: artist.name,
                                artwork: song.artwork || artist.artwork,
                              })
                            }
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src={song.artwork || artist.artwork}
                                  alt={song.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{song.title}</p>
                                <p className="text-xs text-muted-foreground">{song.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleWishlist({
                                    ...song,
                                    artist: artist.name,
                                    artwork: song.artwork || artist.artwork,
                                  })
                                }}
                              >
                                <Heart
                                  className="h-4 w-4"
                                  fill={
                                    isInWishlist({
                                      ...song,
                                      artist: artist.name,
                                      artwork: song.artwork || artist.artwork,
                                    })
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
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
                                onClick={() =>
                                  toggleWishlist({
                                    ...song,
                                    artist: artist.name,
                                    artwork: song.artwork || artist.artwork,
                                  })
                                }
                              >
                                <Heart
                                  className="h-5 w-5"
                                  fill={
                                    isInWishlist({
                                      ...song,
                                      artist: artist.name,
                                      artwork: song.artwork || artist.artwork,
                                    })
                                      ? "currentColor"
                                      : "none"
                                  }
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
      </div>
      {currentSong && !showPlayer && (
        <div
          className="fixed bottom-20 left-4 right-4 bg-card border border-border rounded-lg p-3 cursor-pointer animate-slide-up"
          onClick={() => setShowPlayer(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded overflow-hidden">
              <img
                src={currentSong.artwork || "/abstract-soundscape.png"}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{currentSong.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
            <div className="flex-1 mx-3">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={(e) => seekTo([Number.parseInt(e.target.value)])}
                className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
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
                className="h-10 w-10"
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
                className="h-8 w-8"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            ref={playerRef}
            className="bg-card border border-border rounded-lg w-full max-w-md animate-slide-up shadow-2xl"
          >
            <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" onClick={() => setShowPlayer(false)}>
                  <X className="h-5 w-5" />
                </Button>
                <h3 className="font-medium">Now Playing</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWishlist(currentSong)}
                  className={isInWishlist(currentSong) ? "text-red-500" : ""}
                >
                  <Heart className="h-5 w-5" fill={isInWishlist(currentSong) ? "currentColor" : "none"} />
                </Button>
              </div>

              <div
                className={`flex justify-center mb-6 transition-all duration-500 ${showLyrics ? "transform -translate-y-8 scale-90" : ""}`}
              >
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-lg overflow-hidden animate-pulse-glow">
                  <img
                    src={currentSong.artwork || "/placeholder.svg"}
                    alt={currentSong.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-balance mb-1">{currentSong.title}</h2>
                <p className="text-muted-foreground lg:text-lg">{currentSong.artist}</p>
              </div>

              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={(e) => seekTo([Number.parseInt(e.target.value)])}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb mb-2"
                />
                <div className="flex justify-between text-xs lg:text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={isShuffle ? "text-primary" : ""}
                >
                  <Shuffle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={playPrevious}>
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button size="icon" className="h-14 w-14 bg-primary hover:bg-primary/90" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={playNext}>
                  <SkipForward className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={isRepeat ? "text-primary" : ""}
                >
                  <Repeat className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex justify-center gap-3 mb-4">
                <Button
                  variant={showLyrics ? "default" : "outline"}
                  onClick={toggleLyrics}
                  className={`px-8 py-3 font-medium text-base transition-all duration-300 ${
                    showLyrics
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/30"
                      : "bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 border-primary text-primary border-2 hover:scale-105"
                  }`}
                >
                  {showLyrics ? "Hide Lyrics" : "Show Lyrics"}
                </Button>
              </div>

              {showLyrics && (
                <div className={`mt-4 transition-all duration-500 ${lyricsAnimating ? "animate-slide-down" : ""}`}>
                  <div className="p-6 bg-gradient-to-br from-muted/90 to-muted/70 rounded-xl max-h-48 lg:max-h-72 overflow-y-auto border-2 border-primary/30 shadow-inner backdrop-blur-sm">
                    <div className="text-base lg:text-lg whitespace-pre-wrap text-center leading-relaxed">
                      {currentSong.lyrics ? (
                        currentSong.lyrics.split("\n").map((line, index) => (
                          <div
                            key={index}
                            className={`transition-all duration-300 py-1 ${
                              index === currentLyricLine
                                ? "text-primary font-bold scale-105 bg-primary/10 rounded px-2"
                                : "text-foreground/80"
                            }`}
                          >
                            {line || "\u00A0"}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                          Loading lyrics...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("home")}
            className={activeTab === "home" ? "text-primary" : ""}
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("search")}
            className={activeTab === "search" ? "text-primary" : ""}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("library")}
            className={activeTab === "library" ? "text-primary" : ""}
          >
            <Library className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
