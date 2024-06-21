import React from "react"
import { Link } from "gatsby"

interface Props {
  to: string
  rel: string
  title: string
}

export default function ListPost(props: Props) {
  const { to, rel, title } = props
  return (
    <div>
      <h6>{rel === "next" ? `${rel} →` : `← ${rel}`}</h6>
      <Link
        title={title}
        aria-label={rel === "next" ? `Next Article` : `Previous Article`}
        to={to}
        rel={rel}
      >
        {title}
      </Link>
    </div>
  )
}

ListPost.defaultProps = {
  title: "title",
}
