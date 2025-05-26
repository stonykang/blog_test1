"use client"

import { useState } from "react"
import { Search, Filter, Heart, MessageCircle, Eye, Share2, Calendar, MapPin, TrendingUp, Clock, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = ["전체", "자연명소", "문화유적", "맛집", "액티비티", "숙박", "축제"]
const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "views", label: "조회순" },
  { value: "comments", label: "댓글순" },
]

// 임시 데이터 (추후 Firebase에서 가져올 예정)
const blogPosts = [
  {
    id: 1,
    title: "성산일출봉에서 맞이하는 제주의 아침",
    excerpt: "제주의 대표 명소 성산일출봉에서 경험하는 감동적인 일출과 함께하는 특별한 순간들을 소개합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "자연명소",
    location: "성산일출봉, 제주",
    date: "2024년 1월 15일",
    readTime: "5분",
    views: 1234,
    likes: 124,
    comments: 23,
    author: {
      name: "제주탐험가",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 2,
    title: "한라산 등반 완전 가이드",
    excerpt: "제주의 최고봉 한라산 등반을 위한 완벽한 준비와 코스별 상세 정보를 제공합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "액티비티",
    location: "한라산, 제주",
    date: "2024년 1월 10일",
    readTime: "8분",
    views: 2156,
    likes: 89,
    comments: 45,
    author: {
      name: "산악인김제주",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 3,
    title: "제주 흑돼지 맛집 베스트 5",
    excerpt: "제주 여행의 필수 코스! 현지인이 추천하는 진짜 맛있는 흑돼지 맛집들을 소개합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "맛집",
    location: "제주시, 제주",
    date: "2024년 1월 5일",
    readTime: "6분",
    views: 3421,
    likes: 156,
    comments: 67,
    author: {
      name: "제주미식가",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 4,
    title: "우도 자전거 여행 코스",
    excerpt: "제주의 작은 섬 우도에서 즐기는 여유로운 자전거 여행과 숨겨진 포토스팟들을 공개합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "액티비티",
    location: "우도, 제주",
    date: "2023년 12월 28일",
    readTime: "7분",
    views: 1876,
    likes: 203,
    comments: 34,
    author: {
      name: "섬여행러",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 5,
    title: "제주 전통시장 탐방기",
    excerpt: "제주의 정취를 느낄 수 있는 전통시장에서 만나는 특별한 먹거리와 볼거리들을 소개합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "문화유적",
    location: "동문시장, 제주",
    date: "2023년 12월 20일",
    readTime: "4분",
    views: 987,
    likes: 67,
    comments: 12,
    author: {
      name: "전통문화탐험가",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 6,
    title: "제주 올레길 완주 후기",
    excerpt: "제주 올레길 전 코스를 완주하며 경험한 감동과 팁들을 상세히 공유합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "액티비티",
    location: "올레길, 제주",
    date: "2023년 12월 15일",
    readTime: "10분",
    views: 2543,
    likes: 98,
    comments: 56,
    author: {
      name: "올레길마스터",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 7,
    title: "제주 카페 투어 - 바다뷰 카페 베스트",
    excerpt: "제주의 아름다운 바다를 바라보며 커피를 즐길 수 있는 최고의 카페들을 소개합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "맛집",
    location: "애월, 제주",
    date: "2023년 12월 10일",
    readTime: "5분",
    views: 1654,
    likes: 134,
    comments: 28,
    author: {
      name: "카페탐험가",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 8,
    title: "제주 겨울 축제 완전정복",
    excerpt: "겨울 제주에서 즐길 수 있는 다양한 축제와 이벤트 정보를 한눈에 정리했습니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "축제",
    location: "제주 전역",
    date: "2023년 12월 5일",
    readTime: "6분",
    views: 2187,
    likes: 89,
    comments: 41,
    author: {
      name: "축제매니아",
      avatar: "/placeholder-user.jpg",
    },
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes
      case "views":
        return b.views - a.views
      case "comments":
        return b.comments - a.comments
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg" />
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                제주여행일기
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/" className="text-slate-600 hover:text-orange-600 transition-colors text-sm lg:text-base">
                홈
              </Link>
              <Link href="/cultural-events" className="text-slate-600 hover:text-orange-600 transition-colors text-sm lg:text-base">
                문화행사
              </Link>
              <Link href="/travel-news" className="text-slate-600 hover:text-orange-600 transition-colors text-sm lg:text-base">
                여행소식
              </Link>
              <Link href="/blog" className="text-orange-600 font-medium text-sm lg:text-base">
                블로그
              </Link>
              <Link href="/admin" className="text-slate-600 hover:text-orange-600 transition-colors text-sm lg:text-base">
                관리자
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-100 text-orange-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            제주 여행기 모음
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            제주도 여행 블로그
          </h1>
          <p className="text-sm sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            제주도의 숨겨진 명소부터 맛집까지, 현지인과 여행자들이 직접 경험한 생생한 제주 여행기를 만나보세요.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 sm:py-6 bg-white/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="제주 여행기 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200 focus:border-orange-500 text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap text-xs ${
                        selectedCategory === category 
                          ? "bg-orange-600 hover:bg-orange-700" 
                          : "hover:bg-orange-50"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-slate-400" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-xs">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts - Responsive Layout */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
              총 {sortedPosts.length}개의 여행기
            </h2>
            <Button className="bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-xs sm:text-sm">
              글쓰기
            </Button>
          </div>
          
          {/* Mobile: Horizontal Cards, Desktop: Vertical Grid */}
          <div className="space-y-4 sm:space-y-6 md:hidden">
            {/* Mobile Layout - Horizontal Cards */}
            {sortedPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="flex">
                  {/* Image Section */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-white/90 text-slate-700 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <CardContent className="flex-1 p-3">
                    <div className="flex flex-col h-full">
                      {/* Meta Info */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{post.location}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      
                      {/* Stats and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Layout - Vertical Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{post.location}</span>
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{post.author.name}</p>
                        <p className="text-xs text-slate-500">{post.date}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              더 많은 여행기 보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 