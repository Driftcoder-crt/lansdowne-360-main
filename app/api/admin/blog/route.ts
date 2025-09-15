import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET() {
  try {
    const posts = await query(`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
    `)
    
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

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      excerpt,
      content,
      heroImage,
      authorName,
      category,
      tags = [],
      status,
      readTime
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined
    const publishedAt = status === 'published' && !await get('SELECT published_at FROM blog_posts WHERE id = ?', [id]).then(r => r?.published_at) 
      ? new Date().toISOString() : undefined

    let updateQuery = `
      UPDATE blog_posts 
      SET title = ?, slug = ?, excerpt = ?, content = ?, hero_image = ?, 
          author_name = ?, category = ?, tags = ?, status = ?, read_time = ?,
          updated_at = CURRENT_TIMESTAMP
    `
    let updateParams = [
      title, slug, excerpt, content, heroImage, authorName,
      category, JSON.stringify(tags), status, readTime
    ]

    if (publishedAt) {
      updateQuery += ', published_at = ?'
      updateParams.push(publishedAt)
    }

    updateQuery += ' WHERE id = ?'
    updateParams.push(id)

    await run(updateQuery, updateParams)

    const updatedPost = await get('SELECT * FROM blog_posts WHERE id = ?', [id])

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    await run('DELETE FROM blog_posts WHERE id = ?', [id])

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}