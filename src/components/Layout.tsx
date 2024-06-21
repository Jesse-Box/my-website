import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"

import "../styles/global.css"
import Navigation from "./navigation"
import Footer from "./footer"

interface Data {
  site: {
    locales: string
    favicon: any
  }
  home: {
    seo: {
      tags: []
    }
  }
}

interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  const { children } = props

  const data: Data = useStaticQuery(graphql`
    query {
      site: datoCmsSite {
        locales
        favicon: faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      home: datoCmsHome {
        seo: seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
    }
  `)

  return (
    <>
      <HelmetDatoCms favicon={data.site.favicon} seo={data.home.seo}>
        <html lang={data.site.locales} />
      </HelmetDatoCms>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}
