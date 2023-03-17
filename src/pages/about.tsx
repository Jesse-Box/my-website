import React from "react"
import { PageProps, graphql } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import Image, { FluidObject } from "gatsby-image"

import Layout from "../components/Layout"
import HeaderPage from "../components/HeaderPage"

interface Data {
  about: {
    seo: {
      tags: []
    }
    hero: {
      alt: string
      title: string
      fluid: FluidObject
    }
    header: string
    subheader: string
    body: {
      id: string
      model: {
        apiKey: string
      }
      text: string
      media: {
        alt: string
        fluid: FluidObject
        model: {
          apiKey: string
        }
        title: string
      }
    }[]
  }
}

export default function About(props: PageProps<Data>) {
  const { data } = props

  return (
    <Layout>
      <HelmetDatoCms seo={data.about.seo} />
      <article>
        <HeaderPage
          hero={data.about.hero.fluid}
          alt={data.about.hero.alt}
          caption={data.about.hero.title}
          header={data.about.header}
          subheader={data.about.subheader}
        />
        <section className="post">
          {data.about.body.map((block) => (
            <div
              className={
                block.model.apiKey === "visual" ? "post__visual" : "post__text"
              }
              key={block.id}
            >
              {block.model.apiKey === "text" && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: block.text,
                  }}
                />
              )}
              {block.model.apiKey === "visual" && (
                <figure className="post__visual__media">
                  <Image fluid={block.media.fluid} alt={block.media.alt} />
                  <figcaption>{block.media.title}</figcaption>
                </figure>
              )}
            </div>
          ))}
        </section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    about: datoCmsAbout {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      hero {
        alt
        fluid(maxWidth: 1200) {
          ...GatsbyDatoCmsFluid
        }
        title
      }
      header
      subheader
      }
      body {
        ... on DatoCmsText {
          id
          model {
            apiKey
          }
          text
          }
        }
        ... on DatoCmsVisual {
          id
          model {
            apiKey
          }
          media {
            fluid(maxWidth: 1200) {
              ...GatsbyDatoCmsFluid
            }
            title
            alt
          }
        }
      }
    }
  }
`
