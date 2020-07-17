/** @jsx jsx */
import { jsx, Styled, Container } from "theme-ui"
import { PageProps, Link, graphql } from "gatsby"
import Image, { FluidObject } from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

type Data = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
  allMdx: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          image: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
          alt: string
          tags: []
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" description={siteDescription} type="website" />
      <header>
        <Container
          sx={{
            p: [3, 4, 4],
            borderStyle: "solid",
            borderWidth: 0,
            borderColor: "background",
            borderRadius: 2,
          }}
        >
          <Styled.h1>All Posts</Styled.h1>
        </Container>
      </header>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <article
            key={node.fields.slug}
            aria-label="Post Preview"
            sx={{
              p: [3, 4, 4],
              borderStyle: "solid",
              borderWidth: 0,
              borderColor: "muted",
              borderRadius: 2,
            }}
          >
            <header>
              <Styled.h6 aria-label="Published Date">
                {node.frontmatter.date}
              </Styled.h6>
              <Styled.h3 sx={{ pt: 2 }}>
                <Styled.a
                  as={Link}
                  title={title}
                  aria-label="Post Link"
                  to={node.fields.slug}
                >
                  {title}
                </Styled.a>
              </Styled.h3>
            </header>
            <section>
              <Styled.p
                aria-label="Post Description"
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />

              <Container pt={3} pb={3}>
                <Container
                  sx={{
                    borderRadius: 2,
                    borderStyle: "solid",
                    borderWidth: 0,
                    borderColor: "muted",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    alt={node.frontmatter.alt}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                  />
                </Container>
              </Container>
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
      }
    }
  }
`
