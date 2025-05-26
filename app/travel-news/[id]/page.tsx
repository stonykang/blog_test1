"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Eye, Heart, Share2, Tag, MessageCircle, Bookmark, ThumbsUp, User, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 임시 데이터 (실제로는 params.id를 사용해 데이터를 가져올 예정)
const newsData = {
  1: {
    id: 1,
    title: "제주 올레길 새로운 코스 개방",
    content: `제주 올레길 27코스가 새롭게 개방되어 더욱 다양한 트레킹 경험을 제공합니다. 새로운 코스는 제주의 숨겨진 해안선을 따라 조성되어 기존과는 다른 매력을 선사합니다.

이번에 개방된 코스는 총 15km 구간으로, 제주 동쪽 해안의 아름다운 절경을 감상할 수 있습니다. 특히 일출봉과 성산포를 잇는 구간에서는 제주의 대표적인 자연 경관을 한눈에 볼 수 있어 많은 트레커들의 관심을 끌고 있습니다.

## 새로운 코스의 특징

### 1. 해안 절벽 트레일
새로운 27코스는 기존 올레길과 달리 해안 절벽을 따라 조성되어 있어 더욱 역동적인 트레킹 경험을 제공합니다. 파도가 절벽에 부딪히는 장관을 감상하며 걸을 수 있는 특별한 구간입니다.

### 2. 숨겨진 해변 발견
코스 중간중간에는 일반 관광객들이 쉽게 접근하기 어려운 숨겨진 해변들이 있습니다. 이곳에서는 제주의 원시적인 자연을 그대로 느낄 수 있습니다.

### 3. 문화유산과의 만남
트레일 곳곳에는 제주의 전통 문화유산들이 자리하고 있어 자연과 문화를 동시에 체험할 수 있습니다. 특히 해녀들의 작업장과 전통 돌담길을 지나며 제주의 역사를 느낄 수 있습니다.

## 코스 이용 안내

**개방 시간**: 오전 6시 ~ 오후 6시
**소요 시간**: 약 5-6시간
**난이도**: 중급
**준비물**: 트레킹화, 충분한 물, 간식, 우비

새로운 올레길 27코스는 제주 여행의 새로운 매력을 발견할 수 있는 특별한 기회를 제공합니다. 안전한 트레킹을 위해 반드시 준비물을 챙기고, 날씨 상황을 확인한 후 출발하시기 바랍니다.`,
    excerpt: "제주 올레길 27코스가 새롭게 개방되어 더욱 다양한 트레킹 경험을 제공합니다.",
    image: "/placeholder.svg?height=400&width=800",
    source: "제주관광공사",
    author: "제주관광공사 편집팀",
    publishedAt: new Date("2024-01-20"),
    tags: ["올레길", "트레킹", "신규개방", "해안절벽", "자연"],
    views: 1250,
    likes: 89,
    comments: 23,
    readTime: "8분"
  }
}

const relatedNews = [
  {
    id: 2,
    title: "제주 항공편 증편 소식",
    excerpt: "2024년 봄부터 제주 국제공항 항공편이 대폭 증편됩니다.",
    image: "/placeholder.svg?height=200&width=300",
    publishedAt: new Date("2024-01-18"),
    readTime: "5분"
  },
  {
    id: 4,
    title: "제주 해녀문화 유네스코 등재 5주년",
    excerpt: "제주 해녀문화가 유네스코 인류무형문화유산에 등재된 지 5주년을 맞아 다양한 기념행사가 개최됩니다.",
    image: "/placeholder.svg?height=200&width=300",
    publishedAt: new Date("2024-01-12"),
    readTime: "6분"
  },
  {
    id: 5,
    title: "제주 스마트 관광 서비스 확대",
    excerpt: "제주도가 AI와 IoT 기술을 활용한 스마트 관광 서비스를 확대합니다.",
    image: "/placeholder.svg?height=200&width=300",
    publishedAt: new Date("2024-01-10"),
    readTime: "7분"
  }
]



const comments = [
  {
    id: 1,
    author: "트레킹러버",
    avatar: "/placeholder-user.jpg",
    content: "새로운 코스 정말 기대됩니다! 언제 한번 도전해봐야겠어요.",
    publishedAt: new Date("2024-01-21"),
    likes: 12
  },
  {
    id: 2,
    author: "제주도민",
    avatar: "/placeholder-user.jpg",
    content: "지역 주민으로서 새로운 코스가 생겨서 정말 기쁩니다. 많은 분들이 제주의 아름다움을 느끼셨으면 좋겠어요.",
    publishedAt: new Date("2024-01-21"),
    likes: 8
  },
  {
    id: 3,
    author: "산악인",
    avatar: "/placeholder-user.jpg",
    content: "해안 절벽 트레일이라니 정말 흥미롭네요. 안전장비 잘 챙겨서 가야겠습니다.",
    publishedAt: new Date("2024-01-20"),
    likes: 5
  }
]

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")
  
  // 실제로는 params.id를 사용해 데이터를 가져올 예정
  const news = newsData[1 as keyof typeof newsData] // 임시로 첫 번째 뉴스 사용 (params.id: ${params.id})

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

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // 댓글 제출 로직
      console.log("새 댓글:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/travel-news" className="flex items-center text-slate-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>목록으로</span>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <span className="text-sm text-slate-500">여행소식</span>
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

      {/* Article Content */}
      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {news.source}
              </Badge>
              <span>•</span>
              <Calendar className="h-4 w-4" />
              <span>{formatDate(news.publishedAt)}</span>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>{news.readTime} 읽기</span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {news.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-6 leading-relaxed">
              {news.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center justify-between py-4 border-y border-slate-200">
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{news.views.toLocaleString()} 조회</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{news.comments} 댓글</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{news.author}</span>
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
                  {news.likes + (isLiked ? 1 : 0)}
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
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {news.content}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {news.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 py-8 border-y border-slate-200 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              도움이 되었어요 ({news.likes + (isLiked ? 1 : 0)})
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              공유하기
            </Button>
          </div>

          {/* Comments Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              댓글 {comments.length}개
            </h3>
            
            {/* Comment Form */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 mb-6">
              <textarea
                placeholder="댓글을 작성해주세요..."
                value={newComment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
                rows={3}
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                  댓글 작성
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-900">{comment.author}</span>
                        <span className="text-sm text-slate-500">{getTimeAgo(comment.publishedAt)}</span>
                      </div>
                      <p className="text-slate-700 mb-3">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                          <Heart className="h-4 w-4 mr-1" />
                          {comment.likes}
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

      {/* Related Articles */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            관련 소식
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 bg-white border-0">
                <Link href={`/travel-news/${article.id}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span>{article.readTime} 읽기</span>
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