import React from "react"
import { graphql, PageProps } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"

import PageHeader from "../components/page-header"
import Layout from "../components/layout"
import PostBody from "../components/post-body"
import ListPost from "../components/post-suggestions"
import Bio from "../components/bio"

type Data = {
  site: {
    favicon: []
  }
  post: {
    seo: []
    coverImage: {
      alt: string
      title: string
      gatsbyImageData: []
    }
    title: string
    summary: string
    date: string
    content: {
      value: string
      blocks: {
        __typename: string
        id: string
        image: []
      }
    }
  }
  pageContext: {
    next: {
      slug: string
      title: string
    }
    previous: {
      slug: string
      title: string
    }
    slug: string
  }
}

export default function BlogPostTemplate(props: PageProps<Data>) {
  const { data, pageContext } = props

  const { previous, next } = pageContext

  return (
    <Layout>
      <HelmetDatoCms seo={data.post.seo} favicon={data.site.favicon} />
      <article>
        <PageHeader
          coverImageSrc={data.post.coverImage.gatsbyImageData}
          coverImageAlt={data.post.coverImage.alt}
          coverImageCaption={data.post.coverImage.title}
          title={data.post.title}
          summary={data.post.summary}
          date={data.post.date}
        />
        <PostBody content={data.post.content} />
      </article>
      {previous || next ? (
        <nav className="container">
          <ul className="list pagination">
            <li className="list__item pagination__item_prev">
              {previous && (
                <ListPost
                  rel="prev"
                  to={`/${previous.slug}`}
                  title={previous.title}
                />
              )}
            </li>
            <li className="list_item pagination__item_next">
              {next && (
                <ListPost rel="next" to={`/${next.slug}`} title={next.title} />
              )}
            </li>
          </ul>
        </nav>
      ) : null}
      <Bio />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsPostNext(slug: { eq: $slug }) {
      coverImage {
        alt
        gatsbyImageData(width: 1500)
      }
      title
      summary
      date(formatString: "MMMM DD, YYYY")
      content {
        value
        blocks {
          __typename
          id: originalId
          image {
            alt
            gatsbyImageData(width: 1500)
          }
          externalVideo {
            url
          }
        }
      }
      slug
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`
