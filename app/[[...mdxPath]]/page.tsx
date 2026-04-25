import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)

  // Root index uses an absolute title so the "%s | site" template in
  // app/layout.tsx doesn't render "CCA-F 完全対策教科書 | CCA-F 完全対策教科書".
  if (!params.mdxPath || params.mdxPath.length === 0) {
    const title =
      typeof metadata.title === 'string'
        ? metadata.title
        : 'CCA-F 完全対策教科書'
    return { ...metadata, title: { absolute: title } }
  }
  return metadata
}

type PageProps = Readonly<{
  params: Promise<{ mdxPath: string[] }>
}>

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata, sourceCode } = result
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
