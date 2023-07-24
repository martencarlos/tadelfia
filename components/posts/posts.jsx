
import React from 'react'
import styles from "./posts.module.css"
import "./wordpress.css"
import { getAllPublishedPosts } from '@/lib/wordpressApi'

async function Posts() {

    const {edges} = await getAllPublishedPosts()
    const AllPosts = edges.map(({node}) => node)
  
  return (
    <div className={styles.posts}>
      
        <h1>All posts</h1>
        {AllPosts && AllPosts.map((post) => (
            <div className={styles.post} key={post.postId}>
                <h2>{post.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        ))}
    </div>
  )
}

export default Posts

