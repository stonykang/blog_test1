"use client"

import { useState } from "react"
import { Calendar, Search, ArrowLeft, Tag, Heart, Share2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// 임시 데이터 (추후 Firebase에서 가져올 예정)
const travelNews = [
  {
    id: 1,
    title: "제주 올레길 새로운 코스 개방",
    content: "제주 올레길 27코스가 새롭게 개방되어 더욱 다양한 트레킹 경험을 제공합니다. 새로운 코스는 제주의 숨겨진 해안선을 따라 조성되어 기존과는 다른 매력을 선사합니다. 이번에 개방된 코스는 총 15km 구간으로, 제주 동쪽 해안의 아름다운 절경을 감상할 수 있습니다.",
    excerpt: "제주 올레길 27코스가 새롭게 개방되어 더욱 다양한 트레킹 경험을 제공합니다.",
    image: "/placeholder.svg?height=300&width=400",
    source: "제주관광공사",
    publishedAt: new Date("2024-01-20"),
    tags: ["올레길", "트레킹", "신규개방"],
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "제주 항공편 증편 소식",
    content: "2024년 봄부터 제주 국제공항 항공편이 대폭 증편됩니다. 특히 동남아시아 노선이 확대되어 제주 여행이 더욱 편리해질 예정입니다. 새로운 노선에는 태국, 베트남, 필리핀 등이 포함되어 있어 제주를 경유한 동남아 여행이 활성화될 것으로 예상됩니다.",
    excerpt: "2024년 봄부터 제주 국제공항 항공편이 대폭 증편됩니다.",
    image: "/placeholder.svg?height=300&width=400",
    source: "제주국제공항공사",
    publishedAt: new Date("2024-01-18"),
    tags: ["항공", "교통", "증편"],
    views: 980,
    likes: 67
  },
  {
    id: 3,
    title: "제주 숙박업소 친환경 인증제 도입",
    content: "제주특별자치도가 친환경 숙박업소 인증제를 도입하여 지속가능한 관광을 추진합니다. 인증을 받은 숙박업소에는 다양한 혜택이 제공됩니다. 태양광 발전, 빗물 재활용, 친환경 어메니티 사용 등의 기준을 충족한 업소들이 대상입니다.",
    excerpt: "제주특별자치도가 친환경 숙박업소 인증제를 도입하여 지속가능한 관광을 추진합니다.",
    image: "/placeholder.svg?height=300&width=400",
    source: "제주특별자치도",
    publishedAt: new Date("2024-01-15"),
    tags: ["친환경", "숙박", "인증제"],
    views: 756,
    likes: 45
  },
  {
    id: 4,
    title: "제주 해녀문화 유네스코 등재 5주년",
    content: "제주 해녀문화가 유네스코 인류무형문화유산에 등재된 지 5주년을 맞아 다양한 기념행사가 개최됩니다. 해녀문화의 가치를 재조명하는 특별 전시회도 열립니다. 전시회에서는 해녀들의 일상과 전통 기법, 그리고 현대적 계승 방안 등이 소개됩니다.",
    excerpt: "제주 해녀문화가 유네스코 인류무형문화유산에 등재된 지 5주년을 맞아 다양한 기념행사가 개최됩니다.",
    image: "/placeholder.svg?height=300&width=400",
    source: "제주해녀박물관",
    publishedAt: new Date("2024-01-12"),
    tags: ["해녀문화", "유네스코", "기념행사"],
    views: 1420,
    likes: 156
  },
  {
    id: 5,
    title: "제주 스마트 관광 서비스 확대",
    content: "제주도가 AI와 IoT 기술을 활용한 스마트 관광 서비스를 확대합니다. 실시간 관광지 혼잡도 정보와 개인 맞춤형 여행 코스 추천 서비스가 제공됩니다. 모바일 앱을 통해 날씨, 교통, 맛집 정보까지 통합적으로 제공하여 여행객들의 편의성을 크게 향상시킬 예정입니다.",
    excerpt: "제주도가 AI와 IoT 기술을 활용한 스마트 관광 서비스를 확대합니다.",
    image: "/placeholder.svg?height=300&width=400",
    source: "제주관광공사",
    publishedAt: new Date("2024-01-10"),
    tags: ["스마트관광", "AI", "IoT"],
    views: 892,
    likes: 78
  },
  {
    id: 6,
    title: "제주 겨울 축제 성황리 개최",
    content: "제주 겨울바다 축제가 성황리에 개최되어 많은 관광객들의 호응을 얻었습니다. 특히 겨울 해안가의 아름다운 풍경과 다양한 체험 프로그램이 인기를 끌었습니다. 축제 기간 동안 약 5만 명의 관광객이 방문하여 지역 경제 활성화에도 크게 기여했습니다.",
    excerpt: "제주 겨울바다 축제가 성황리에 개최되어 많은 관광객들의 호응을 얻었습니다.",
    image: "/placeholder.svg?height=300&width=400",
    source: "제주일보",
    publishedAt: new Date("2024-01-08"),
    tags: ["겨울축제", "관광", "체험"],
    views: 634,
    likes: 52
  }
]

export default function TravelNewsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNews = travelNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "1일 전"
    if (diffDays < 7) return `${diffDays}일 전`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`
    return `${Math.floor(diffDays / 30)}개월 전`
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
              <h1 className="text-xl font-semibold text-slate-900">여행소식</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-orange-600 transition-colors">
                홈
              </Link>
              <Link href="/cultural-events" className="text-slate-600 hover:text-orange-600 transition-colors">
                문화행사
              </Link>
              <Link href="/travel-news" className="text-orange-600 font-medium">
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
            제주 <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">여행소식</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            제주 여행과 관련된 최신 소식과 유용한 정보들을 빠르게 만나보세요.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="소식 제목이나 키워드로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200 focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Cards Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <Card
                key={news.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
              >
                <Link href={`/travel-news/${news.id}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-slate-700">
                        {news.source}
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
                      <Badge className="bg-orange-600 text-white">
                        {getTimeAgo(news.publishedAt)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(news.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {news.views.toLocaleString()}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">{news.excerpt}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Heart className="h-4 w-4" />
                        {news.likes}
                      </div>
                      <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                        자세히 보기 →
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">검색 조건에 맞는 소식이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-12 text-center">
        <Button variant="outline" size="lg" className="bg-white hover:bg-slate-50">
          더 많은 소식 보기
        </Button>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-orange-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            제주 여행 소식을 놓치지 마세요
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            최신 제주 여행 정보와 특별한 소식들을 이메일로 받아보세요.
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