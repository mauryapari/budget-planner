import Header from '@/components/layout/header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Header/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
