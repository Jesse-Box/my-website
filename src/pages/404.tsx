import React from "react"
import { PageProps, graphql } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"

import Layout from "../components/layout"
import HeaderPage from "../components/page-header"
import PostList from "../components/post-list"

interface Data {
  site: {
    favicon: []
  }
  notFound: {
    seo: []
    title: string
    summary: string
    linkTo: string
    linkLabel: string
  }
}

export default function NotFoundPage(props: PageProps<Data>) {
  const { data } = props

  return (
    <Layout>
      <HelmetDatoCms seo={data.notFound.seo} favicon={data.site.favicon} />
      <HeaderPage
        title={data.notFound.title}
        summary={data.notFound.summary}
        linkTo={data.notFound.linkTo}
        linkLabel={data.notFound.linkLabel}
      />
      <PostList />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    notFound: datoCmsNotFoundNext {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      summary
      linkTo
      linkLabel
    }
  }
`
