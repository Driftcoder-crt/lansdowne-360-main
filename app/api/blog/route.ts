import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    
    let sqlQuery = `
      SELECT * FROM blog_posts 
      WHERE status = 'published'
    `
    
    const params = []
    
    if (category) {
      sqlQuery += ' AND category = ?'
      params.push(category)
    }
    
    sqlQuery += ' ORDER BY published_at DESC'
    
    if (limit) {
      sqlQuery += ' LIMIT ?'
      params.push(parseInt(limit))
    }
    
    const posts = await query(sqlQuery, params)
    
    // Parse JSON fields
    const processedPosts = posts.map((post: any) => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
    }))

    return NextResponse.json(processedPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      excerpt,
      content,
      heroImage,
      authorName,
      category,
      tags = [],
      status = 'published',
      readTime = 5
    } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const publishedAt = status === 'published' ? new Date().toISOString() : null

    const result = await run(`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, hero_image, author_name, 
        category, tags, status, published_at, read_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, slug, excerpt, content, heroImage, authorName,
      category, JSON.stringify(tags), status, publishedAt, readTime
    ])

    const newPost = await get('SELECT * FROM blog_posts WHERE id = ?', [result.lastID])

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}