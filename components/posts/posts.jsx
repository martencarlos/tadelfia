"use client"

import React from 'react'
import { getAllPublishedPosts } from '@/lib/wordpressApi'

async function Posts() {

    const {edges} = await getAllPublishedPosts()
    const AllPosts = edges.map(({node}) => node)
    console.log(AllPosts)
  return (
    <div>
    All posts
        {edges && AllPosts.map((post) => (
            <div key={post.postId}>
                <h2>{post.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </div>
        ))}
    </div>
  )
}

export default Posts

