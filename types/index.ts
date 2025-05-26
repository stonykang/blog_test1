// 사용자 타입
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

// 블로그 포스트 타입
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  location: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  views: number;
  readTime: number;
}

// 문화행사 타입
export interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  image?: string;
  category: string;
  price?: string;
  organizer: string;
  contactInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 여행소식 타입
export interface TravelNews {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  source: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 히어로 이미지 타입
export interface HeroImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// 댓글 타입
export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
} 