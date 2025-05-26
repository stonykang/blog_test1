"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, Users, FileText, Calendar, Image, Settings, BarChart3, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 임시 데이터 (추후 Firebase에서 가져올 예정)
const dashboardStats = {
  totalPosts: 24,
  totalUsers: 156,
  totalEvents: 8,
  totalViews: 12450
}

const recentPosts = [
  {
    id: 1,
    title: "성산일출봉에서 맞이하는 제주의 아침",
    author: "제주탐험가",
    status: "published",
    views: 1250,
    likes: 124,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "한라산 등반 완전 가이드",
    author: "산악인김제주",
    status: "published",
    views: 980,
    likes: 89,
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    title: "제주 겨울 여행 가이드",
    author: "계절여행전문가",
    status: "draft",
    views: 0,
    likes: 0,
    createdAt: "2024-01-08"
  }
]

const recentUsers = [
  {
    id: 1,
    name: "김제주",
    email: "kim@jeju.com",
    role: "user",
    joinedAt: "2024-01-20"
  },
  {
    id: 2,
    name: "이여행",
    email: "lee@travel.com",
    role: "user",
    joinedAt: "2024-01-19"
  },
  {
    id: 3,
    name: "박관리",
    email: "park@admin.com",
    role: "admin",
    joinedAt: "2024-01-18"
  }
]

const recentEvents = [
  {
    id: 1,
    title: "제주 해녀 문화 체험",
    date: "2024-02-15",
    status: "active",
    participants: 25
  },
  {
    id: 2,
    title: "한라산 야생화 사진전",
    date: "2024-02-01",
    status: "active",
    participants: 0
  },
  {
    id: 3,
    title: "제주 민요 콘서트",
    date: "2024-02-20",
    status: "upcoming",
    participants: 12
  }
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">게시됨</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">임시저장</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">진행중</Badge>
      case "upcoming":
        return <Badge className="bg-purple-100 text-purple-800">예정</Badge>
      case "admin":
        return <Badge className="bg-red-100 text-red-800">관리자</Badge>
      case "user":
        return <Badge className="bg-gray-100 text-gray-800">사용자</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/" className="flex items-center text-slate-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">홈으로</span>
              </Link>
              <div className="h-4 sm:h-6 w-px bg-slate-300" />
              <h1 className="text-lg sm:text-xl font-semibold text-slate-900">관리자</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-xs">관리</AvatarFallback>
              </Avatar>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">관리자</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-white/50 h-auto p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">대시보드</span>
              <span className="sm:hidden">대시보드</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">게시글 관리</span>
              <span className="sm:hidden">게시글</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">행사 관리</span>
              <span className="sm:hidden">행사</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">회원 관리</span>
              <span className="sm:hidden">회원</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <Image className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">미디어 관리</span>
              <span className="sm:hidden">미디어</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">설정</span>
              <span className="sm:hidden">설정</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">총 게시글</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalPosts}</div>
                  <p className="text-xs text-muted-foreground">+2 지난 주 대비</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">총 회원</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+12 지난 주 대비</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">진행 중인 행사</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalEvents}</div>
                  <p className="text-xs text-muted-foreground">+1 지난 주 대비</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+1,234 지난 주 대비</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>최근 게시글</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{post.title}</h4>
                        <p className="text-sm text-muted-foreground">by {post.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(post.status)}
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>최근 가입 회원</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      {getStatusBadge(user.role)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Posts Management Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">게시글 관리</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                새 게시글 작성
              </Button>
            </div>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>전체 게시글</CardTitle>
                  <Input placeholder="게시글 검색..." className="w-64" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{post.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>작성자: {post.author}</span>
                          <span>조회수: {post.views}</span>
                          <span>좋아요: {post.likes}</span>
                          <span>작성일: {post.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(post.status)}
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Management Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">행사 관리</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                새 행사 등록
              </Button>
            </div>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>전체 행사</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>날짜: {event.date}</span>
                          <span>참가자: {event.participants}명</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(event.status)}
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">회원 관리</h2>
              <Input placeholder="회원 검색..." className="w-64" />
            </div>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>전체 회원</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">가입일: {user.joinedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(user.role)}
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Management Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">미디어 관리</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                이미지 업로드
              </Button>
            </div>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>히어로 이미지 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">메인 히어로 이미지</p>
                    <p className="text-xs text-muted-foreground">활성화됨</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">편집</Button>
                      <Button size="sm" variant="outline">삭제</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">사이트 설정</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>기본 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">사이트 제목</label>
                    <Input defaultValue="제주여행일기" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">사이트 설명</label>
                    <Input defaultValue="제주도의 아름다운 순간들을 기록하고 공유하는 여행 블로그" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">연락처 이메일</label>
                    <Input defaultValue="info@jejutravel.com" />
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">설정 저장</Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>보안 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">관리자 비밀번호 변경</label>
                    <Input type="password" placeholder="새 비밀번호" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">비밀번호 확인</label>
                    <Input type="password" placeholder="비밀번호 확인" />
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">비밀번호 변경</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 