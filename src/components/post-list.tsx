import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PostListItem from "./post-list-item"

interface Data {
  posts: {
    edges: {
      nodes: {
        title: string
        summary: string
        slug: string
        id: string
        date: string
        coverImage: {
          alt: string
          gatsbyImageData: any
        }
      }
    }
  }
}

export default function PostList() {
  const data: Data = useStaticQuery(graphql`
    query {
      posts: allDatoCmsPostNext(sort: { date: DESC }) {
        edges {
          node {
            title
            summary
            slug
            id
            date(formatString: "MMMM DD, YYYY")
            coverImage {
              alt
              gatsbyImageData(width: 700)
            }
          }
        }
      }
    }
  `)

  return (
    <section>
      <h6>Recent Posts</h6>
      <ul className="list">
        {data.posts.edges.map(({ node }) => {
          return (
            <PostListItem
              key={node.id}
              coverImageSrc={node.coverImage.gatsbyImageData}
              coverImageAlt={node.coverImage.alt}
              title={node.title}
              summary={node.summary}
              date={node.date}
              to={node.slug}
            />
          )
        })}
      </ul>
    </section>
  )
}
