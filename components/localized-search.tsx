'use client'

import { Search } from 'nextra/components'

export function LocalizedSearch() {
  return (
    <Search
      placeholder="このサイト内を検索…"
      emptyResult="一致する結果が見つかりませんでした"
      loading="検索中…"
      errorText="検索インデックスの読み込みに失敗しました"
    />
  )
}
