"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, User, Heart, Share2, Filter, Globe, Camera, Plane } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = ["전체", "아시아", "유럽", "아메리카", "오세아니아", "아프리카"]

const blogPosts = [
  {
    id: 1,
    title: "교토의 숨겨진 보석들",
    excerpt: "전통과 현대가 어우러진 교토에서 발견한 특별한 장소들을 소개합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "아시아",
    location: "교토, 일본",
    date: "2024년 1월 15일",
    readTime: "5분",
    likes: 124,
    author: {
      name: "김여행",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 2,
    title: "파리 로컬 카페 투어",
    excerpt: "파리지앵들이 사랑하는 숨은 카페들을 찾아 떠나는 특별한 여행.",
    image: "/placeholder.svg?height=300&width=400",
    category: "유럽",
    location: "파리, 프랑스",
    date: "2024년 1월 10일",
    readTime: "7분",
    likes: 89,
    author: {
      name: "이탐험",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 3,
    title: "뉴욕 브루클린 아트 디스트릭트",
    excerpt: "예술가들의 창작 공간이 된 브루클린의 매력적인 거리들을 탐험해보세요.",
    image: "/placeholder.svg?height=300&width=400",
    category: "아메리카",
    location: "뉴욕, 미국",
    date: "2024년 1월 5일",
    readTime: "6분",
    likes: 156,
    author: {
      name: "박모험",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 4,
    title: "발리 숨은 해변 가이드",
    excerpt: "관광객들이 모르는 발리의 pristine 해변들을 소개합니다.",
    image: "/placeholder.svg?height=300&width=400",
    category: "아시아",
    location: "발리, 인도네시아",
    date: "2023년 12월 28일",
    readTime: "8분",
    likes: 203,
    author: {
      name: "최바다",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 5,
    title: "이스탄불 그랜드 바자르 쇼핑",
    excerpt: "동서양이 만나는 이스탄불에서 경험하는 특별한 쇼핑 여행.",
    image: "/placeholder.svg?height=300&width=400",
    category: "유럽",
    location: "이스탄불, 터키",
    date: "2023년 12월 20일",
    readTime: "4분",
    likes: 67,
    author: {
      name: "정문화",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 6,
    title: "시드니 하버 브리지 클라이밍",
    excerpt: "시드니의 상징적인 하버 브리지에서 경험하는 스릴 넘치는 모험.",
    image: "/placeholder.svg?height=300&width=400",
    category: "오세아니아",
    location: "시드니, 호주",
    date: "2023년 12월 15일",
    readTime: "5분",
    likes: 98,
    author: {
      name: "한모험",
      avatar: "/placeholder-user.jpg",
    },
  },
]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                여행일기
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                홈
              </Link>
              <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                여행기
              </Link>
              <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                팁
              </Link>
              <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                소개
              </Link>
            </nav>
            <Button variant="outline" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              로그인
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Plane className="h-4 w-4 mr-2" />
            새로운 여행 이야기
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            세상의 모든 여행을
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">기록하다</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            특별한 순간들을 담은 여행 이야기와 숨겨진 보석 같은 장소들을 발견해보세요. 당신의 다음 여행에 영감을 줄
            이야기들이 기다리고 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Camera className="h-5 w-5 mr-2" />
              여행기 둘러보기
            </Button>
            <Button size="lg" variant="outline">
              여행 팁 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="여행지나 키워드로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">카테고리:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
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
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {post.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{post.author.name}</p>
                        <p className="text-xs text-slate-500">{post.readTime} 읽기</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-12 text-center">
        <Button variant="outline" size="lg" className="bg-white hover:bg-slate-50">
          더 많은 여행기 보기
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">여행일기</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                세상의 모든 여행을 기록하고 공유하는 공간입니다. 특별한 순간들을 함께 나누어요.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">카테고리</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    아시아
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    유럽
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    아메리카
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    오세아니아
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">정보</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    소개
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    문의
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 여행일기. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
