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
  home: {
    seo: []
  }
  about: {
    title: string
    summary: string
    linkTo: string
    linkLabel: string
  }
}

export default function BlogIndex(props: PageProps<Data>) {
  const { data } = props

  return (
    <Layout>
      <HelmetDatoCms seo={data.home.seo} favicon={data.site.favicon} />
      <HeaderPage
        title={data.about.title}
        summary={data.about.summary}
        linkTo={data.about.linkTo}
        linkLabel={data.about.linkLabel}
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
    home: datoCmsHomeNext {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    about: datoCmsAboutNext {
      title
      summary
      linkTo
      linkLabel
    }
  }
`
