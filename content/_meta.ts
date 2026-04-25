import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: {
    title: 'はじめに',
    type: 'page',
    display: 'hidden'
  },
  '-- 試験ガイド': {
    type: 'separator',
    title: '試験ガイド'
  },
  academy: 'Anthropic Academy',
  scenarios: '6 つの試験シナリオ',
  '-- 5 ドメイン詳解': {
    type: 'separator',
    title: '5 ドメイン詳解'
  },
  'd1-agentic': 'D1: Agentic (27%)',
  'd2-tool-mcp': 'D2: Tool / MCP (18%)',
  'd3-claude-code': 'D3: Claude Code (20%)',
  'd4-prompt-eng': 'D4: Prompt Eng (20%)',
  'd5-context': 'D5: Context (15%)',
  '-- 演習・実践': {
    type: 'separator',
    title: '演習・実践'
  },
  exercises: '公式演習 4 つ',
  'practice-exam': 'Practice Exam',
  '-- まとめ': {
    type: 'separator',
    title: 'まとめ'
  },
  cheatsheet: '用語チートシート',
  antipatterns: 'Anti-patterns 集',
  '-- このサイト': {
    type: 'separator',
    title: 'このサイト'
  },
  about: 'このサイトについて'
}

export default meta
