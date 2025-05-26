"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Eye, Heart, Share2, MapPin, Users, Clock, Phone, Mail, Bookmark, ThumbsUp, User, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 임시 데이터 (실제로는 params.id를 사용해 데이터를 가져올 예정)
const eventData = {
  1: {
    id: 1,
    title: "제주 해녀 문화 체험",
    description: `제주의 전통 해녀 문화를 직접 체험해보는 특별한 프로그램입니다. 해녀 할머니들과 함께하는 물질 체험과 전통 음식 만들기가 포함됩니다.

## 프로그램 소개

제주 해녀문화는 유네스코 인류무형문화유산으로 등재된 소중한 문화유산입니다. 이번 체험 프로그램을 통해 해녀들의 삶과 전통을 직접 경험해보실 수 있습니다.

### 체험 내용

#### 1. 해녀 물질 체험
- 전통 해녀복 착용
- 기본적인 물질 기법 학습
- 해녀 할머니와 함께하는 바다 체험
- 해산물 채취 체험

#### 2. 전통 음식 만들기
- 해녀들이 즐겨 먹던 전통 음식 조리
- 갓 잡은 해산물로 만드는 특별한 요리
- 제주 전통 차 시음

#### 3. 문화 이야기
- 해녀들의 생활사 이야기
- 제주 바다와 해녀의 관계
- 전통 해녀 노래 배우기

## 참가 안내

**일시**: 2024년 2월 15일 (목) 오전 9시 ~ 오후 1시
**장소**: 제주시 구좌읍 해녀의집
**참가비**: 30,000원 (점심 포함)
**정원**: 20명 (선착순)
**준비물**: 편한 복장, 수건, 여벌 옷

## 주의사항

- 수영을 할 줄 아는 분만 참가 가능합니다
- 안전을 위해 구명조끼를 착용합니다
- 날씨에 따라 프로그램이 변경될 수 있습니다
- 참가비는 현장에서 현금으로 결제해주세요

이번 체험을 통해 제주 해녀문화의 소중함을 느끼고, 바다와 함께 살아온 해녀들의 지혜를 배워보세요.`,
    excerpt: "제주의 전통 해녀 문화를 직접 체험해보는 특별한 프로그램입니다.",
    image: "/placeholder.svg?height=400&width=800",
    location: "제주시 구좌읍",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-02-15"),
    category: "전통문화",
    price: "30,000원",
    organizer: "제주해녀박물관",
    contactInfo: "064-782-9898",
    email: "haenyeo@jejumuseum.go.kr",
    views: 1420,
    likes: 89,
    duration: "4시간",
    capacity: "20명",
    rating: 4.8,
    reviews: 156
  }
}

const relatedEvents = [
  {
    id: 2,
    title: "한라산 야생화 사진전",
    excerpt: "한라산에서 피어나는 아름다운 야생화들을 담은 사진전시회입니다.",
    image: "/placeholder.svg?height=200&width=300",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-29"),
    price: "무료"
  },
  {
    id: 3,
    title: "제주 민요 콘서트",
    excerpt: "제주의 전통 민요를 현대적으로 재해석한 특별 콘서트입니다.",
    image: "/placeholder.svg?height=200&width=300",
    startDate: new Date("2024-02-20"),
    endDate: new Date("2024-02-20"),
    price: "25,000원"
  },
  {
    id: 4,
    title: "탐라문화제",
    excerpt: "제주의 역사와 문화를 기념하는 대표적인 축제입니다.",
    image: "/placeholder.svg?height=200&width=300",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-03"),
    price: "무료"
  }
]


const reviews = [
  {
    id: 1,
    author: "김체험",
    avatar: "/placeholder-user.jpg",
    content: "정말 특별한 경험이었습니다! 해녀 할머니들의 이야기를 들으며 제주의 문화를 깊이 이해할 수 있었어요. 물질 체험도 안전하게 잘 진행되었습니다.",
    rating: 5,
    publishedAt: new Date("2024-01-21"),
    likes: 12
  },
  {
    id: 2,
    author: "박문화",
    avatar: "/placeholder-user.jpg",
    content: "아이들과 함께 참여했는데 정말 좋았습니다. 전통 음식도 맛있고, 해녀 할머니들이 친절하게 설명해주셔서 감동받았어요.",
    rating: 5,
    publishedAt: new Date("2024-01-20"),
    likes: 8
  },
  {
    id: 3,
    author: "이전통",
    avatar: "/placeholder-user.jpg",
    content: "제주 여행 중 가장 기억에 남는 체험이었습니다. 해녀문화의 소중함을 느낄 수 있었고, 바다에서의 체험도 잊을 수 없네요.",
    rating: 4,
    publishedAt: new Date("2024-01-19"),
    likes: 5
  }
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newReview, setNewReview] = useState("")
  const [userRating, setUserRating] = useState(0)
  
  // 실제로는 params.id를 사용해 데이터를 가져올 예정
  const event = eventData[1 as keyof typeof eventData] // 임시로 첫 번째 이벤트 사용 (params.id: ${params.id})

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

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "1일 전"
    if (diffDays < 7) return `${diffDays}일 전`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`
    return `${Math.floor(diffDays / 30)}개월 전`
  }

  const getEventStatus = (startDate: Date, endDate: Date) => {
    const now = new Date()
    if (now < startDate) return { status: "예정", color: "bg-blue-600" }
    if (now > endDate) return { status: "종료", color: "bg-gray-500" }
    return { status: "진행중", color: "bg-green-600" }
  }

  const handleSubmitReview = () => {
    if (newReview.trim() && userRating > 0) {
      // 리뷰 제출 로직
      console.log("새 리뷰:", newReview, "평점:", userRating)
      setNewReview("")
      setUserRating(0)
    }
  }

  const eventStatus = getEventStatus(event.startDate, event.endDate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/cultural-events" className="flex items-center text-slate-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>목록으로</span>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <span className="text-sm text-slate-500">문화행사</span>
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

      {/* Event Content */}
      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Event Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {event.category}
              </Badge>
              <Badge className={`${eventStatus.color} text-white`}>
                {eventStatus.status}
              </Badge>
              <span>•</span>
              <Calendar className="h-4 w-4" />
              <span>{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {event.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-6 leading-relaxed">
              {event.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center justify-between py-4 border-y border-slate-200">
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{event.views.toLocaleString()} 조회</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{event.rating} ({event.reviews}개 리뷰)</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{event.organizer}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? 'text-red-600' : 'text-slate-500'} hover:text-red-600`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                  {event.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`${isBookmarked ? 'text-blue-600' : 'text-slate-500'} hover:text-blue-600`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-64 lg:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-white border-0 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4">행사 정보</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <div>
                    <span className="text-sm text-slate-500">일시</span>
                    <p className="font-medium">{formatDateRange(event.startDate, event.endDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <div>
                    <span className="text-sm text-slate-500">장소</span>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <span className="text-sm text-slate-500">소요시간</span>
                    <p className="font-medium">{event.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-orange-600" />
                  <div>
                    <span className="text-sm text-slate-500">정원</span>
                    <p className="font-medium">{event.capacity}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4">참가 신청</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-orange-600">{event.price}</span>
                  <p className="text-sm text-slate-500">1인당 참가비</p>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  참가 신청하기
                </Button>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{event.contactInfo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{event.email}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Event Description */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 py-8 border-y border-slate-200 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              관심있어요 ({event.likes + (isLiked ? 1 : 0)})
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              공유하기
            </Button>
          </div>

          {/* Reviews Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              참가 후기 {reviews.length}개
            </h3>
            
            {/* Review Form */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">평점</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`h-6 w-6 ${
                        star <= userRating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                      }`}
                    >
                      <Star className="h-6 w-6" />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="참가 후기를 작성해주세요..."
                value={newReview}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewReview(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
                rows={3}
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitReview} disabled={!newReview.trim() || userRating === 0}>
                  후기 작성
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-900">{review.author}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-500">{getTimeAgo(review.publishedAt)}</span>
                      </div>
                      <p className="text-slate-700 mb-3">{review.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                          <Heart className="h-4 w-4 mr-1" />
                          {review.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                          답글
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>

      {/* Related Events */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            관련 행사
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map((relatedEvent) => (
              <Card key={relatedEvent.id} className="group hover:shadow-lg transition-all duration-300 bg-white border-0">
                <Link href={`/cultural-events/${relatedEvent.id}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {relatedEvent.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{relatedEvent.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{formatDateRange(relatedEvent.startDate, relatedEvent.endDate)}</span>
                      <span className="font-medium text-orange-600">{relatedEvent.price}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 