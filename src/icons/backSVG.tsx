import React, { ReactElement } from "react"

interface Props {
  style?: React.CSSProperties;
}

const BackSVG = ({ style }: Props): ReactElement => (
  <div style={style}>
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0C8.50658 0 0 8.50658 0 19C0 29.4934 8.50658 38 19 38C29.4934 38 38 29.4934 38 19C38 8.50658 29.4934 0 19 0ZM19 35.625C9.81825 35.625 2.375 28.1817 2.375 19C2.375 9.81825 9.81825 2.375 19 2.375C28.1817 2.375 35.625 9.81825 35.625 19C35.625 28.1817 28.1817 35.625 19 35.625Z" fill="white"/>
      <path d="M21.7194 8.6687L12.2194 18.1687C11.7589 18.6319 11.7589 19.3799 12.2194 19.8431L21.7194 29.3431L23.3937 27.6568L14.7369 18.9999L23.3937 10.3431L21.7194 8.6687Z" fill="white"/>
    </svg>
  </div>
)

export default BackSVG