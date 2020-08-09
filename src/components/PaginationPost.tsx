/** @jsx jsx */
import { jsx, Styled, Box } from "theme-ui"

interface Props {
  children: React.ReactNode
}

function PaginationPost(props: Props) {
  const { children } = props
  return (
    <nav>
      <Box p={[3, 4, 4]}>
        <Styled.ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            margin: 0,
            maxWidth: [0, 1, 2],
          }}
        >
          {children}
        </Styled.ul>
      </Box>
    </nav>
  )
}

export default PaginationPost
