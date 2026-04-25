import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { LocalizedSearch } from '../components/localized-search'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'CCA-F 完全対策教科書',
    template: '%s | CCA-F 完全対策教科書'
  },
  description: 'Unofficial CCA-F (Claude Certified Architect – Foundations) study guide.',
  metadataBase: new URL('https://ccaf.dev'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'CCA-F 完全対策教科書'
  }
}

const banner = (
  <Banner storageKey="cca-f-banner">
    本サイトは Anthropic, PBC と関係のない非公式の学習ガイドです。
  </Banner>
)

const navbar = (
  <Navbar
    logo={<b>CCA-F 完全対策教科書</b>}
    projectLink="https://github.com/yokoto/ccaf-guide"
  />
)

const footer = (
  <Footer>
    <span>
      © {new Date().getFullYear()} ccaf.dev — Unofficial study guide. Not affiliated with or endorsed by Anthropic, PBC.
    </span>
  </Footer>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          footer={footer}
          search={<LocalizedSearch />}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/yokoto/ccaf-guide/blob/main"
          editLink="このページを編集"
          feedback={{ content: null }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
