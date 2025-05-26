"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Search, Filter, ArrowLeft, Heart, Share2, Eye, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const eventCategories = ["전체", "전통문화", "예술", "음악", "축제", "체험"]
const eventMonths = ["전체", "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

// 임시 데이터 (추후 Firebase에서 가져올 예정)
const culturalEvents = [
  {
    id: 1,
    title: "제주 해녀 문화 체험",
    description: "제주의 전통 해녀 문화를 직접 체험해보는 특별한 프로그램입니다. 해녀 할머니들과 함께하는 물질 체험과 전통 음식 만들기가 포함됩니다.",
    excerpt: "제주의 전통 해녀 문화를 직접 체험해보는 특별한 프로그램입니다.",
    location: "제주시 구좌읍",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-02-15"),
    image: "/placeholder.svg?height=300&width=400",
    category: "전통문화",
    price: "30,000원",
    organizer: "제주해녀박물관",
    contactInfo: "064-782-9898",
    views: 1420,
    likes: 89,
    duration: "4시간"
  },
  {
    id: 2,
    title: "한라산 야생화 사진전",
    description: "한라산에서 피어나는 아름다운 야생화들을 담은 사진전시회입니다. 제주의 자연 생태계를 한눈에 볼 수 있는 기회입니다.",
    excerpt: "한라산에서 피어나는 아름다운 야생화들을 담은 사진전시회입니다.",
    location: "제주도립미술관",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-29"),
    image: "/placeholder.svg?height=300&width=400",
    category: "예술",
    price: "무료",
    organizer: "제주도립미술관",
    contactInfo: "064-710-4300",
    views: 856,
    likes: 67,
    duration: "1시간"
  },
  {
    id: 3,
    title: "제주 민요 콘서트",
    description: "제주의 전통 민요를 현대적으로 재해석한 특별 콘서트입니다. 제주어로 부르는 아름다운 선율을 감상하세요.",
    excerpt: "제주의 전통 민요를 현대적으로 재해석한 특별 콘서트입니다.",
    location: "제주아트센터",
    startDate: new Date("2024-02-20"),
    endDate: new Date("2024-02-20"),
    image: "/placeholder.svg?height=300&width=400",
    category: "음악",
    price: "25,000원",
    organizer: "제주문화예술재단",
    contactInfo: "064-800-9000",
    views: 1250,
    likes: 156,
    duration: "2시간"
  },
  {
    id: 4,
    title: "탐라문화제",
    description: "제주의 역사와 문화를 기념하는 대표적인 축제입니다. 전통 공연, 체험 프로그램, 먹거리 장터 등 다양한 볼거리가 준비되어 있습니다.",
    excerpt: "제주의 역사와 문화를 기념하는 대표적인 축제입니다.",
    location: "탐라문화광장",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-03"),
    image: "/placeholder.svg?height=300&width=400",
    category: "축제",
    price: "무료",
    organizer: "제주특별자치도",
    contactInfo: "064-710-2000",
    views: 2340,
    likes: 234,
    duration: "3일"
  },
  {
    id: 5,
    title: "제주 도자기 만들기 체험",
    description: "제주의 전통 도자기 기법을 배우고 직접 작품을 만들어보는 체험 프로그램입니다. 초보자도 쉽게 참여할 수 있습니다.",
    excerpt: "제주의 전통 도자기 기법을 배우고 직접 작품을 만들어보는 체험 프로그램입니다.",
    location: "제주도예촌",
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-02-25"),
    image: "/placeholder.svg?height=300&width=400",
    category: "체험",
    price: "15,000원",
    organizer: "제주도예협회",
    contactInfo: "064-756-7890",
    views: 678,
    likes: 45,
    duration: "3시간"
  },
  {
    id: 6,
    title: "제주 현대미술 기획전",
    description: "제주 출신 현대 작가들의 작품을 한자리에서 만날 수 있는 특별 기획전입니다. 제주의 현재와 미래를 예술로 표현합니다.",
    excerpt: "제주 출신 현대 작가들의 작품을 한자리에서 만날 수 있는 특별 기획전입니다.",
    location: "제주현대미술관",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    image: "/placeholder.svg?height=300&width=400",
    category: "예술",
    price: "8,000원",
    organizer: "제주현대미술관",
    contactInfo: "064-710-4200",
    views: 934,
    likes: 78,
    duration: "1시간"
  }
]

export default function CulturalEventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedMonth, setSelectedMonth] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = culturalEvents.filter((event) => {
    const matchesCategory = selectedCategory === "전체" || event.category === selectedCategory
    const matchesMonth = selectedMonth === "전체" || 
      (event.startDate.getMonth() + 1) === parseInt(selectedMonth.replace("월", ""))
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesMonth && matchesSearch
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateRange = (startDate: Date, endDate: Date) => {
    if (startDate.getTime() === endDate.getTime()) {
      return formatDate(startDate)
    }
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`
  }

  const getEventStatus = (startDate: Date, endDate: Date) => {
    const now = new Date()
    if (now < startDate) return { status: "예정", color: "bg-blue-600" }
    if (now > endDate) return { status: "종료", color: "bg-gray-500" }
    return { status: "진행중", color: "bg-green-600" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-slate-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>홈으로</span>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-xl font-semibold text-slate-900">문화행사</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-orange-600 transition-colors">
                홈
              </Link>
              <Link href="/cultural-events" className="text-orange-600 font-medium">
                문화행사
              </Link>
              <Link href="/travel-news" className="text-slate-600 hover:text-orange-600 transition-colors">
                여행소식
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-orange-600 transition-colors">
                블로그
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600/10 to-blue-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            제주 <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">문화행사</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            제주의 풍부한 문화와 전통을 체험할 수 있는 다양한 행사들을 만나보세요.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="행사명이나 장소로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus:border-orange-500"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
              {/* Category Filter */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">카테고리:</span>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {eventCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap ${
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
              
              {/* Month Filter */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">월별:</span>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {eventMonths.map((month) => (
                    <Button
                      key={month}
                      variant={selectedMonth === month ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMonth(month)}
                      className={`whitespace-nowrap ${
                        selectedMonth === month 
                          ? "bg-blue-600 hover:bg-blue-700" 
                          : "hover:bg-blue-50"
                      }`}
                    >
                      {month}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Cards Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const eventStatus = getEventStatus(event.startDate, event.endDate)
              return (
                <Card
                  key={event.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                >
                  <Link href={`/cultural-events/${event.id}`}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-slate-700">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${eventStatus.color} text-white`}>
                          {eventStatus.status}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDateRange(event.startDate, event.endDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {event.views.toLocaleString()}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">{event.excerpt}</p>
                      
                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="h-4 w-4" />
                          <span>{event.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="h-4 w-4" />
                          <span>{event.organizer}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-orange-600">{event.price}</span>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Heart className="h-4 w-4" />
                            {event.likes}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                          자세히 보기 →
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">검색 조건에 맞는 행사가 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-12 text-center">
        <Button variant="outline" size="lg" className="bg-white hover:bg-slate-50">
          더 많은 행사 보기
        </Button>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-orange-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            제주 문화행사 소식을 놓치지 마세요
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            새로운 문화행사와 특별한 체험 프로그램 정보를 이메일로 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="bg-white border-slate-200 focus:border-orange-500"
            />
            <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 whitespace-nowrap">
              구독하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 