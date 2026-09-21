export type SanityImage = {
  _type?: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export type NewsArticle = {
  _id: string
  _type: 'newsArticle'
  title: string
  titleSi?: string
  slug: { current: string }
  excerpt?: string
  body?: unknown[]
  coverImage?: SanityImage
  category: 'Sports' | 'Academic' | 'Cultural' | 'Alumni' | 'General'
  tags?: string[]
  publishedAt: string
  author?: StaffMember
  featured?: boolean
}

export type Event = {
  _id: string
  _type: 'event'
  title: string
  titleSi?: string
  slug?: { current: string }
  description?: unknown[]
  startDate: string
  endDate?: string
  location?: string
  coverImage?: SanityImage
  type?: 'Academic' | 'Sports' | 'Cultural' | 'Prize Giving' | 'Inter-house' | 'External'
  registrationLink?: string
  isFeatured?: boolean
}

export type StaffMember = {
  _id: string
  _type: 'staffMember'
  name: string
  designation?: string
  department?: string
  photo?: SanityImage
  bio?: string
  email?: string
  order?: number
  isPrincipal?: boolean
}

export type AlumniAchievement = {
  _id: string
  _type: 'alumniAchievement'
  name: string
  batch?: number
  field?: string
  achievement?: string
  photo?: SanityImage
  quote?: string
  linkedIn?: string
  year?: number
}

export type Album = {
  _id: string
  _type: 'album'
  title: string
  slug: { current: string }
  description?: string
}

export type GalleryItem = {
  _id: string
  _type: 'galleryItem'
  title?: string
  image: SanityImage
  album?: Album
  takenAt?: string
  tags?: string[]
  isFeatured?: boolean
}

export type DownloadableResource = {
  _id: string
  _type: 'downloadableResource'
  title: string
  file?: { asset: { url: string } }
  fileUrl?: string
  category?: string
  description?: string
  isPublic?: boolean
}

export type FormSubmission = {
  _id: string
  _type: 'formSubmission'
  formType: 'contact' | 'admission' | 'general'
  name: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  createdAt: string
  read?: boolean
}

export type SiteSettings = {
  _id: string
  _type: 'siteSettings'
  title: string
  description?: string
  contactEmail?: string
  phone?: string
  address?: string
  socialLinks?: { platform: string; url: string }[]
  admissionsOpen?: boolean
  admissionsBanner?: string
}
