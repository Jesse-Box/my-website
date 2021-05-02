/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { PageProps, graphql } from "gatsby"
import { FluidObject } from "gatsby-image"
import { HelmetDatoCms } from "gatsby-source-datocms"

import Grid from "../components/Grid"
import Layout from "../components/Layout"
import CardPost from "../components/CardPost"
import BlockText from "../components/BlockText"

interface Data {
  datoCmsHome: {
    seoMetaTags: {
      tags: []
    }
    introNode: {
      childMarkdownRemark: {
        html: string
      }
    }
  }
  allDatoCmsPost: {
    edges: {
      node: {
        slug: string
        title: string
        date: string
        hero: {
          alt: string
          fluid: FluidObject
        }
      }
    }
  }
}

function BlogIndex({ data }: PageProps<Data>) {
  const posts = data.allDatoCmsPost.edges
  const homePage = data.datoCmsHome

  return (
    <Layout>
      <HelmetDatoCms seo={homePage.seoMetaTags} />
      <BlockText html={homePage.introNode.childMarkdownRemark.html} />
      <section>
        <Grid>
          <Styled.p sx={{ gridColumn: "2" }}>Recent Posts</Styled.p>
          <ul sx={{ listStyle: "none", gridColumn: "2", px: 0, m: 0 }}>
            {posts.map(({ node }) => {
              const title = node.title || node.fields.slug
              return (
                <CardPost
                  key={node.slug}
                  date={node.date}
                  title={title}
                  to={node.slug}
                  description={node.seo.description}
                  alt={node.alt}
                  fluid={node.hero.fluid}
                />
              )
            })}
          </ul>
        </Grid>
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      introNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allDatoCmsPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          seo {
            description
          }
          hero {
            alt
            fluid(maxWidth: 800) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`
