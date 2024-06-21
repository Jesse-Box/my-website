import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

interface Props {
  key: string
  coverImageSrc?: unknown
  coverImageAlt?: string
  title: string
  summary: string
  date: string
  to: string
}

export default function PostListItem(props: Props) {
  const { key, coverImageSrc, coverImageAlt, title, summary, date, to } = props

  return (
    <li className="post-item" key={key}>
      <figure className="post-item__thumb">
        <GatsbyImage alt={coverImageAlt} image={coverImageSrc} />
      </figure>
      <article>
        <h3>
          <Link title={title} to={to}>
            {title}
          </Link>
        </h3>
        <p className="post-item__summary">{summary}</p>
        <h6>{date}</h6>
      </article>
    </li>
  )
}
