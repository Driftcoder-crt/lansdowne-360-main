import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // First check if amenities table exists, if not return static data
    const tableExists = await query(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='amenities'
    `)
    
    if (tableExists.length === 0) {
      // Return static amenities data if table doesn't exist
      const staticAmenities = [
        {
          id: 1,
          name: "Multi-Cuisine Restaurant",
          description: "Fine dining with local and international cuisines",
          icon: "UtensilsCrossed",
          category: "dining",
        },
        {
          id: 2,
          name: "Spa & Wellness Center",
          description: "Rejuvenating treatments and wellness therapies",
          icon: "Sparkles",
          category: "wellness",
        },
        {
          id: 3,
          name: "Adventure Activities",
          description: "Trekking, rock climbing, and outdoor adventures",
          icon: "Mountain",
          category: "activities",
        },
        {
          id: 4,
          name: "Nature Walks",
          description: "Guided walks through pristine mountain trails",
          icon: "TreePine",
          category: "activities",
        },
        {
          id: 5,
          name: "Photography Tours",
          description: "Capture stunning landscapes with expert guides",
          icon: "Camera",
          category: "activities",
        },
        {
          id: 6,
          name: "Conference Hall",
          description: "Modern facilities for business meetings and events",
          icon: "Users",
          category: "business",
        },
        {
          id: 7,
          name: "Free WiFi",
          description: "High-speed internet throughout the property",
          icon: "Wifi",
          category: "connectivity",
        },
        {
          id: 8,
          name: "24/7 Concierge",
          description: "Round-the-clock assistance and local expertise",
          icon: "Clock",
          category: "service",
        },
      ]
      return NextResponse.json(staticAmenities)
    }
    
    const amenities = await query(`
      SELECT * FROM amenities 
      WHERE status = 'active'
      ORDER BY category, name
    `)
    
    return NextResponse.json(amenities)
  } catch (error) {
    console.error('Error fetching frontend amenities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch amenities' },
      { status: 500 }
    )
  }
}