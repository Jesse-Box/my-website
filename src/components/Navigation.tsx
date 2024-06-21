import React from "react"
import NavigationLink from "./navigation-link"

export default function Navigation() {
  return (
    <header className="container container_nav">
      <nav className="nav">
        <ul className="list list_nav">
          <li className="list__item">
            <NavigationLink title="Return Home" aria-label="Return Home" to="/">
              Home
            </NavigationLink>
          </li>
          <li className="list__item">
            <NavigationLink
              title="About me"
              aria-label="About me"
              to="/about"
              activeClassName="active"
            >
              About
            </NavigationLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
