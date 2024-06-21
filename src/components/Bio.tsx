import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

interface Data {
  about: {
    title: string
    summary: string
    linkTo: string
    linkLabel: string
  }
}

export default function Bio() {
  const data: Data = useStaticQuery(graphql`
    query {
      about: datoCmsAboutNext {
        title
        summary
        linkTo
        linkLabel
      }
    }
  `)

  return (
    <section className="container intro">
      <h2 className="intro__title">{data.about.title}</h2>
      <h5 className="intro__summary">{data.about.summary}</h5>
      {data.about.linkTo ? (
        <div className="intro__summary">
          <Link to={data.about.linkTo}>{data.about.linkLabel} </Link>
        </div>
      ) : null}
    </section>
  )
}
