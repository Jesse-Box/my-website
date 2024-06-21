import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { StructuredText } from "react-datocms"

export default function PostBody({ content }) {
  return (
    <section className="post">
      <StructuredText
        data={content}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case "DatoCmsVisual":
              return (
                <div className="post__visual">
                  <GatsbyImage image={record.image.gatsbyImageData} />
                </div>
              )
            case "DatoCmsExternalEmbed":
              return (
                <div className="post__visual">{record.externalVideo.url}</div>
              )
            default:
              return (
                <>
                  <p>Don't know how to render a block!</p>
                  <pre>{JSON.stringify(record, null, 2)}</pre>
                </>
              )
          }
        }}
      />
    </section>
  )
}
