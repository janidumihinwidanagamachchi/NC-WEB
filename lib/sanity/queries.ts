const articleFields = `
  _id,
  _type,
  title,
  titleSi,
  slug,
  excerpt,
  "coverImage": coverImage{asset->{_id,url},alt,hotspot,crop},
  category,
  tags,
  publishedAt,
  featured,
  author->{
    _id, name, designation, photo
  }
`

export const allNewsQuery = `
  *[_type == "newsArticle"] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const featuredNewsQuery = `
  *[_type == "newsArticle" && featured == true] | order(publishedAt desc)[0...6] {
    ${articleFields}
  }
`

export const latestNewsQuery = `
  *[_type == "newsArticle"] | order(publishedAt desc)[0...6] {
    ${articleFields}
  }
`

export const newsBySlugQuery = `
  *[_type == "newsArticle" && slug.current == $slug][0] {
    ${articleFields},
    body[]{
      ...,
      _type == "image" => {
        "asset": asset->{_id,url,metadata{dimensions}}
      }
    }
  }
`

export const relatedNewsQuery = `
  *[_type == "newsArticle" && slug.current != $slug && category == $category] | order(publishedAt desc)[0...3] {
    ${articleFields}
  }
`

export const newsCategoriesQuery = `
  array::unique(*[_type == "newsArticle"].category)
`

export const allEventsQuery = `
  *[_type == "event"] | order(startDate desc) {
    _id, _type, title, titleSi, slug, startDate, endDate, location,
    "coverImage": coverImage{asset->{_id,url},alt},
    type, registrationLink, isFeatured
  }
`

export const upcomingEventsQuery = `
  *[_type == "event" && startDate >= now()] | order(startDate asc)[0...6] {
    _id, _type, title, titleSi, slug, startDate, endDate, location,
    "coverImage": coverImage{asset->{_id,url},alt},
    type, registrationLink, isFeatured
  }
`

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id, _type, title, titleSi, slug, description, startDate, endDate, location,
    "coverImage": coverImage{asset->{_id,url},alt},
    type, registrationLink, isFeatured
  }
`

export const staffQuery = `
  *[_type == "staffMember"] | order(order asc, name asc) {
    _id, name, designation, department, photo, bio, email, order, isPrincipal
  }
`

export const principalQuery = `
  *[_type == "staffMember" && isPrincipal == true][0] {
    _id, name, designation, department, photo, bio, email
  }
`

export const alumniQuery = `
  *[_type == "alumniAchievement"] | order(year desc) {
    _id, name, batch, field, achievement, photo, quote, linkedIn, year
  }
`

export const albumsQuery = `
  *[_type == "album"] | order(title asc) {
    _id, title, slug, description
  }
`

export const galleryQuery = `
  *[_type == "galleryItem"] | order(takenAt desc) {
    _id, title,
    "image": image{asset->{_id,url},alt},
    "album": album->{title, slug},
    takenAt, tags, isFeatured
  }
`

export const galleryByAlbumQuery = `
  *[_type == "galleryItem" && album->slug.current == $slug] | order(takenAt desc) {
    _id, title,
    "image": image{asset->{_id,url},alt},
    "album": album->{title, slug},
    takenAt, tags, isFeatured
  }
`

export const resourcesQuery = `
  *[_type == "downloadableResource" && isPublic == true] | order(title asc) {
    _id, title, "fileUrl": file.asset->url, category, description
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id, title, description, contactEmail, phone, address,
    socialLinks, admissionsOpen, admissionsBanner
  }
`

export const searchQuery = `
  *[_type in ["newsArticle","event","staffMember","alumniAchievement"] && [title, excerpt, name, designation, achievement] match $term] | order(_updatedAt desc) [0...20] {
    _id, _type, title, titleSi, slug, excerpt, name, designation, achievement,
    "coverImage": coverImage{asset->{_id,url},alt},
    publishedAt, startDate
  }
`
