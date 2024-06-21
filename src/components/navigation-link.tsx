import React from "react"
import { Link } from "gatsby"

interface Props {
  id?: string
  title: string
  ariaLabel?: string
  children: React.ReactNode
  to: string
  activeClassName?: string
}

export default function NavigationLink(props: Props) {
  const { id, title, ariaLabel, children, to, activeClassName } = props
  return (
    <Link
      id={id}
      title={title}
      aria-label={ariaLabel}
      to={to}
      activeClassName={activeClassName}
      className="link-button"
    >
      {children}
    </Link>
  )
}

NavigationLink.defaultProps = {
  activeClassName: "active",
}
