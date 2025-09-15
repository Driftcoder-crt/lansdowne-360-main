
import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Get total counts
    const [hotels] = await query('SELECT COUNT(*) as count FROM hotels')
    const [activeHotels] = await query('SELECT COUNT(*) as count FROM hotels WHERE status = "active"')
    const [comingSoonHotels] = await query('SELECT COUNT(*) as count FROM hotels WHERE status = "coming-soon"')
    const [rooms] = await query('SELECT COUNT(*) as count FROM rooms')
    const [guests] = await query('SELECT COUNT(*) as count FROM guests')
    const [staff] = await query('SELECT COUNT(*) as count FROM staff')
    const [bookings] = await query('SELECT COUNT(*) as count FROM bookings')
    const [packages] = await query('SELECT COUNT(*) as count FROM packages WHERE status = "active"')
    const [activities] = await query('SELECT COUNT(*) as count FROM activities WHERE status = "active"')
    const [testimonials] = await query('SELECT COUNT(*) as count FROM testimonials WHERE status = "active"')
    
    // Get revenue data
    const [revenue] = await query(`
      SELECT 
        COALESCE(SUM(total), 0) as total_revenue,
        COALESCE(SUM(CASE WHEN status = 'confirmed' THEN total ELSE 0 END), 0) as confirmed_revenue
      FROM bookings
    `)
    
    // Get occupancy data
    const [occupancy] = await query(`
      SELECT 
        COUNT(CASE WHEN r.status = 'occupied' THEN 1 END) as occupied_rooms,
        COUNT(*) as total_rooms,
        CASE 
          WHEN COUNT(*) > 0 THEN (COUNT(CASE WHEN r.status = 'occupied' THEN 1 END) * 100.0 / COUNT(*))
          ELSE 0 
        END as occupancy_rate
      FROM rooms r
    `)
    
    // Get recent bookings
    const recentBookings = await query(`
      SELECT 
        b.id,
        b.confirmation_number,
        b.check_in,
        b.check_out,
        b.total,
        b.status,
        g.first_name || ' ' || g.last_name as guest_name,
        h.name as hotel_name,
        r.number as room_number
      FROM bookings b
      LEFT JOIN guests g ON b.guest_id = g.id
      LEFT JOIN hotels h ON b.hotel_id = h.id
      LEFT JOIN rooms r ON b.room_id = r.id
      ORDER BY b.created_at DESC
      LIMIT 10
    `)
    
    // Get monthly revenue trend (last 12 months)
    const monthlyRevenue = await query(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        SUM(total) as revenue,
        COUNT(*) as bookings
      FROM bookings
      WHERE created_at >= date('now', '-12 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month
    `)
    
    const stats = {
      totalHotels: hotels.count,
      activeHotels: activeHotels.count,
      comingSoon: comingSoonHotels.count,
      totalRooms: rooms.count,
      totalGuests: guests.count,
      totalStaff: staff.count,
      totalBookings: bookings.count,
      totalPackages: packages.count,
      totalActivities: activities.count,
      totalTestimonials: testimonials.count,
      totalRevenue: revenue.total_revenue,
      confirmedRevenue: revenue.confirmed_revenue,
      bookingsChange: "+12.5%",
      revenue: `₹${Math.round(revenue.total_revenue / 100000)}L`,
      revenueChange: "+8.3%",
      occupancyRate: `${Math.round(occupancy.occupancy_rate || 0)}%`,
      occupancyStatus: "Above target",
      occupiedRooms: occupancy.occupied_rooms,
      availableRooms: occupancy.total_rooms - occupancy.occupied_rooms,
      recentBookings,
      monthlyRevenue: monthlyRevenue.map(item => ({
        month: item.month,
        revenue: parseFloat(item.revenue || 0),
        bookings: item.bookings
      }))
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
