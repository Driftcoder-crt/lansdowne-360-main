export interface Guest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  isVIP: boolean
  loyaltyPoints: number
  loyaltyTier: "Bronze" | "Silver" | "Gold" | "Platinum"
  nextTier?: string
  tierProgress: number
}

export interface Hotel {
  id: string
  name: string
  slug: string
  location: string
  status: "active" | "coming-soon" | "inactive"
  heroImage: string
  description: string
  address: string
  phone: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  amenities: string[]
  checkInTime: string
  checkOutTime: string
  policies: string[]
  gallery: GalleryItem[]
  rooms: Room[]
  dining: DiningVenue[]
  experiences: Experience[]
  events: EventSpace[]
  createdAt: string
  updatedAt: string
}

export interface Room {
  id: string
  hotelId: string
  name: string
  slug: string
  type: string
  category: "deluxe" | "suite" | "presidential" | "villa"
  price: number
  originalPrice?: number
  size: number
  maxGuests: number
  bedType: string
  bathrooms: number
  floor?: number
  description: string
  shortDescription: string
  heroImage: string
  images: string[]
  amenities: RoomAmenity[]
  features: string[]
  views: string[]
  status: "available" | "maintenance" | "inactive"
  popular?: boolean
  rating: number
  reviewCount: number
}

export interface RoomAmenity {
  name: string
  icon: string
  category: "comfort" | "technology" | "bathroom" | "entertainment" | "service"
}

export interface DiningVenue {
  id: string
  hotelId: string
  name: string
  slug: string
  type: "restaurant" | "bar" | "cafe" | "room-service"
  cuisine: string[]
  description: string
  heroImage: string
  images: string[]
  openingHours: {
    [key: string]: { open: string; close: string; closed?: boolean }
  }
  capacity: number
  priceRange: "$" | "$$" | "$$$" | "$$$$"
  menu?: MenuItem[]
  chef?: {
    name: string
    bio: string
    image: string
  }
  reservationRequired: boolean
  dressCode?: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  dietary: string[]
  spiceLevel?: number
  image?: string
}

export interface Experience {
  id: string
  hotelId?: string
  name: string
  slug: string
  category: "adventure" | "wellness" | "cultural" | "spiritual" | "nature" | "luxury"
  description: string
  shortDescription: string
  duration: string
  price: number
  maxParticipants: number
  difficulty: "easy" | "moderate" | "challenging"
  includes: string[]
  heroImage: string
  images: string[]
  location: string
  seasonality?: string[]
  bookingRequired: boolean
}

export interface EventSpace {
  id: string
  hotelId: string
  name: string
  slug: string
  type: "wedding" | "conference" | "banquet" | "outdoor" | "intimate"
  capacity: {
    theater: number
    classroom: number
    banquet: number
    cocktail: number
  }
  size: number
  description: string
  heroImage: string
  images: string[]
  amenities: string[]
  packages: EventPackage[]
  pricing: {
    halfDay: number
    fullDay: number
    hourly?: number
  }
}

export interface EventPackage {
  name: string
  description: string
  price: number
  includes: string[]
  duration: string
}

export interface GalleryItem {
  id: string
  hotelId?: string
  title: string
  description?: string
  image: string
  category: "rooms" | "dining" | "amenities" | "events" | "exterior" | "experiences" | "weddings"
  tags: string[]
  featured: boolean
  order: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  heroImage: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  category: string
  tags: string[]
  status: "draft" | "published" | "scheduled"
  publishedAt: string
  readTime: number
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export interface Page {
  id: string
  title: string
  slug: string
  content: PageBlock[]
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    ogImage?: string
  }
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
}

export interface PageBlock {
  id: string
  type: "hero" | "text" | "image" | "gallery" | "cta" | "testimonials" | "rooms" | "amenities"
  content: any
  order: number
  settings: {
    background?: string
    padding?: string
    margin?: string
    fullWidth?: boolean
  }
}

export interface SiteSettings {
  siteName: string
  tagline: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  font: string
  contactInfo: {
    phone: string
    email: string
    address: string
    whatsapp: string
  }
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
  bookingUrl: string
  analytics: {
    googleAnalytics?: string
    facebookPixel?: string
  }
  seo: {
    defaultMetaTitle: string
    defaultMetaDescription: string
    keywords: string[]
  }
}

export interface Navigation {
  id: string
  label: string
  href: string
  type: "internal" | "external" | "dropdown"
  children?: Navigation[]
  order: number
  visible: boolean
}

export interface Amenity {
  name: string
  icon: string
}

export interface Booking {
  id: string
  confirmationNumber: string
  guest: Guest
  room: Room
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  subtotal: number
  serviceFee: number
  taxes: number
  discount?: number
  discountCode?: string
  total: number
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled"
  paymentStatus: "pending" | "paid" | "refunded"
  paymentMethod: string
  specialRequests?: string
  createdAt: string
}

export interface MaintenanceRecord {
  id: string
  type: string
  date: string
  status: "pending" | "in-progress" | "completed"
  description: string
  assignee?: string
}

export interface ServiceRequest {
  id: string
  roomNumber: string
  type: "housekeeping" | "room-service" | "maintenance" | "concierge" | "spa" | "transportation"
  priority: "low" | "normal" | "high" | "urgent"
  description: string
  status: "pending" | "assigned" | "in-progress" | "completed"
  requestedTime?: string
  contactNumber?: string
  assignee?: Staff
  createdAt: string
}

export interface Staff {
  id: string
  name: string
  role: string
  department: string
  avatar?: string
  email: string
  phone: string
  shift: "morning" | "afternoon" | "night"
  status: "active" | "break" | "off-duty"
}

export interface Testimonial {
  id: string
  name: string
  title: string
  content: string
  rating: number
  avatar?: string
  date: string
}

export interface BookingData {
  checkIn: Date
  checkOut: Date
  guests: number
  rooms: number
}

export interface GuestInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests?: string
}

export interface SearchCriteria {
  checkIn: Date
  checkOut: Date
  guests: number
  rooms: number
}