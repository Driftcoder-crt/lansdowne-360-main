import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would fetch from the actual booking system
    // For now, we'll return structured data that matches the booking system

    const roomData = {
      rooms: [
        {
          id: "super-deluxe",
          name: "Super Deluxe Room",
          size: "450 sq ft",
          occupancy: 3,
          basePrice: 8999,
          currentPrice: 8999,
          availability: "available",
          features: [
            "360° Mountain Views",
            "Smart Room Controls",
            "Premium Bathroom",
            "Mini Bar",
            "Work Desk",
            "Balcony",
          ],
          images: ["/images/luxury-suite.jpg"],
        },
        {
          id: "deluxe",
          name: "Deluxe Room",
          size: "350 sq ft",
          occupancy: 2,
          basePrice: 6999,
          currentPrice: 6999,
          availability: "available",
          features: ["Mountain Views", "Modern Amenities", "Comfortable Seating", "Work Area", "Balcony"],
          images: ["/images/deluxe-room.jpg"],
        },
        {
          id: "standard",
          name: "Standard Room",
          size: "280 sq ft",
          occupancy: 2,
          basePrice: 4999,
          currentPrice: 4999,
          availability: "available",
          features: ["Garden Views", "Essential Amenities", "Comfortable Bed", "Work Space"],
          images: ["/images/deluxe-room.jpg"],
        },
      ],
      packages: [
        {
          name: "Honeymoon Special",
          duration: "3 days / 2 nights",
          price: 25999,
          includes: ["Super Deluxe Room", "Candlelight Dinner", "Spa Session", "Room Decoration"],
        },
        {
          name: "Weekend Getaway",
          duration: "2 days / 1 night",
          price: 18999,
          includes: ["Deluxe Room", "All Meals", "Adventure Activities", "Bonfire Evening"],
        },
      ],
      bookingUrl: "https://live.ipms247.com/booking/book-rooms-a1360degree",
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(roomData)
  } catch (error) {
    console.error("Booking Data Error:", error)
    return NextResponse.json({ error: "Unable to fetch booking data" }, { status: 500 })
  }
}
