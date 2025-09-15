import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import bcryptjs from 'bcryptjs'
import path from 'path'

let db: any = null

// Initialize SQLite database
async function getDatabase() {
  if (!db) {
    db = await open({
      filename: path.join(process.cwd(), 'database.sqlite'),
      driver: sqlite3.Database
    })
  }
  return db
}

// Database initialization script
export async function initializeDatabase() {
  const database = await getDatabase()
  
  try {
    // Create hotels table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        location VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        description TEXT,
        address TEXT,
        phone VARCHAR(20),
        email VARCHAR(255),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        check_in_time TIME DEFAULT '15:00:00',
        check_out_time TIME DEFAULT '11:00:00',
        hero_image VARCHAR(500),
        established INTEGER DEFAULT 2024,
        room_count INTEGER DEFAULT 0,
        current_bookings INTEGER DEFAULT 0,
        monthly_revenue DECIMAL(12, 2) DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create rooms table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        number VARCHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        size INTEGER,
        max_guests INTEGER NOT NULL,
        bed_type VARCHAR(50),
        bathrooms INTEGER DEFAULT 1,
        floor INTEGER,
        description TEXT,
        short_description TEXT,
        hero_image VARCHAR(500),
        images TEXT, /* JSON array */
        amenities TEXT, /* JSON array */
        features TEXT, /* JSON array */
        views TEXT, /* JSON array */
        status VARCHAR(50) DEFAULT 'available',
        popular BOOLEAN DEFAULT false,
        rating DECIMAL(3, 2) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(hotel_id, number)
      )
    `)

    // Create guests table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS guests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        avatar VARCHAR(500),
        is_vip BOOLEAN DEFAULT false,
        loyalty_points INTEGER DEFAULT 0,
        loyalty_tier VARCHAR(20) DEFAULT 'Bronze',
        next_tier VARCHAR(20),
        tier_progress INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create bookings table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        confirmation_number VARCHAR(20) UNIQUE NOT NULL,
        guest_id INTEGER REFERENCES guests(id),
        hotel_id INTEGER REFERENCES hotels(id),
        room_id INTEGER REFERENCES rooms(id),
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        guests_count INTEGER NOT NULL,
        nights INTEGER NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        service_fee DECIMAL(10, 2) DEFAULT 0,
        taxes DECIMAL(10, 2) DEFAULT 0,
        discount DECIMAL(10, 2) DEFAULT 0,
        discount_code VARCHAR(50),
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        special_requests TEXT,
        guest_name VARCHAR(255),
        guest_email VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create amenities table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS amenities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        category VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create testimonials table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        rating INTEGER DEFAULT 5,
        comment TEXT NOT NULL,
        date VARCHAR(100),
        avatar VARCHAR(500),
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create packages table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS packages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        duration VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        description TEXT,
        includes TEXT, /* JSON array */
        highlights TEXT, /* JSON array */
        image VARCHAR(500),
        popular BOOLEAN DEFAULT false,
        category VARCHAR(100),
        max_guests INTEGER DEFAULT 2,
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create activities table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        duration VARCHAR(100),
        difficulty VARCHAR(50),
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        category VARCHAR(100),
        includes TEXT, /* JSON array */
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create events table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        event_type VARCHAR(100),
        capacity INTEGER,
        price DECIMAL(10, 2),
        image VARCHAR(500),
        features TEXT, /* JSON array */
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create dining venues table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS dining_venues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotel_id INTEGER REFERENCES hotels(id),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        cuisine VARCHAR(255),
        timing VARCHAR(255),
        location VARCHAR(255),
        description TEXT,
        image VARCHAR(500),
        specialties TEXT, /* JSON array */
        features TEXT, /* JSON array */
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create gallery table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotel_id INTEGER REFERENCES hotels(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500) NOT NULL,
        category VARCHAR(100),
        alt_text VARCHAR(255),
        featured BOOLEAN DEFAULT false,
        order_index INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create blog posts table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        hero_image VARCHAR(500),
        author_name VARCHAR(255),
        author_avatar VARCHAR(500),
        category VARCHAR(100),
        tags TEXT, /* JSON array */
        status VARCHAR(50) DEFAULT 'published',
        published_at DATETIME,
        read_time INTEGER DEFAULT 5,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create admin users table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        role VARCHAR(50) DEFAULT 'admin',
        status VARCHAR(50) DEFAULT 'active',
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create staff table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS staff (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotel_id INTEGER REFERENCES hotels(id),
        name VARCHAR(255) NOT NULL,
        role VARCHAR(100) NOT NULL,
        department VARCHAR(100) NOT NULL,
        avatar VARCHAR(500),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        shift VARCHAR(20) DEFAULT 'morning',
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create service requests table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS service_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_id INTEGER REFERENCES bookings(id),
        room_number VARCHAR(10),
        type VARCHAR(50) NOT NULL,
        priority VARCHAR(20) DEFAULT 'normal',
        description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        requested_time DATETIME,
        contact_number VARCHAR(20),
        assignee_id INTEGER REFERENCES staff(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create system_settings table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS system_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category VARCHAR(100) NOT NULL,
        key VARCHAR(100) NOT NULL,
        value TEXT,
        encrypted BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(category, key)
      )
    `)

    // Insert sample data
    await seedDatabase(database)
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

async function seedDatabase(database: any) {
  try {
    // Check if hotels already exist
    const existingHotels = await database.get('SELECT COUNT(*) as count FROM hotels')
    if (existingHotels.count > 0) {
      console.log('Sample data already exists, skipping seed')
      return
    }

    // Insert sample hotels
    const hotelResult = await database.run(`
      INSERT INTO hotels (name, slug, location, status, description, hero_image, established, room_count, current_bookings, monthly_revenue)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'AI Hotel Lansdowne',
      'lansdowne',
      'Lansdowne, Uttarakhand',
      'active',
      'Nestled in the serene hills of Lansdowne, experience luxury amidst nature\'s tranquility.',
      '/images/hero-ai-hotel.jpg',
      2024,
      24,
      8,
      450000
    ])

    const hotelId = hotelResult.lastID

    // Insert sample rooms
    await database.run(`
      INSERT INTO rooms (hotel_id, number, name, slug, type, category, price, original_price, size, max_guests, bed_type, bathrooms, description, short_description, hero_image, images, amenities, features, views, status, popular, rating, review_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotelId, '101', 'Super Deluxe Valley View', 'super-deluxe-valley-view', 'Super Deluxe', 'deluxe', 8999.00, 9999.00, 450, 3, 'King Size', 1,
      'Spacious luxury room with breathtaking 360° Himalayan views from private balconies',
      'Luxury room with 360° mountain views',
      '/images/luxury-suite.jpg',
      JSON.stringify(['/images/luxury-suite.jpg', '/images/deluxe-room.jpg']),
      JSON.stringify(['360° Mountain Views', 'Private Balcony', 'Smart Electric Lock', 'Mini Refrigerator', 'Electronic Safety Locker', 'Premium Bathroom']),
      JSON.stringify(['Private Balcony', 'Work Desk', 'Seating Area']),
      JSON.stringify(['Mountain View', 'Valley View']),
      'available', true, 4.8, 25
    ])

    await database.run(`
      INSERT INTO rooms (hotel_id, number, name, slug, type, category, price, size, max_guests, bed_type, bathrooms, description, short_description, hero_image, images, amenities, features, views, status, popular, rating, review_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotelId, '102', 'Deluxe Room', 'deluxe-room', 'Deluxe', 'deluxe', 6999.00, 350, 2, 'Queen Size', 1,
      'Comfortable and well-appointed rooms with modern amenities and partial valley views',
      'Comfortable room with modern amenities',
      '/images/deluxe-room.jpg',
      JSON.stringify(['/images/deluxe-room.jpg']),
      JSON.stringify(['Partial Valley View', 'Modern Furnishing', 'Smart Electric Lock', 'Mini Refrigerator', 'Electronic Safety Locker', 'Attached Bathroom']),
      JSON.stringify(['Work Desk', 'Seating Area']),
      JSON.stringify(['Partial Valley View']),
      'available', false, 4.5, 18
    ])

    await database.run(`
      INSERT INTO rooms (hotel_id, number, name, slug, type, category, price, size, max_guests, bed_type, bathrooms, description, short_description, hero_image, images, amenities, features, views, status, popular, rating, review_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotelId, '103', 'Standard Room', 'standard-room', 'Standard', 'standard', 4999.00, 280, 2, 'Double Bed', 1,
      'Cozy and comfortable rooms perfect for budget-conscious travelers without compromising on quality',
      'Cozy room with essential amenities',
      '/images/presidential-suite.jpg',
      JSON.stringify(['/images/presidential-suite.jpg']),
      JSON.stringify(['Garden View', 'Contemporary Design', 'Smart Electric Lock', 'Mini Refrigerator', 'Safety Locker', 'Modern Bathroom']),
      JSON.stringify(['Work Desk']),
      JSON.stringify(['Garden View']),
      'available', false, 4.2, 12
    ])

    // Insert sample amenities
    const amenitiesData = [
      ['Multi-Cuisine Restaurant', 'Fine dining with local and international cuisines', 'UtensilsCrossed', 'dining'],
      ['Spa & Wellness Center', 'Rejuvenating treatments and wellness therapies', 'Sparkles', 'wellness'],
      ['Adventure Activities', 'Trekking, rock climbing, and outdoor adventures', 'Mountain', 'activities'],
      ['Nature Walks', 'Guided walks through pristine mountain trails', 'TreePine', 'activities'],
      ['Photography Tours', 'Capture stunning landscapes with expert guides', 'Camera', 'activities'],
      ['Conference Hall', 'Modern facilities for business meetings and events', 'Users', 'business'],
      ['Free WiFi', 'High-speed internet throughout the property', 'Wifi', 'connectivity'],
      ['24/7 Concierge', 'Round-the-clock assistance and local expertise', 'Clock', 'service']
    ]

    for (const amenity of amenitiesData) {
      await database.run(`
        INSERT INTO amenities (name, description, icon, category)
        VALUES (?, ?, ?, ?)
      `, amenity)
    }

    // Insert sample testimonials
    const testimonialsData = [
      ['Priya Sharma', 'Delhi', 5, 'Absolutely stunning location with exceptional service. The mountain views from our room were breathtaking!', 'December 2024'],
      ['Rajesh Kumar', 'Mumbai', 5, 'Perfect getaway from city life. The staff was incredibly helpful and the amenities exceeded our expectations.', 'November 2024'],
      ['Anita Gupta', 'Bangalore', 5, 'A truly luxurious experience in the heart of nature. Will definitely return for our next vacation!', 'October 2024'],
      ['Vikram Singh', 'Pune', 5, 'The AI-powered services were amazing! Room controls, concierge, everything was seamlessly integrated.', 'September 2024'],
      ['Kavya Menon', 'Chennai', 5, 'Family-friendly environment with activities for everyone. The kids loved the nature walks!', 'August 2024']
    ]

    for (const testimonial of testimonialsData) {
      await database.run(`
        INSERT INTO testimonials (name, location, rating, comment, date)
        VALUES (?, ?, ?, ?, ?)
      `, testimonial)
    }

    // Insert sample packages
    const packagesData = [
      ['Honeymoon Special', 'honeymoon-special', '3 days / 2 nights', 25999, 29999, 'A romantic getaway designed for newlyweds with luxury amenities and intimate experiences', 
       JSON.stringify(['Presidential Suite accommodation', 'Candlelight dinner for two', 'Couples spa session', 'Room decoration with flowers', 'Champagne on arrival', 'Late checkout']),
       JSON.stringify(['Private balcony with mountain views', 'Personalized butler service', 'Photography session', 'Special honeymoon cake']),
       '/images/presidential-suite.jpg', true, 'romance', 2],
      ['Weekend Getaway', 'weekend-getaway', '2 days / 1 night', 18999, null, 'Perfect weekend escape from city life with adventure and relaxation',
       JSON.stringify(['Deluxe Room accommodation', 'All meals included', 'Adventure activities', 'Bonfire evening', 'Nature walk guided tour']),
       JSON.stringify(['Trekking expedition', 'Local cuisine tasting', 'Sunrise point visit', 'Cultural performance']),
       '/images/deluxe-room.jpg', false, 'adventure', 4],
      ['Family Vacation Package', 'family-vacation', '4 days / 3 nights', 45999, null, 'Comprehensive family package with activities for all age groups',
       JSON.stringify(['Two connecting deluxe rooms', 'All meals and snacks', 'Kids activity program', 'Family game sessions', 'Outdoor adventure activities']),
       JSON.stringify(['Kids club activities', 'Family photography', 'Outdoor games', 'Movie night']),
       '/images/luxury-suite.jpg', false, 'family', 6]
    ]

    for (const pkg of packagesData) {
      await database.run(`
        INSERT INTO packages (name, slug, duration, price, original_price, description, includes, highlights, image, popular, category, max_guests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, pkg)
    }

    // Insert sample activities
    const activitiesData = [
      ['Mountain Trekking', 'mountain-trekking', 'Guided trekking expeditions through scenic mountain trails with professional guides', '4-8 hours', 'Moderate', 2500, '/images/hero-ai-hotel.jpg', 'Adventure',
       JSON.stringify(['Professional guide', 'Safety equipment', 'Packed lunch', 'Photography'])],
      ['Rock Climbing', 'rock-climbing', 'Exciting rock climbing adventures suitable for beginners and experienced climbers', '3-5 hours', 'Beginner to Advanced', 3000, '/images/deluxe-room.jpg', 'Adventure',
       JSON.stringify(['Climbing gear', 'Safety harness', 'Professional instructor', 'Certificate'])],
      ['Nature Photography Walk', 'nature-photography-walk', 'Capture stunning landscapes and wildlife with expert photography guidance', '2-3 hours', 'Easy', 1500, '/images/spa.jpg', 'Photography',
       JSON.stringify(['Photography tips', 'Best spot locations', 'Equipment guidance', 'Photo editing basics'])]
    ]

    for (const activity of activitiesData) {
      await database.run(`
        INSERT INTO activities (name, slug, description, duration, difficulty, price, image, category, includes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, activity)
    }

    // Insert sample dining venues
    await database.run(`
      INSERT INTO dining_venues (hotel_id, name, slug, cuisine, timing, location, description, image, specialties, features)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotelId, 'Himalayan Heights Restaurant', 'himalayan-heights-restaurant', 'Indian & Chinese', '7:00 AM - 11:00 PM', 'Rooftop Level',
      'Our signature rooftop restaurant offering panoramic 360° mountain views with authentic Indian and Chinese cuisine',
      '/images/restaurant.jpg',
      JSON.stringify(['Traditional Garhwali Cuisine', 'Authentic Chinese Dishes', 'Fresh Mountain Trout', 'Organic Vegetables', 'Himalayan Tea Collection', 'Local Honey & Dairy']),
      JSON.stringify(['360° Mountain Views', 'Open-Air Dining', 'Indoor & Outdoor Seating', 'Live Cooking Stations', 'Private Dining Areas', 'Weather Protection'])
    ])

    // Insert sample guest
    await database.run(`
      INSERT INTO guests (first_name, last_name, email, phone, is_vip, loyalty_points, loyalty_tier)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, ['John', 'Doe', 'john.doe@example.com', '+91-9876543210', false, 150, 'Bronze'])

    // Insert sample staff
    await database.run(`
      INSERT INTO staff (hotel_id, name, role, department, email, phone, shift, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [hotelId, 'Sarah Johnson', 'Manager', 'Front Desk', 'sarah@ai360hotel.com', '+91-9876543211', 'morning', 'active'])

    // Hash the password properly
    const hashedPassword = await bcryptjs.hash('ai360hotel', 10)

    // Insert default admin user
    await database.run(`
      INSERT INTO admin_users (username, password_hash, email, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `, ['admin', hashedPassword, 'admin@ai360hotel.com', 'Admin', 'User'])

    // Insert sample gallery items
    const galleryData = [
      [hotelId, 'Hotel Exterior', 'Beautiful mountain setting', '/images/hero-ai-hotel.jpg', 'hotel', 'AI Hotel Lansdowne Exterior', true, 1],
      [hotelId, 'Luxury Suite', 'Spacious luxury accommodation', '/images/luxury-suite.jpg', 'rooms', 'Luxury Suite Interior', false, 2],
      [hotelId, 'Rooftop Restaurant', 'Multi-cuisine dining with views', '/images/restaurant.jpg', 'dining', 'Rooftop Restaurant', false, 3],
      [hotelId, 'Presidential Suite', 'Ultimate luxury experience', '/images/presidential-suite.jpg', 'rooms', 'Presidential Suite', false, 4]
    ]

    for (const gallery of galleryData) {
      await database.run(`
        INSERT INTO gallery (hotel_id, title, description, image, category, alt_text, featured, order_index)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, gallery)
    }

    // Insert sample blog posts
    await database.run(`
      INSERT INTO blog_posts (title, slug, excerpt, content, hero_image, author_name, category, tags, published_at, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Welcome to AI Hotel Lansdowne',
      'welcome-to-ai-hotel-lansdowne',
      'Discover the perfect blend of luxury and nature at our flagship property in Lansdowne.',
      'Experience unparalleled luxury amidst the serene mountains of Lansdowne. Our hotel offers breathtaking 360° views of the Himalayas...',
      '/images/hero-ai-hotel.jpg',
      'Hotel Management',
      'News',
      JSON.stringify(['hotel', 'lansdowne', 'luxury', 'mountains']),
      '2024-01-15 10:00:00',
      5
    ])

    console.log('Sample data seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

// Helper functions for database operations
export async function query(sql: string, params: any[] = []) {
  const database = await getDatabase()
  return database.all(sql, params)
}

export async function run(sql: string, params: any[] = []) {
  const database = await getDatabase()
  return database.run(sql, params)
}

export async function get(sql: string, params: any[] = []) {
  const database = await getDatabase()
  return database.get(sql, params)
}

export { getDatabase as pool }
export default getDatabase