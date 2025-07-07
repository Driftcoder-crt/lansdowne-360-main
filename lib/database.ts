import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import bcrypt from 'bcrypt'
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
        slug VARCHAR(255) UNIQUE NOT NULL,
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
        images TEXT, /* Stored as JSON array */
        amenities TEXT, /* Stored as JSON array of objects with name, icon, category */
        features TEXT, /* Stored as JSON array */
        views TEXT, /* Stored as JSON array */
        status VARCHAR(50) DEFAULT 'available',
        popular BOOLEAN DEFAULT false,
        rating DECIMAL(3, 2) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

    // Create system_settings table for storing integration and other global config
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
      INSERT INTO hotels (name, slug, location, status, description, hero_image)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'AI Hotel Lansdowne',
      'lansdowne',
      'Lansdowne, Uttarakhand',
      'active',
      'Nestled in the serene hills of Lansdowne, experience luxury amidst nature\'s tranquility.',
      '/images/hero-ai-hotel.jpg'
    ])

    const hotelId = hotelResult.lastID

    // Insert sample rooms
    await database.run(`
      INSERT INTO rooms (hotel_id, number, name, slug, type, category, price, size, max_guests, bed_type, bathrooms, description, short_description, hero_image, images, amenities, features, views, status, popular, rating, review_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, [
      hotelId, 
      '101', 
      'Ocean View Suite', 
      'ocean-view-suite',
      'suite', 
      'suite', 
      250.00, 
      450,
      2, 
      'King',
      1,
      'Enjoy breathtaking ocean views from this luxurious suite.', 
      'Enjoy breathtaking ocean views from this luxurious suite.',
      '/room1.jpg',
      JSON.stringify(['/room1.jpg']),
      JSON.stringify([
        { name: 'Ocean View', icon: 'eye', category: 'comfort' },
        { name: 'King Bed', icon: 'bed', category: 'comfort' },
        { name: 'WiFi', icon: 'wifi', category: 'technology' }
      ]),
      JSON.stringify(['Balcony', 'Mini Bar']),
      JSON.stringify(['Ocean']),
      'available',
      false,
      4.5,
      120
    ])

    await database.run(`
      INSERT INTO rooms (hotel_id, number, name, slug, type, category, price, size, max_guests, bed_type, bathrooms, description, short_description, hero_image, images, amenities, features, views, status, popular, rating, review_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, [
      hotelId, 
      '102', 
      'Deluxe Room', 
      'deluxe-room',
      'standard', 
      'deluxe', 
      150.00, 
      350,
      2, 
      'Queen',
      1,
      'A comfortable and well-appointed room for a relaxing stay.', 
      'A comfortable and well-appointed room for a relaxing stay.',
      '/room2.jpg',
      JSON.stringify(['/room2.jpg']),
      JSON.stringify([
        { name: 'Queen Bed', icon: 'bed', category: 'comfort' },
        { name: 'WiFi', icon: 'wifi', category: 'technology' },
        { name: 'Coffee Maker', icon: 'coffee', category: 'service' }
      ]),
      JSON.stringify(['City View', 'Work Desk']),
      JSON.stringify(['City']),
      'available',
      false,
      4.2,
      85
    ])

    await database.run(`
      INSERT INTO rooms (hotel_id, number, name, slug, type, category, price, size, max_guests, bed_type, bathrooms, description, short_description, hero_image, images, amenities, features, views, status, popular, rating, review_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, [
      hotelId, 
      '201', 
      'Presidential Suite', 
      'presidential-suite',
      'presidential', 
      'presidential', 
      500.00, 
      750,
      4, 
      'King',
      2,
      'The ultimate luxury experience with panoramic views.', 
      'The ultimate luxury experience with panoramic views.',
      '/images/presidential-suite.jpg',
      JSON.stringify(['/images/presidential-suite.jpg']),
      JSON.stringify([
        { name: 'Panoramic View', icon: 'eye', category: 'comfort' },
        { name: 'King Bed', icon: 'bed', category: 'comfort' },
        { name: 'WiFi', icon: 'wifi', category: 'technology' },
        { name: 'Jacuzzi', icon: 'droplet', category: 'bathroom' },
        { name: 'Private Bar', icon: 'wine', category: 'service' }
      ]),
      JSON.stringify(['Balcony', 'Living Room', 'Dining Area', 'Private Pool']),
      JSON.stringify(['Mountain', 'Valley']),
      'available',
      true,
      4.9,
      45
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

    await database.run(`
      INSERT INTO staff (hotel_id, name, role, department, email, phone, shift, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [hotelId, 'Mike Wilson', 'Housekeeping Supervisor', 'Housekeeping', 'mike@ai360hotel.com', '+91-9876543212', 'afternoon', 'active'])

    // Hash the password properly
    const hashedPassword = await bcrypt.hash('ai360hotel', 10)

    // Insert default admin user
    await database.run(`
      INSERT INTO admin_users (username, password_hash, email, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `, ['admin', hashedPassword, 'admin@ai360hotel.com', 'Admin', 'User'])

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
