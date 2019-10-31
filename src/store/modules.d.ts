export interface Profile {
  username: string
  bio?: string
  image?: string
  following: boolean
}

export interface User {
  email: string
  token: string
  username: string
  bio?: string
  image?: string
}

export interface Tag {
  tags: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}

// REQUEST BODY

export interface AuthRequestBody {
  email: string
  password: string
}

export interface RegisterRequestBody {
  username: string
  email: string
  password: string
}

export interface ArticleRequestBody {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface SettingsRequestBody {
  email: string,
  bio?: string,
  image?: string
  username: string
  password: string
}

// REQUEST RESPONSE

export interface AuthRequestResponse {
  user: User
}

export interface ArticleResponse {
  articles: Article[]
  articlesCount: number
}

// FORMS
export interface ArticleRequestFilter {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

export interface SettingsForm extends SettingsRequestBody {
  confirmPassword: string
  oldPassword: string
}
