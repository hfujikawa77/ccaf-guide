# CCA-F 完全対策教科書 — 一括参照版

> このドキュメントは ccaf.dev の全ページをひとつの Markdown ファイルにまとめたものです。
> 本サイトは Anthropic, PBC と関係のない非公式の学習ガイドです。
> Not affiliated with or endorsed by Anthropic, PBC.

---

# CCA-F 完全対策教科書

**Claude Certified Architect – Foundations** の非公式学習ガイド。

> 本サイトは Anthropic, PBC と関係のない非公式の学習ガイドです。
> This is an unofficial study guide. Not affiliated with or endorsed by Anthropic, PBC.

| 問題数 | 試験時間 | 合格スコア | シナリオ |
|:---:|:---:|:---:|:---:|
| **60** | **120 分** | **720** / 1,000 | **6**（うち 4 出題） |

## 試験概要

CCA-F は「本番運用に耐えうる Claude システムをアーキテクチャレベルで設計・実装できるか」を検証する試験です。知識の暗記ではなく **実際の本番環境での判断力** が問われます。

| 項目 | 内容 |
|------|------|
| 形式 | シナリオベース 4 択（60 問）/ ランダムに 4 シナリオ選択 |
| 時間 | 120 分（中断・一時停止不可） |
| 採点 | スケールスコア 100〜1,000 点 / 合格 720 点以上 |
| 受験環境 | ProctorFree 監視付きオンライン。Claude・ドキュメント・ブラウザタブ使用不可 |
| 費用 | $99（Claude Partner Network 会員は無料） |
| 推奨経験 | Claude API・Claude Code・MCP の本番経験 6 ヶ月以上 |

### ドメイン構成

| ドメイン | 配点 |
|---|---:|
| [Domain 1: Agentic Architecture & Orchestration](/d1-agentic) | 27% |
| [Domain 2: Tool Design & MCP Integration](/d2-tool-mcp) | 18% |
| [Domain 3: Claude Code Configuration & Workflows](/d3-claude-code) | 20% |
| [Domain 4: Prompt Engineering & Structured Output](/d4-prompt-eng) | 20% |
| [Domain 5: Context Management & Reliability](/d5-context) | 15% |


> **受験の流れ**
>
> 1. `claude.com/partners` で Partner Network 登録（無料）
> 2. `anthropic.skilljar.com` で Academy コース受講（全コース無料）
> 3. Skilljar 内で公式 Practice Exam（60 問・解説付き）を受験
> 4. Practice Exam で 900 / 1000 以上を安定して出せたら本番予約


## 合格の 3 原則（試験の核心）

合格者・Anthropic 公式ガイドから導出された 3 つの基本的な判断軸です。これを体得すると、見たことのない問題でも正解を導けます。

### 原則 01: 決定論的 vs 確率論的

ビジネスルール・金融操作・必須の順序制御 → **必ずプログラマティック強制**。
プロンプト指示は非ゼロの失敗率があるため、決定論的保証が必要な箇所では使えない。

### 原則 02: 根本原因に最小コストで対処

問題の「最初のステップ」を問われたら、**最も低コストで根本原因に対処するもの** を選ぶ。
オーバーエンジニアリングは誤答。

### 原則 03: コーディネーターが全てを管理

マルチエージェントでは **コーディネーターが唯一の通信ハブ**。
サブエージェント同士の直接通信なし・コンテキスト自動継承なし。

## 合格者が報告する「よく出る罠」Top 10

試験の誤答選択肢は「知識があると選びやすい」anti-pattern で設計されています。以下の 10 パターンを完全に理解することが高得点の鍵です。

| # | 罠 | 正解パターン |
|:---:|---|---|
| 1 | Few-shot でツール順序を強制する | 順序制御は **programmatic な前提ゲート** が正解 |
| 2 | センチメントスコアでエスカレーション | 感情とケース複雑度は無関係。**明示的な基準 + few-shot** |
| 3 | Batch API をブロッキング処理に使用 | pre-merge チェック等 SLA 必要なものは **同期 API 必須** |
| 4 | コンテキストウィンドウを拡大して注意分散（attention dilution）を解決 | サイズ ≠ 注意品質。**per-file パスへ分割** |
| 5 | サブエージェントタイムアウトを「成功・結果は空」として返す | エラー情報なしでコーディネーターが誤判断。**構造化エラー** |
| 6 | 自己レビュー（同じセッション） | 認知バイアスあり。**独立したインスタンス** |
| 7 | 競合ソースの一方を選択 | 出所情報（provenance）が消失。**両方を帰属付きで注釈** |
| 8 | チーム設定を `~/.claude/` に置く | バージョン管理外。**プロジェクトスコープ `.claude/`** |
| 9 | 全エージェントに全ツールを付与 | 4〜5 個を超えるとツール選択信頼性低下 |
| 10 | 「be conservative」等の曖昧な指示 | 効果なし。**具体的なカテゴリ基準** |


> 試験では、上記の罠が「知識がある受験者ほど選びやすい」形で誤答選択肢に紛れ込みます。各罠について **「なぜ罠なのか」の理由まで** 言語化できる状態を目指してください。


## 次に読むべきページ

- [Anthropic Academy コースガイド](/academy) — 試験対策の推奨受講順序
- [Foundation（前提知識）](/foundation) — Claude API・tool_use・コンテキストウィンドウの基礎（独学者向け）
- [6 つの試験シナリオ](/scenarios) — 試験で問われるシナリオの全詳細
- [Domain 1: Agentic（最重要）](/d1-agentic) — 配点 27%
- [このサイトについて](/about) — 著者・ライセンス・更新方針

---

# Foundation: 5 ドメインに入る前に

CCA-F は **「Claude API・Claude Code・MCP の本番経験 6 ヶ月以上」** を推奨経験としています。実務で十分な経験があれば D1 から読み始めて構いませんが、独学で対策する場合は本ページの 3 つの前提知識（API 構造・tool_use のエラー区別・コンテキスト品質）を先に押さえると以降のドメインが理解しやすくなります。


> **このページの位置づけ**
>
> D1〜D5 はそれぞれ「エージェンティックループの実装」「ツール記述設計」「フックパターン」のように **特定の判断軸** を扱います。本ページはこれらの判断軸が前提とする **API レベルの語彙** を最小限に揃えるものです。試験そのものではなく、ドメインページを読みやすくするための足場です。


## F.1 Claude API の基本構造

Claude API はステートレスな request-response モデルです。**会話履歴はクライアント側が保持して毎回送信** します（API 側にはセッションの概念がない）。

```ts
const response = await client.messages.create({
  model: 'claude-opus-4-7',          // モデル ID（4.6 → 4.7 で更新あり）
  max_tokens: 4096,
  system: 'あなたは...',             // システムプロンプト（任意）
  messages: [
    { role: 'user', content: '...' },
    { role: 'assistant', content: '...' },
    { role: 'user', content: '...' }, // 過去のやりとりを毎回再送する
  ],
  tools: [...]                        // ツール定義（任意・後述）
});

// レスポンスの構造
response.content       // ContentBlock[] — text や tool_use が並ぶ
response.stop_reason   // "end_turn" | "tool_use" | "max_tokens" | "stop_sequence"
response.usage         // 入出力トークン数
```

| フィールド | 役割 | 試験での頻出論点 |
|---|---|---|
| `messages` | 会話履歴。`role: 'user' \| 'assistant'` を交互に並べる | 会話履歴は API 側に保持されない。**毎ターン全履歴を再送する必要がある**。Agent SDK でサブエージェントを使う場合、この性質が「コンテキストは明示的に渡す」設計に直結する（→ [D1.4](/d1-agentic#14-サブエージェントへのコンテキスト渡し)） |
| `system` | 役割や制約を指定するシステムプロンプト | ビジネスルールの強制には **不向き**（プロンプト指示は非ゼロの失敗率がある） |
| `tools` | LLM が呼び出せるツールの JSON Schema 定義 | description が **ツール選択** の唯一の主要機構 |
| `stop_reason` | ループを継続すべきか終了すべきかの判断材料 | `tool_use` で継続、`end_turn` で終了。**自然言語判定は罠** |

## F.2 `tool_use` の 2 種類のエラー

Claude が `tool_use` ブロックを返すとき、JSON Schema バリデーションは **構文エラー（syntax）** を防ぎますが、**意味エラー（semantic）** は防ぎません。試験ではこの 2 種類の区別が複数の問題で問われます。

| エラー種類 | 何が検出される | 何が検出されない |
|---|---|---|
| **構文エラー** | フィールド型不一致、required フィールド欠落、enum 値違反 | — |
| **意味エラー** | — | line items の合計 ≠ 総額、日付が過去、商品 ID と顧客の組み合わせ矛盾 |

```ts
// ✅ JSON Schema で防げる構文エラーの例
const schema = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
    currency: { type: 'string', enum: ['USD', 'JPY', 'EUR'] }
  },
  required: ['amount', 'currency']
};
// → currency: "GBP" は enum 違反で拒否される

// ❌ JSON Schema で防げない意味エラーの例
{
  "line_items": [{ "price": 100 }, { "price": 200 }],
  "total": 500   // ← 構文的に valid だが合計が一致しない
}
// → ツール実行側でビジネスバリデーションが必須
```


> **意味エラーへの対処は構造化エラーとして返す**
>
> 意味エラーをツール側で検出したら、`` のように構造化して返す。エラー結果は `tool_result` ブロックとして次の `messages.create` 呼び出しに含まれ、LLM はそれを見て修正された `tool_use` を生成する（**retry-with-error-feedback** パターン）。エラーメッセージを汎用化（`"Validation failed"` のみ）すると修正に必要な情報が欠落する。


## F.3 コンテキストウィンドウは「サイズ」ではなく「品質」

Claude のコンテキストウィンドウは大きい（モデルにより 200K〜1M トークン）ですが、**サイズが大きいことと、注意品質が高いことは別の話** です。試験では「コンテキストを拡大して問題を解決」が誤答として頻出します。

### 注意分散（attention dilution）

長い入力に重要情報を埋め込むと、LLM がその情報を見落とす確率が上がります。特に「中間部分」が見落とされやすい現象は **Lost in the Middle** と呼ばれます（詳細は [D5.1](/d5-context#51-コンテキスト管理)）。

| ❌ 罠 | ✅ 正解 |
|---|---|
| 「コンテキストウィンドウが 200K あるので全文書を含める」 | 関連フィールドのみにトリミング、または per-file 分割パスで処理 |
| 「コンテキストウィンドウを拡大すれば矛盾が解消する」 | サイズ ≠ 注意品質。**マルチパスレビュー**（ファイル別 → 統合）で品質を担保 |
| 「ツール出力の全 40 フィールドをそのまま渡す」 | 後続判断に必要な 5 フィールドだけ抽出してコンテキストに追加 |

### コンテキストの 3 つの構成要素

ドメインページで頻出する「コンテキスト管理」は、以下の 3 種類の情報を区別して扱うことを意味します。

| 種類 | 例 | 圧縮の可否 |
|---|---|---|
| **Transactional facts** | 金額・日付・ID・顧客情報 | **不可**（要約で失われると判断不能） |
| **Provenance（出所情報）** | source URL、公開日、抜粋 | **不可**（claim と source の対応が崩れる） |
| **中間思考・全文ツール出力** | 試行錯誤、検討して採用しなかった選択肢、API レスポンスの未使用フィールド | **条件付きで可**（Scratchpad 退避や削除は安全。要約による圧縮は数値・固有名詞の精度劣化リスクあり） |

詳細な圧縮戦略は [D5.4](/d5-context#54-コンテキスト圧縮戦略) で扱います。

## 次に読むべきページ

- [Domain 1: Agentic（最重要・配点 27%）](/d1-agentic) — エージェンティックループ・マルチエージェント設計
- [Domain 2: Tool / MCP](/d2-tool-mcp) — ツール記述設計と構造化エラー
- [合格の 3 原則](/) — 試験を通底する 3 つの判断軸

---

# Domain 1: Agentic Architecture & Orchestration

**配点 27%（最重要）** — Task 1.1〜1.7

## 1.1 エージェンティックループの実装


> **[図] 図1-1: 正しいエージェンティックループ制御フロー**


```ts
// 正しいエージェンティックループ（TypeScript）
const messages: Message[] = [...];
while (true) {
  const response = await client.messages.create({ model, tools, messages });

  // stop_reasonで分岐
  if (response.stop_reason === "end_turn") break;  // ✅ 終了

  if (response.stop_reason === "tool_use") {
    messages.push({ role: "assistant", content: response.content });
    const toolResults = await executeTools(response.content);
    messages.push({ role: "user", content: toolResults }); // 履歴に追加
  }
}
// ❌ Anti-pattern: if (text.includes("完了")) break;  → 自然言語で判定
// ❌ Anti-pattern: for (let i=0; i<10; i++) { ... }   → 固定回数が主要停止機構
```

## 1.2 マルチエージェント Hub-and-Spoke


> **[図] 図1-2: Hub-and-Spoke マルチエージェントアーキテクチャ（正しい設計）**


| 重要設定・概念 | 説明 |
|---|---|
| `allowedTools: ["Task"]` | コーディネーターがサブエージェントを生成するために必須の設定 |
| 並列実行 | 1 つのレスポンスで複数の Task 呼び出しを発行 → 同時実行。別ターンにすると順次実行になる |
| コンテキスト渡し | 前のエージェントの結果をサブエージェントプロンプトに直接含める。構造化フォーマット推奨 |
| 反復精製 | コーディネーターが合成出力のギャップを評価し、必要に応じて再委譲してカバレッジを向上させる |


> **サブエージェント description の設計（コーディネーターによる選択の唯一の根拠）**
>
> コーディネーターはサブエージェントの `description` フィールドを唯一の根拠として委譲先を選択します。これはツール選択と同じメカニズムです。**「Search Agent」「Analysis Agent」のような最小限の名前だけでは類似サブエージェント間で誤選択が発生** します。良い description には ① このエージェントが扱うタスクの種類 ② 入力として受け取るべき情報 ③ 出力フォーマット ④ 類似エージェントとの境界線、を含めます。


| ❌ 最小限 | ✅ 良い記述 |
|---|---|
| `search_agent`: "Searches the web"<br/>`analysis_agent`: "Analyzes documents"<br/>→ コーディネーターが境界を判断できず誤委譲 | `search_agent`: "Web 上の最新情報を検索。クエリ＋日付範囲を受け取り、URL・抜粋・公開日を返す。社内ドキュメント検索には analysis_agent を使うこと"<br/>→ 境界が明確 |

## 1.3 並列 vs 順次サブエージェント実行


> **[図] 図1-3: 並列実行（1レスポンス内）vs 順次実行（複数ターン）**


| パターン | 使いどころ | 実装方法 |
|---|---|---|
| **並列実行**（推奨） | サブタスク同士に依存関係がない（独立検索・独立分析・独立要約） | 1 つの assistant レスポンスの `content` 配列に複数の `tool_use`（Task 呼び出し）を含める |
| **順次実行** | 後段が前段の結果に依存する（検索結果を分析エージェントに渡すなど） | 1 ターンに 1 Task 呼び出し → 結果を待つ → 次ターンで次 Task 呼び出し |


> **試験頻出の罠：常に順次実行する設計**
>
> 独立タスクを順次実行すると **レイテンシが線形に増加** する。「独立した 4 つの調査をそれぞれ別ターンで実行」は誤り。1 レスポンスで全 Task 呼び出しを発行すれば並列実行される。逆に、依存関係があるタスクを並列化すると、後段が古い情報で動作するバグが発生する。


## 1.4 サブエージェントへのコンテキスト渡し


> **最重要原則：サブエージェントはコンテキストを自動継承しない**
>
> コーディネーターの会話履歴・前のサブエージェントの結果・ユーザーからの元入力 — これらはすべて **サブエージェントには見えない**。コーディネーターが明示的にプロンプトに含めなければ伝わらない。試験ではこの原則を問う問題が複数回出る。


| 渡すべき情報 | 理由・具体例 |
|---|---|
| 元のユーザー要求の核心 | サブエージェントが「なぜこのタスクをやっているか」を理解できるように |
| 前段サブエージェントの構造化出力 | JSON など機械可読フォーマットで渡す（自然言語要約は情報損失） |
| 制約条件・ポリシー | 「金額は $500 未満のみ」「公開日 2023 年以降のみ」など |
| 期待される出力スキーマ | 後段で統合しやすい形式を明示。フィールド名・型・必須／任意を指定 |
| 出所情報（provenance）要件 | 「source URL・公開日・抜粋を必ず含める」を明示的に指示 |

```ts
// ✅ 良いコンテキスト渡しの例
const analysisAgentPrompt = `
## 元のユーザー要求
"Q4の売上トレンドと競合動向を比較した投資レポートを作成"

## 前段（Search Agent）の出力
${JSON.stringify(searchResults, null, 2)}

## あなたのタスク
上記の検索結果を分析し、以下のJSON形式で返してください：
{
  "trends": [{"metric": string, "direction": "up"|"down", "evidence": {...}}],
  "competitors": [{"name": string, "signal": string, "source_url": string}]
}

## 制約
- 公開日2024年以降のソースのみ使用
- 各claim に source_url と公開日を必ず含める
`;

// ❌ 悪い例：コンテキストなし
const badPrompt = "競合を分析してください";
// → サブエージェントが「何の競合？どんなフォーマットで？」を推測することになり信頼性低下
```

## 1.5 Agent SDK フックパターン


> **[図] 図1-4: PostToolUseフックによるデータ正規化とポリシー強制**


`PostToolUse` フックは **MCP ツールの戻り値とエージェントの間に挟まる決定論的レイヤー** です。プロンプトでは保証できない「データ正規化」と「ポリシー強制」を保証する箇所として、合格者の答案で頻出します。

## 1.6 タスク分解戦略

| パターン | 使いどころ | 例 |
|---|---|---|
| Prompt chaining（固定順序） | 手順が予測可能なマルチアスペクトタスク | ファイル別分析 → クロスファイル統合パス |
| 動的適応型分解 | 中間の発見に基づいて次のステップが変わる | 「レガシーコードベースに包括的なテストを追加」 |

## 1.7 セッション管理

| 方法 | 使いどころ | コマンド／方法 |
|---|---|---|
| Named session resumption | 以前のコンテキストが主に有効 | `--resume <session-name>` |
| Fork session | 共有ベースラインから複数アプローチを並列探索 | `fork_session` |
| Fresh start + summary | 以前のツール結果が古くなっている | 構造化サマリーを新セッションへ注入 |

---

# Domain 2: Tool Design & MCP Integration

**配点 18%** — Task 2.1〜2.5

## 2.1 効果的なツール記述設計


> **Tool description はツール選択の唯一の主要機構**
>
> LLM は description を使ってツールを選択する。最小限の説明は類似ツール間の信頼性を低下させる。**良い description には ① 入力フォーマット ② クエリの例 ③ エッジケース ④ 類似ツールとの境界** を含める。


| ❌ 最小限（試験の誤答パターン） | ✅ 良い記述 |
|---|---|
| `get_customer`: "Retrieves customer information"<br/>`lookup_order`: "Retrieves order details"<br/>→ 類似 identifier format で誤選択発生 | `get_customer`: "顧客 ID またはメールでアカウントを検索・確認。返金・変更処理の前に必ず呼ぶ。注文照会には lookup_order を使うこと"<br/>→ 境界・使い分けが明確 |

## 2.2 構造化エラーレスポンス

| `errorCategory` | 説明 | `isRetryable` |
|---|---|:---:|
| `transient` | タイムアウト・サービス一時停止 | `true` |
| `validation` | 不正な入力・形式エラー | `false` |
| `permission` | 権限不足・アクセス拒否 | `false` |
| `business` | ポリシー違反（$500 超の返金等） | `false` |


> **access failure vs valid empty result の区別（頻出）**
>
> - **access failure**（タイムアウト）→ `isRetryable: true` でエラーを明示的に返す
> - **valid empty result**（マッチなし）→ 成功として空リストを返す
>
> 混同するとコーディネーターが誤判断。「空リストを成功で返す」は anti-pattern。


## 2.3 ツール粒度設計（fine-grained vs coarse-grained）

ツール設計でしばしば問われるのが「粒度」の判断です。「1 つの大きなツール」と「複数の小さなツール」のどちらが正解かは、シナリオ依存で判断する必要があります。

| ❌ 粗粒度すぎ（coarse-grained） | ✅ 適切な分割 |
|---|---|
| `manage_customer`: "顧客の作成・読取・更新・削除をすべて行う"<br/>引数: `action: "create" \| "read" \| "update" \| "delete"`<br/>→ どの操作が呼ばれたか LLM の判断に依存。**削除を承認していないのに削除される** リスク | `get_customer`, `create_customer`, `update_customer`, `delete_customer` の 4 つに分割<br/>→ 各操作に個別に permission・hook を設定可能。`delete_customer` だけ人間承認を必須にできる |

| 判断軸 | 細かく分ける（fine-grained） | まとめる（coarse-grained） |
|---|---|---|
| 権限管理 | 操作ごとに承認・監査を変える必要がある | 同じ権限レベルで使われる |
| エラーハンドリング | 失敗時の挙動が操作ごとに違う | 失敗パターンが共通 |
| LLM の呼び出し精度 | 4〜8 個程度なら選択精度が高い | 引数で分岐は誤選択の温床 |
| retry 戦略 | テーブルスキャンとレコード更新で個別に設計 | 同一 API ラッパーで十分 |


> **経験則：1 エージェントあたり 4〜8 ツール**
>
> マルチエージェントの場合、各サブエージェントが扱うツールは **4〜8 個に絞る**。これを超えると LLM のツール選択精度が低下する。「すべてのエージェントに全ツールを与える」は罠 9（Top 10）の典型例。


## 2.4 MCP サーバー設定

### スコープ：プロジェクト vs ユーザー


> **[図] 図2-1: MCP サーバースコープ設定ファイルの場所**


### Transport の選択（stdio / Streamable HTTP）

MCP 仕様 **2025-11-25 では公式 transport が 2 種類**：`stdio` と `Streamable HTTP`。**第 3 の transport「HTTP+SSE 単独」は旧仕様（2024-11-05）の方式で、現在は deprecated**（後方互換目的で残存。新規実装では選ばない）。

| Transport | 用途 | 実装形態 | `.mcp.json` の指定 | 推奨度 |
|---|---|---|---|---|
| **stdio** | ローカル MCP サーバー | npx 等で立ち上げる subprocess（stdin/stdout 経由 JSON-RPC） | `command` + `args` + `env` | ✅ ローカル開発・CLI ツール統合の第一選択 |
| **Streamable HTTP** | リモート / hosted MCP サーバー | 単独の HTTP サーバー（POST + 必要に応じて SSE で stream） | `url` + `transport: "http"` | ✅ 2025-11-25 spec の remote 公式標準。新規実装はこれ |
| **HTTP+SSE 単独** | 旧仕様の hosted MCP | 単独 SSE エンドポイント | `url` + （旧クライアントが SSE を仮定） | ⚠️ **deprecated**（2024-11-05 仕様の遺物） |


> **Streamable HTTP と「SSE 単独 transport」は別物**
>
> Streamable HTTP は「HTTP POST + 必要に応じて SSE で stream」という構造で、**SSE をオプション機能として内包する transport**。一方「SSE 単独 transport」は POST せず SSE だけで通信していた旧 transport。**試験で SSE と HTTP の違いを問われたら、「SSE は Streamable HTTP の中で stream を返すときの形式の 1 つ。SSE 単独 transport は deprecated」** が正解。


**stdio の設定例（ローカル subprocess）：**

```jsonc
// .mcp.json — stdio
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

**Streamable HTTP の設定例（hosted / SaaS 連携）：**

```jsonc
// .mcp.json — Streamable HTTP（remote）
{
  "mcpServers": {
    "atlassian": {
      "url": "https://mcp.atlassian.com/v1",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer ${ATLASSIAN_TOKEN}"
      }
    }
  }
}
```


> **選択の判断軸**
>
> - ローカルツール（git, ファイルシステム, データベースの dev インスタンス）→ **stdio**
> - SaaS 連携（Atlassian, Linear, Slack 等の hosted MCP）→ **Streamable HTTP**
> - 既存の hosted MCP が SSE 単独で公開されている → 移行を促し、当面は接続できるなら接続（deprecated 警告は出る）
>
> 「全部 stdio で済ませる」は罠。SaaS 連携を stdio + 自前 proxy で実装すると、認証トークンの取り回しが複雑化し、複数クライアントから同時利用しづらくなる。


## 2.5 MCP の 3 プリミティブ（Academy コアコンテンツ）


> **MCP 3 プリミティブの使い分け**
>
> | プリミティブ | 制御者 | 用途 | 例 |
> |---|---|---|---|
> | **Tools** | モデルが制御 | アクション実行（外部 API コール・データ取得） | `get_customer`, `search_web` |
> | **Resources** | アプリが制御 | 読み取り専用データの公開・コンテンツカタログ | issue 一覧, DB スキーマ, ドキュメント階層 |
> | **Prompts** | ユーザーが制御 | 事前定義のワークフロー指示テンプレート | ドキュメントフォーマット, コードレビューフロー |


## MCP 高度機能（Advanced Topics コンテンツ）

| 機能 | 説明 | 試験との関連 |
|---|---|---|
| Sampling | MCP サーバーがクライアント経由で LLM 呼び出しを要求する仕組み。**本来の設計意図は「サーバー側で LLM が必要だが、API 契約・モデル選択・コスト負担はクライアント側に委譲する」というアーキテクチャ上の責務分離**。副次効果としてサーバー実装者が API キー管理から解放される | D1 のサブエージェント設計と関連 |
| Progress / Log 通知 | 長時間処理のリアルタイムフィードバック。context オブジェクトと logging コールバック | D5 のコンテキスト管理と関連 |
| Roots | 特定ディレクトリへのアクセス許可。セキュリティ境界とファイル探索の効率化 | D2 ツール設計の原則に関連 |
| Transport 選択 | stdio（ローカル subprocess）vs Streamable HTTP（remote）の 2 種が公式。詳細は [§2.4 Transport の選択](#transport-の選択stdio--streamable-http) を参照 | D2 ツール設計の原則と直結 |

## 組み込みツールの選択基準

| ツール | 用途 | 選ぶべき場面 |
|---|---|---|
| `Grep` | ファイル内容の検索 | 関数名・エラーメッセージ・import のパターン検索 |
| `Glob` | ファイルパスのマッチング | 拡張子・名前でファイルを検索（例: `**/*.test.tsx`） |
| `Edit` | ユニークテキストで部分編集 | 明確にユニークな箇所の修正（失敗時は Read+Write にフォールバック） |
| `Read+Write` | ファイル全体の操作 | Edit が非ユニークテキストで失敗した場合のフォールバック |
| `Bash` | コマンド実行 | ビルド・テスト・スクリプト実行 |

---

# Domain 3: Claude Code Configuration & Workflows

**配点 20%** — Task 3.1〜3.6

## 3.1 CLAUDE.md 設定階層


> **[図] 図3-1: CLAUDE.md の 4 層階層とスコープ**


> **頻出の罠：新メンバーが設定を受け取れない**
>
> `~/.claude/CLAUDE.md`（ユーザーレベル）はバージョン管理に含まれないため、新しいチームメンバーが clone しても適用されません。チーム全員に適用したい設定は `.claude/CLAUDE.md`（プロジェクトレベル）に置く必要があります。
>
> 一方、`CLAUDE.local.md` は **プロジェクト固有だが個人にだけ必要な設定**（自分のローカル環境のパス・個人 MCP サーバー・実験中の指示など）を入れる場所です。`.gitignore` に自動追加されるためチームを汚染しません。


### CLAUDE.md のモジュール化オプション

| 方法 | 構文／場所 | 用途・利点 |
|---|---|---|
| `@` パス参照 | `@./standards/api.md` または `@README.md` | 外部ファイルを参照してモジュール化。読み込み時にインライン展開（最大 5 階層の再帰）。**「@import」というキーワードは不要**、シンプルに `@` で始める |
| `.claude/rules/` | YAML フロントマター `paths:`（`globs:` も使用可） | glob パターンで条件付きロード。該当ファイル読み込み時に rule 内容が会話に注入される（"first-match-wins" attach pattern） |

```md
# .claude/rules/testing.md — テストファイルにのみ適用されるルール
---
paths:
  - "**/*.test.tsx"
  - "**/*.spec.ts"
---
テストはAAA（Arrange-Act-Assert）パターンで書くこと
既存のテストと重複するシナリオは追加しないこと

# プロジェクトルートの CLAUDE.md から外部ファイルを参照する例
# （@import ではなく @ だけで参照する）
@README.md
@./docs/architecture.md
@./standards/api-conventions.md
```


> **`paths:` と `globs:` の関係**
>
> 公式ドキュメントは `paths:` を使う例を示していますが、コミュニティでは `globs:` の方が確実に動作するケースが報告されています。**試験では `paths:` が正解** として扱われる可能性が高いですが、実装で動作しない場合は `globs:` を試してください。


## 3.2 カスタムコマンドと Skills


> **[図] 図3-2: コマンド・Skills のスコープとフロントマターオプション**


| Skill フロントマター | 正しい効果 | 使いどころ |
|---|---|---|
| `context: fork` | 独立したサブエージェントで実行。メインのコンテキストを汚染しない | 大量出力を生成する Skill・コードベース探索 |
| `allowed-tools` | **指定したツールに対する事前承認**（プロンプト省略のための pre-approval）。**他ツールをブロックする機能ではない**。実際にツールをブロックしたい場合はプロジェクトの `permissions.deny` を使う | Skill が特定ツールを頻繁に使うとき、毎回承認プロンプトを出さないようにする |
| `argument-hint` | **`/` オートコンプリートメニューに表示される表示専用のヒント文字列**。パース動作には影響しない。入力を強制する機能でもない | `argument-hint: "[issue-number]"` のように、引数の意味をユーザーに示す |
| `disable-model-invocation` | Claude が自動的にこの Skill を呼ぶことを防ぐ。ユーザーが `/skill-name` で明示的に呼んだときだけ実行 | デプロイ・コミットなど副作用のある Skill |
| `user-invocable: false` | `/` メニューから隠す（Claude は自動ロード可能） | 背景知識として使うリファレンス系 Skill |
| `model` | Skill 実行中に使うモデル（`haiku` / `sonnet` / `opus` / `inherit`） | 軽量タスクを Haiku に振ってコスト削減 |
| `agent` | `context: fork` と組み合わせて、特定のサブエージェントタイプ（例: `Explore`）で実行 | 探索系タスクを Explore agent に委譲 |


> **`allowed-tools` の誤解**
>
> 「`allowed-tools` は Skill 実行中のツールを制限する」というのは誤りです。**`allowed-tools` は「これらのツールについて事前承認を与える」機能であり、ブロック機能ではありません**。`allowed-tools: [Read, Grep]` と書いても、Skill は `Bash` や `Write` を使えてしまいます。実際にブロックしたい場合は、プロジェクトの `.claude/settings.json` で `permissions.deny` を設定してください。試験で「`allowed-tools` で危険な操作をブロック」という選択肢が出たら **誤答** です。


> **CLAUDE.md vs Skills の使い分け**
>
> - **CLAUDE.md**: 常時ロードされる普遍的な標準・コーディング規約（always-loaded）
> - **Skills**: 特定タスクのオンデマンド実行（`/skill-name` で呼び出す）
> - **`.claude/rules/`**: ファイルパス別の条件付きロード（該当ファイル編集時のみ）


## 3.3 Claude Code フック（lifecycle hooks）

Claude Code の `hooks` はライフサイクルイベントで決定論的にコマンドを実行する仕組みです。**これは Agent SDK の `PostToolUse` フック（D1.5）とは別物**。Claude Code の hooks は `.claude/settings.json` または `.claude/hooks/` ディレクトリで定義します。

| イベント | 発火タイミング | 典型的な用途 |
|---|---|---|
| `PreToolUse` | ツール実行 **前**。コマンドが 0 以外で終了するとツール実行をブロック | 危険コマンド検査・lint チェック・git status の確認 |
| `PostToolUse` | ツール実行 **後**。結果を変換・追加処理 | 編集後の自動 format・テスト実行・結果ログ |
| `UserPromptSubmit` | ユーザープロンプト送信時 | 追加コンテキストの注入・プロンプトの監査 |
| `Stop` / `SubagentStop` | セッション終了時 / サブエージェント終了時 | クリーンアップ・通知 |
| `Notification` | Claude Code が通知を発する時 | 外部システム連携（Slack 通知など） |

```json
// .claude/settings.json — PostToolUse フックで Edit 後に自動 format
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write $CLAUDE_FILE_PATHS" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "./scripts/security-check.sh" }
        ]
      }
    ]
  }
}
```


> **Claude Code Hooks vs Agent SDK Hooks の混同に注意**
>
> 試験では両方が出てくるが、それぞれ用途が違う：
>
> - **Agent SDK Hooks**（[D1.5](/d1-agentic#15-agent-sdk-フックパターン)）: API 経由でエージェンティックループを構築する際に使う。`messages.create` の前後でのデータ変換・ポリシー強制
> - **Claude Code Hooks**（D3.3）: Claude Code CLI のライフサイクルに介入。エディタ操作の自動化・チーム開発フローの強制
>
> どちらも「決定論的な保証が必要なときに使う」という [3 原則 #1](/) と整合する点は共通。


> **試験頻出：「フォーマッター実行」をどこに書くか**
>
> 「保存後に自動で prettier を走らせたい」→ **CLAUDE.md に「フォーマットして」と書くのは誤答**（プロンプト指示は非ゼロ失敗率）。正解は `PostToolUse` hook でマッチャー `Edit|Write` を設定し、コマンドで実行すること。


## 3.4 Plan mode vs Direct execution

| Plan mode を選ぶ場面（試験頻出） | Direct execution を選ぶ場面 |
|---|---|
| 複数ファイルにまたがる大規模変更 | 単一ファイルのバグ修正（明確なスタックトレースあり） |
| 複数の有効なアプローチが存在 | 1 関数への条件追加 |
| アーキテクチャ上の決定が必要 | スコープが明確な変更 |
| マイクロサービス分割・45+ ファイルのライブラリ移行 | — |
| → 変更前にコードベースを安全に探索・設計 | → オーバーキルになるので Plan mode は不要 |

## 3.5 反復改善テクニック（Academy コンテンツ）

| テクニック | 説明 | 使いどころ |
|---|---|---|
| 具体的な I/O 例 | 2〜3 個の入力 → 出力例を提示 | 自然言語説明が一貫性のない結果を生む場合 |
| テスト駆動反復 | 先にテストスイートを書いて、テスト失敗を共有しながら改善 | 実装の品質を客観的に測定したい場合 |
| インタビューパターン | 実装前に Claude に質問を促して設計考慮事項を表出させる | 未知のドメインでキャッシュ無効化・失敗モードを発見 |
| 並行 vs 順次フィードバック | 相互作用する問題 → まとめて報告。独立した問題 → 順次修正 | 複数の問題が存在する場合の最適な報告方法 |

## 3.6 CI/CD パイプライン統合

```bash
# ① 非インタラクティブモード（-p フラグ必須）
claude -p "Analyze this PR for security issues"

# ② 構造化JSON出力でPRコメント自動投稿
claude -p "Review this code" \
  --output-format json \
  --json-schema review-schema.json

# ③ 独立したインスタンスでコードをレビュー（同じセッションは使わない）
claude -p "Review: $(git diff HEAD~1)"

# ❌ 存在しないフラグ（試験の誤答選択肢）：
# CLAUDE_HEADLESS=true, --batch フラグ  → どちらも存在しない
```


> **CI/CD で重要な 3 点**
>
> 1. **`-p` フラグ**：必須。なければパイプラインがハング
> 2. **独立インスタンス**：生成したコードを同じセッションでレビューさせない（認知バイアス）
> 3. **CLAUDE.md**：テスト基準・レビュー基準・利用可能な fixture を文書化して CI 品質を向上

---

# Domain 4: Prompt Engineering & Structured Output

**配点 20%** — Task 4.1〜4.6

## 4.1 明示的な基準で精度を上げる

| ❌ 曖昧な指示（効果なし） | ✅ 明示的なカテゴリ基準 |
|---|---|
| 「保守的に報告してください」<br/>「高信頼度の発見のみ報告する」<br/>「be conservative」<br/>→ LLM には意味をなさず精度向上しない | 「コメントが実際のコード動作と矛盾する場合のみフラグ」<br/>「スタイル問題はスキップ、バグとセキュリティのみ報告」<br/>各 severity レベルにコード例を提示 |


> **false positive 率が高いカテゴリへの対処**
>
> false positive 率が高いカテゴリは一時的に無効にしてそのカテゴリのプロンプトを改善する間、開発者の信頼を維持する。高い false positive カテゴリは正確なカテゴリへの信頼も損なう。


## 4.2 Few-shot prompting

Few-shot は **「指示文より具体例の方が LLM の行動を変えやすい」** という性質を活用するパターンです。試験では「明示的な基準が効かないシナリオで Few-shot をどう設計するか」が問われます。以下の 5 パターンは試験頻出の用途別に分類したものです。

| 使いどころ | 例 | 例示するもの |
|---|---|---|
| 一貫したフォーマット出力が必要 | コードレビューの出力フォーマット統一 | location・issue・severity・suggested fix の形式 |
| 曖昧なシナリオの判断基準 | ツール選択の境界ケース | なぜ A 選択肢ではなく B を選んだか（理由付き） |
| 抽出タスクのハルシネーション削減 | 多様な文書構造からの抽出 | inline citation と bibliography で異なる処理例 |

### パターン 1: 曖昧シナリオでの判断基準を例示する

「保守的に判定して」のような形容詞は LLM に効きません（[4.1 参照](#41-明示的な基準で精度を上げる)）。代わりに **境界ケースの正解と不正解** を 2〜3 例ずつ提示します。

```text
以下のコードレビューコメントについて、type を "bug" / "style" / "question" のいずれかに分類してください。

例:
入力: "この関数は null チェックが抜けています。クラッシュします。"
出力: { "type": "bug", "reason": "明示的なクラッシュ条件" }

入力: "この変数名は説明的でないと思います"
出力: { "type": "style", "reason": "命名は実行に影響しない" }

入力: "ここで使われている `O(n^2)` は意図的ですか？"
出力: { "type": "question", "reason": "確認を求めている。バグ確定ではない" }

判断に迷う場合は { "type": "question" } を選んでください。
```

### パターン 2: 出力フォーマットを例示する

JSON Schema は構造を強制しますが、**フィールドの記述スタイル**（簡潔さ・トーン・粒度）までは強制できません。スタイルを揃えたいときは Few-shot で揃えます。

```text
以下のコード変更について、PR description の "Why" セクションを書いてください。

例:
diff: 「キャッシュ TTL を 60s → 300s に変更」
出力:
{
  "why": "本番のキャッシュヒット率が 40% で、上流 API が rate limit に達する頻度が高い。
          TTL を 5 倍にすることで rate limit エラーを抑える狙い。
          stale データの許容度は事前に PdM と確認済み（本機能は近似値で十分）。"
}

→ 出力例の「現状の数値 / 変更の狙い / 副作用への配慮」の 3 段構成に揃えてください。
```

### パターン 3: 許容コードと問題コードの区別を例示する

セキュリティレビュー・コード品質判定では、**「許容するコード」「拒否するコード」を両方** 提示することが必須です。片方だけでは LLM が境界線を引けず false positive / false negative が増えます。

```text
以下の SQL クエリ生成コードについて、SQL injection の可能性を判定してください。

✅ 許容例:
const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
stmt.get(userId);
→ { "vulnerable": false, "reason": "prepared statement + bound parameter" }

❌ 問題例:
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.query(query);
→ { "vulnerable": true, "reason": "テンプレートリテラルでユーザー入力を直接埋込" }

❌ 問題例（紛らわしいパターン）:
const query = sql`SELECT * FROM users WHERE id = ${userId}`;
db.execute(query);
→ { "vulnerable": false, "reason": "sql タグ付きテンプレートは parameterized query を生成（要：使用ライブラリの確認）" }
```

### パターン 4: ドキュメント構造別の抽出例を提示する

抽出タスクで対象ドキュメントの構造が複数パターンに分かれる場合（学術論文の inline citation / bibliography / footnote など）、**それぞれの構造に対する抽出例を 1 つずつ** 提示します。1 例しか出さないと、構造が異なる文書でハルシネーションが起きます。

```text
以下の論文から引用文献を抽出してください。

例 A (inline citation):
"...as shown by Smith et al. (2023), the effect is significant..."
→ { "type": "inline", "authors": "Smith et al.", "year": 2023 }

例 B (numbered bibliography):
"...the effect is significant [12]..."
（末尾の References:）"[12] Smith, J. (2023). Title. Journal, 4(2), 100-120."
→ { "type": "numbered", "ref_number": 12, "authors": "Smith, J.", "year": 2023, "title": "Title" }

例 C (footnote):
"...the effect is significant¹..."
（脚注:）"¹ Smith 2023, "Title", Journal 4(2)."
→ { "type": "footnote", "marker": "¹", "authors": "Smith", "year": 2023 }

文書全体を読んでから、上記 3 種類のいずれに該当するかを判定して抽出してください。
```

### パターン 5: 非公式測定値・近似表現の解釈を例示する

「約 5MB」「だいたい 1 時間程度」「ほぼ満タン」のような **非公式な測定値・近似表現** をどの粒度で構造化するかは、Few-shot で例示しないと一貫しません。

```text
以下の障害報告から、影響範囲とダウンタイムを構造化してください。

例:
入力: "ストレージがほぼ満タンの状態で、約 1 時間ほど書き込みが失敗していた。
       影響を受けたユーザーはおおよそ 5,000 人前後"
出力:
{
  "storage_state": { "raw": "ほぼ満タン", "normalized": "near_capacity", "approximate": true },
  "downtime": { "raw": "約 1 時間", "minutes_estimate": 60, "approximate": true },
  "affected_users": { "raw": "おおよそ 5,000 人前後", "count_estimate": 5000, "approximate": true }
}

→ raw（原文ママ）+ normalized（カテゴリ）/ estimate（数値概算）+ approximate フラグの形式に揃えてください。
正確な数値が原文にない場合は approximate: true を必ず付け、estimate は中央値で記録します。
```


> **Few-shot 設計の共通原則**
>
> 1. **境界例を含める** — 「明らかに正解」だけでなく、「迷いやすいが正解はこれ」を必ず 1 例入れる
> 2. **理由（reason）を併記する** — 出力フォーマットに `reason` フィールドを設けると、LLM がパターンマッチではなく **判断軸** を学ぶ
> 3. **ネガティブ例も役立つ** — `❌ 問題例` のラベルで反例を提示すると false positive が減る（ただし、ネガティブ例は出力例ではなく **判定対象の例** であることを明示すること）
> 4. **3〜5 例で十分** — それ以上は coverage より一貫性のリスクが上がる


## 4.3 `tool_use` + JSON Schema で構造化出力


> **[図] 図4-1: tool_choice 3 設定値の違い**


> **JSON Schema 設計の重要原則**
>
> 1. **`tool_use` は JSON 構文エラーをなくす** が、意味エラー（line items の合計 ≠ 総額等）は残る
> 2. **nullable フィールド**：情報が存在しないかもしれないフィールドは optional 化 → required にするとハルシネーション（hallucination）が発生
> 3. **`enum + "other"` パターン**：`"other"` 値 + detail フィールドで拡張可能なカテゴリを設計
> 4. **`"unclear"` 値**：曖昧なケース用の enum 値を追加してモデルに選択肢を与える


## 4.4 バリデーション・リトライ・フィードバックループ

```ts
// retry-with-error-feedback パターン
const result = await extractWithSchema(document);
const errors = validateSchema(result);

if (errors.length > 0) {
  // ✅ 元のドキュメント + 失敗した抽出結果 + 具体的なエラーを追加して再送
  const retry = await extractWithFeedback({
    document,
    failedExtraction: result,
    validationErrors: errors  // 具体的なエラーが重要
  });
}
// ❌ リトライが効果ない場合：情報がそもそもドキュメントに存在しない
// → 情報不在はフォーマットエラーと違い、リトライで解決しない
```

## 4.5 Message Batches API の使い分け

| ✅ Batch API が適する（非同期・レイテンシ耐性あり） | ❌ 同期 API が必要（ブロッキング） |
|---|---|
| 翌朝レビューの技術的負債レポート<br/>週次セキュリティ監査<br/>夜間テスト生成<br/>→ 50% コスト削減・最大 24 時間・SLA 保証なし・**エージェンティックループ非対応** | pre-merge ブロッキングチェック<br/>ユーザー向けリアルタイム抽出<br/>→ 開発者・ユーザーが結果を待っている<br/>SLA 保証なしの Batch API は使えない |


> **Batch API の「multi-turn 制約」を正確に理解する**
>
> 「マルチターン tool calling 非対応」という記述は誤解を招きやすいため、より正確には **「エージェンティックループ非対応」**。
>
> **正確な仕様：**
>
> - バッチ内の各リクエストは **1 回のメッセージ生成** で完結する（1 往復のみ）
> - リクエスト内に user / assistant が交互に並んだ **multi-turn の会話履歴を含めることは可能**
> - しかし、tool_use → ツール実行 → 結果を返して継続、という **エージェンティックループはバッチでは展開できない**（ツール実行をバッチが代行する仕組みがないため）
>
> つまり「ツール呼び出しを含むワークフローは Batch ではなく同期 API で」が正しい判断基準。試験では「pre-merge チェックに Batch」「リアルタイム抽出に Batch」の両方が誤答として出ます。


### Batch API の SLA ウィンドウ計算

Batch API は **最大 24 時間** で結果を返す保証ですが、実際には早く完了することも多いです。試験では「結果が必要な時刻 − 24 時間 = いつまでに送信すべきか」のような **ウィンドウ計算問題** が出ます。


> **SLA ウィンドウの基本式**
>
> ```
> 送信ウィンドウ = 結果が必要な時刻 − Batch API 上限 (24h) − 後処理時間
> ```
>
> 「Batch を投げたいが、X 時間以内に結果が必要」というシナリオでは、`24 − X` が **負** になっていないかをまず確認します。


| シナリオ | 結果が必要な時刻 | 送信ウィンドウ計算（必要時刻 − 24h） | 結論 |
|---|---|---|---|
| 翌朝のレビュー（30 時間後でよい） | T + 30h | **30 − 24 = T + 6h まで送信可** | ✅ Batch を使う |
| 8 時間後のスタンドアップで結果が欲しい | T + 8h | **8 − 24 = −16h**（ウィンドウなし） | ❌ Batch 不可 → 同期 API |
| 週次セキュリティ監査（1 週間後でよい） | T + 168h | **168 − 24 = T + 144h まで送信可** | ✅ Batch を使う |
| pre-merge チェック（PR 作成から 5 分以内） | T + 5min | **5min − 24h ≪ 0**（ウィンドウなし） | ❌ Batch 不可 → 同期 API |
| 夜間テスト生成（朝 9 時までに必要・現在 21 時） | T + 12h | **12 − 24 = −12h**（ウィンドウなし） | ❌ Batch 不可 → 同期 API |


> **「Batch なら 50% コスト削減できる」を理由に SLA を犠牲にしない**
>
> Batch API のコスト削減は魅力的ですが、SLA を満たせないシナリオに無理に Batch を当てると、結果が間に合わず再処理が必要になり **総コストは同期 API より高くなります**。試験では「コスト削減のため Batch を採用」が罠の選択肢として頻出します。判断順序は **① SLA を満たせるか → ② 満たせるなら Batch → ③ 満たせないなら同期 API** です。


## 4.6 マルチインスタンス・マルチパスレビュー

| パターン | 説明 | 理由 |
|---|---|---|
| 独立インスタンスレビュー | 生成したコードを別の Claude インスタンスでレビュー | 生成セッションは推論コンテキストを保持し自己批判が困難 |
| マルチパスレビュー | ① ファイル別ローカル分析パス + ② クロスファイル統合パス | 一度に全ファイルを処理すると注意分散（attention dilution）で矛盾発生 |
| 信頼スコア付き検証 | 各 finding に信頼スコアを自己報告させてルーティング | レビューリソースを効率的に配分 |

---

# Domain 5: Context Management & Reliability

**配点 15%** — Task 5.1〜5.6

## 5.1 コンテキスト管理


> **[図] 図5-1: "Lost in the Middle" 効果と対策**


| 課題 | 対策 |
|---|---|
| 重要な数値データ（金額・日付）が要約で失われる | 要約履歴とは別に、transactional ファクトを永続的な「case facts」ブロックとして各プロンプトに含める |
| ツール出力が大量のトークンを消費 | 関連フィールドのみにトリミングしてからコンテキストに追加（例: order lookup の 40+ フィールド → 5 フィールド） |
| コードベース探索でのコンテキスト劣化 | scratchpad ファイルに重要な発見を記録し、後続の質問でそのファイルを参照する |

## 5.2 エスカレーション設計

エスカレーションは **「いつ」「何を」「どのように」** 人間に渡すかを設計する問題です。試験では「シナリオ X で最も適切なエスカレーション戦略は？」が頻出します。以下の 4 分類はタイミングで整理したものです。

| 分類 | タイミング | 典型シナリオ | 引き継ぎ内容 |
|---|---|---|---|
| **即時** | 調査を先行させず即対応 | 顧客が人間を明示的に要求した・暴言・自殺予兆・法的請求の予告 | 元の発話・直前の会話履歴・顧客 ID |
| **解決試行後** | エージェントが 1〜2 回試した上で進捗が出ない場合 | 複雑なリファンド計算で必要な情報が欠落・ツール失敗が連鎖 | 試した手順・各ステップの結果・残った不明点 |
| **段階的** | 認識 → 解決試行 → 失敗 → エスカレーション、の順で踏む | 通常のサポート問い合わせがエージェントの能力を超えていることが判明 | 認識した問題・試したアプローチ・なぜ失敗したか |
| **ポリシーギャップ** | エージェントの権限・ポリシーに例外が必要 | $500 超の返金、規約に明示されていない例外請求、新規ポリシー策定が必要なケース | 顧客の要求・該当する既存ポリシー・例外を許容すべき理由 |


> **即座にエスカレーションすべき 3 条件（試験頻出）**
>
> 1. 顧客が人間エージェントを **明示的に要求した**（調査を先行させず即座に対応）
> 2. ポリシーに **ギャップや例外が存在する**（複雑さだけでなくポリシーの曖昧さ）
> 3. エージェントが **意味のある進捗を生み出せない**
>
> **センチメントスコアや自己報告型信頼スコアはエスカレーション基準として使えない**（複雑度と相関しない）


### 構造化引き継ぎプロトコル

エスカレーション時にエージェントが人間オペレーターに渡す情報は、自然言語の要約ではなく **構造化された JSON** にすると、ハンドオフの取りこぼしが減ります。試験では「自由形式のサマリーで引き継ぎ」が誤答として出ます。

```ts
// ✅ 構造化引き継ぎペイロードの最小一式
type EscalationHandoff = {
  escalation_type: 'immediate' | 'after_attempt' | 'progressive' | 'policy_gap'
  reason: string                              // なぜエスカレーションが必要か（1 文）
  case_facts: {                               // transactional facts（圧縮しない）
    customer_id: string
    case_id: string
    amounts?: { currency: string; value: number }[]
    dates?: { kind: string; iso: string }[]
  }
  conversation_summary: string                // 直前 N ターンの要約（人間が読む用）
  attempted_actions: {                        // 試したアクションと結果
    action: string
    result: 'success' | 'failure' | 'partial'
    error?: { errorCategory: string; message: string }
  }[]
  policy_references: string[]                 // 関連ポリシー条項の ID
  open_questions: string[]                    // 解決していない論点
  suggested_next_action?: string              // エージェントの推奨（人間が override 可能）
}

// 即時エスカレーション例
const immediate: EscalationHandoff = {
  escalation_type: 'immediate',
  reason: '顧客が "人間と話したい" と明示的に要求',
  case_facts: { customer_id: 'cust_123', case_id: 'case_456' },
  conversation_summary: '...',
  attempted_actions: [],   // 即時は試行なし
  policy_references: [],
  open_questions: ['顧客の元の問い合わせ内容']
}
```


> **引き継ぎ JSON は「圧縮対象外」**
>
> [5.4 コンテキスト圧縮戦略](#54-コンテキスト圧縮戦略) で扱う `case_facts` ブロックと、この `EscalationHandoff.case_facts` は **同じ思想**（金額・日付・ID は要約で失わない）です。長時間のセッションをまたいでエスカレーションする場合、`case_facts` を永続化しておくと、新しいオペレーター（あるいは新しいエージェントセッション）が文脈をゼロから再構築せずに引き継げます。


## 5.3 マルチエージェントエラー伝播

| ❌ Anti-patterns | ✅ 正しいエラー伝播 |
|---|---|
| ① タイムアウトを空リストで成功として返す<br/>→ コーディネーターが「結果なし」と誤解<br/>② 単一失敗でワークフロー全体終了<br/>→ 部分結果が失われる<br/>③ "search unavailable" と汎用エラー返却<br/>→ 回復判断に必要な情報がない | **構造化エラーコンテキストを返す：**<br/>• 失敗タイプ（transient / permission 等）<br/>• 試みたクエリ<br/>• 部分的な結果（あれば）<br/>• 代替アプローチの提案<br/>→ コーディネーターが適切に回復判断 |

## 5.4 コンテキスト圧縮戦略

長時間のセッションではコンテキストが肥大化します。Claude Code の `/compact` コマンドや手動の構造化サマリーで圧縮しますが、**「何を残し、何を捨てるか」の設計が試験で問われます**。


> **[図] 図5-2: コンテキスト圧縮の優先順位**


| 戦略 | 方法 | 使いどころ |
|---|---|---|
| `/compact` コマンド | 会話履歴を要約に置き換え。Claude 自身がサマリー生成 | Claude Code セッションが長くなりすぎたとき |
| Scratchpad パターン | 重要な発見をファイルに書き出し、後で必要なときだけ参照 | コードベース探索・大量ドキュメント分析 |
| Case Facts ブロック | 各プロンプト先頭に永続的な事実ブロック（金額・ID・期日）を再注入 | カスタマーサポートエージェントの長時間セッション |
| ツール出力トリミング | 関連フィールドのみ抽出してコンテキストに追加 | order lookup API が 40 フィールド返すが必要なのは 5 フィールドだけのとき |
| Fresh start + structured summary | 新セッション開始時に前セッションの構造化サマリーを注入 | 古いツール結果が陳腐化した場合 |


> **圧縮の罠：要約で数値が失われる**
>
> `/compact` のような自動要約は、**金額・日付・ID** などの transactional facts を失いやすい。「返金額は $487.32」が「返金処理を行った」に要約されると、後続の判断ができなくなる。**要約とは別に、構造化された "case facts" ブロックを永続的に保持** することが重要。


## 5.5 失敗からのリカバリーパターン

本番環境では失敗は避けられません。**「失敗をどう扱うか」がアーキテクチャの品質を決めます**。試験では特定のシナリオで「最も適切なリカバリー戦略は？」が頻出します。

| 失敗タイプ | 正しいリカバリー | 誤ったリカバリー（罠） |
|---|---|---|
| **transient**（タイムアウト・5xx） | 指数バックオフでリトライ。複数回失敗後はエスカレーション | 即座にエスカレーション（一時的な問題なのに人間負荷） |
| **validation**（不正入力） | 失敗内容を含めてリトライ（retry-with-error-feedback） | 盲目的に同じ入力でリトライ（無限リトライループ） |
| **permission**（権限不足） | 即座にエスカレーション。リトライしない | リトライ（同じ結果になる） |
| **business**（ポリシー違反） | 代替アクションを提示してエスカレーション | ポリシーを無視して実行 |
| **information not present**（情報不在） | 「情報なし」を構造化して報告。リトライしない | 「frame 変えれば見つかるかも」とリトライを繰り返す |


> **部分的成功の活用（マルチエージェント特有）**
>
> マルチエージェントシステムでは、**1 つのサブエージェントが失敗しても他は成功している** ことが多い。コーディネーターは：
>
> 1. 成功した部分結果は **採用して合成** する
> 2. 失敗した部分は **明示的にカバレッジギャップとして注釈** する
> 3. 必要に応じて **代替手段で再委譲**（別のサブエージェント・別のクエリ）
>
> 「1 つでも失敗したら全体終了」は試験で必ず誤答として出る anti-pattern。


```ts
// 部分的成功を活用するコーディネーターの実装例
const results = await Promise.allSettled(subagentTasks);

const successful = results.filter(r => r.status === "fulfilled");
const failed = results.filter(r => r.status === "rejected");

// ✅ 部分結果を採用しつつ、失敗を明示
return {
  partial_results: successful.map(r => r.value),
  coverage_gaps: failed.map(r => ({
    attempted_query: r.reason.query,
    error_type: r.reason.errorType,
    suggested_alternatives: r.reason.alternatives
  })),
  is_complete: failed.length === 0
};
// ❌ Anti-pattern: if (failed.length > 0) throw new Error("全体失敗");
```

## 5.6 情報出所（Provenance）の保持

| 課題 | 解決策 |
|---|---|
| 要約時に claim-source マッピングが失われる | サブエージェントに source URL・document 名・関連抜粋を含む構造化出力を返させ、合成エージェントが保持する |
| 複数ソースが競合する数値を示す | どちらかを選択せず、両方を帰属付きで明示的に注釈。`conflict_detected` フラグを追加 |
| 時系列データの矛盾 | 出版日・収集日を構造化出力に含めて時系列の差異と矛盾を区別 |

---

# 6 つの試験シナリオ — 全詳細

試験では 6 シナリオから 4 つがランダム選択されます。**全 6 シナリオを完全準備** すること。

## Scenario 1: Customer Support Resolution Agent

返品・請求・アカウント変更などの高曖昧性リクエストを 80% 以上の初回解決率で処理するサポートエージェントを設計する。

| MCP tools | 主要課題 |
|---|---|
| `get_customer`, `lookup_order`, `process_refund`, `escalate_to_human` | ツール記述の境界設計、ビジネスルール強制（$500 超は人間承認）、感情とは独立したエスカレーション基準 |

**関連ドメイン**: D1（エージェント設計）/ D2（MCP ツール）/ D5（コンテキスト・エスカレーション）

## Scenario 2: Code Generation with Claude Code

チームで Claude Code を活用してコード生成・リファクタリング・デバッグ・ドキュメント作成を行う。CLAUDE.md・スラッシュコマンド・plan mode を使い分ける。

| 設定対象 | 主要課題 |
|---|---|
| `.claude/CLAUDE.md`, `.claude/commands/`, `.claude/skills/`, `.claude/rules/` | 階層別の設定スコープ、チーム共有設定の置き場所、plan mode と direct execution の使い分け |

**関連ドメイン**: D3（Claude Code 設定）/ D5（コンテキスト管理）

## Scenario 3: Multi-Agent Research System

コーディネーター + 4 専門サブエージェント（Web 検索・ドキュメント分析・合成・レポート生成）で、引用付き包括的レポートを生成する。

| 構成要素 | 主要課題 |
|---|---|
| Coordinator (`allowedTools: ["Task"]`), Search / Analysis / Synthesis / Report Agents | 並列 vs 順次実行、コンテキスト渡し、claim-source mapping、競合する情報源の扱い |

**関連ドメイン**: D1（マルチエージェント）/ D2（ツール設計）/ D5（情報出所）

## Scenario 4: Developer Productivity with Claude

エンジニアが未知コードベース探索・レガシーシステム理解・ボイラープレート生成・反復作業自動化に Claude を活用する。組み込みツール（Read, Write, Bash, Grep, Glob）+ MCP サーバー統合。

| ツール | 主要課題 |
|---|---|
| Read / Write / Edit / Grep / Glob / Bash + MCP | 組み込みツールの選択基準、Edit が失敗した場合のフォールバック、scratchpad パターンによるコンテキスト管理 |

**関連ドメイン**: D2（ツール選択）/ D3（Claude Code）/ D1（タスク分解）

## Scenario 5: Claude Code for CI/CD

CI/CD パイプラインでの自動コードレビュー・テストケース生成・PR フィードバック。アクション可能なフィードバックと誤検知最小化。

| パイプライン要素 | 主要課題 |
|---|---|
| `claude -p`, `--output-format json`, `--json-schema`, 独立インスタンスでのレビュー | `-p` フラグ必須、生成と同じセッションでレビューしない（認知バイアス）、明示的カテゴリ基準で false positive を抑制 |

**関連ドメイン**: D3（Claude Code）/ D4（プロンプト設計）

## Scenario 6: Structured Data Extraction

非構造化ドキュメントから情報を抽出し JSON スキーマで検証する。高精度維持・エッジケース処理・ダウンストリームシステム統合。

| 設計要素 | 主要課題 |
|---|---|
| `tool_use` + JSON Schema, `nullable` フィールド, `enum + "other"` パターン | 情報不在を許容するスキーマ設計、retry-with-error-feedback、Batch API の適用判断 |

**関連ドメイン**: D4（プロンプト設計）/ D5（コンテキスト・出所） 


> **シナリオを横断する判断軸**
>
> 各シナリオで具体的な題材は違いますが、評価される判断軸は共通です：
>
> 1. **決定論的 vs 確率論的** の見極め
> 2. **最小コストで根本原因に対処** する選択
> 3. **コーディネーター中心** のマルチエージェント設計
> 4. **構造化エラー** とエスカレーション基準
> 5. **Provenance（出所）** の保持
>
> 詳しくは [合格の 3 原則](/) と各 Domain ページを参照してください。

---

# 公式 Exam Guide 演習 — 実装ガイド

公式 Exam Guide が指定する 4 つの演習です。これを実際にコードで実装することが合格への最短経路です。


> **参照実装の使い方**
>
> 各演習には設計判断軸と参照実装が用意されています。参照実装は折り畳まれており、**まず自分で実装してから開く** ことを強く推奨します。試験で評価されるのは「コードを書ける」ではなく「設計判断ができる」かどうか。参照実装を先に見ると、判断軸を体得する機会を失います。


> **モデル選択の判断軸**
>
> 参照実装で使うモデルは演習ごとに使い分けています。これ自体が試験 [D5: Context Management](/d5-context) の「コスト最適化」判断と直結します。
>
> - **Sonnet で十分なケース**（演習 1・3）: 単一エージェント、定型的な抽出・ツール呼び出し、判断の分岐が少ない。Sonnet 4.6 でほぼ Opus と同等の精度が出るうえコストは約 1/5
> - **Opus を要するケース**（演習 4）: マルチエージェント coordinator のような「複数の不完全な情報から合成判断する」役割。判断ミスがパイプライン全体に波及するため、coordinator のみ Opus を当て、サブエージェントは Sonnet/Haiku に下げて費用対効果を最大化
> - **Haiku を選ぶケース**（演習に未掲載）: Skill 内のフォーマット整形、ログサマリ、定型的な分類など「決まった型に押し込むだけ」のタスク
>
> **本番運用では日付固定版を使う**（例: `claude-sonnet-4-6-20251022`）。エイリアス `claude-sonnet-4-6` は新しいスナップショットが出ると挙動が変わる可能性があるため、再現性が必要な抽出パイプラインや CI ではバージョン固定が必須。


## 演習 1: Build a Multi-Tool Agent with Escalation Logic

**目標**: stop_reason 制御・構造化エラー・フックパターンを手で書いて体得する

**カバー**: D1 / D2 / D5

1. MCP tools を 3〜4 本定義。**少なくとも 2 本は類似機能を持つツールを作り、description で明確に区別**（ここが試験で問われる）
2. stop_reason を検査してループを継続 / 終了するエージェンティックループを実装。`"tool_use"` → 継続、`"end_turn"` → 終了
3. ツールに構造化エラーレスポンスを追加：`errorCategory`（transient / validation / permission）+ `isRetryable` ブーリアン + 説明。各エラータイプでエージェントが適切に対応することをテスト
4. ビジネスルール強制フックを実装。例：$500 超の返金をブロックして人間エスカレーションへリダイレクト
5. 複数課題のリクエスト（例：「返金と住所変更を同時に」）でテスト。エージェントが課題を分解して並列処理し、統合レスポンスを返すことを確認

### 設計上のポイントと詰まりやすい箇所

**判断軸：**

- **ツール description が選択の唯一の根拠**。`get_customer` と `lookup_order` のように似た形式の identifier を扱うツールでは、「アカウント確認 → get_customer、注文照会 → lookup_order」のような **境界線を 1 文添える**。これを書かないと 4〜5 個目から誤選択が増える
- **errorCategory ごとに retry 判断を切り替える**。`transient` のみ `isRetryable: true`、`validation` / `permission` / `business` は LLM 判断ではなく即エスカレーションか別アクションへ。リトライ可否を LLM に委ねない
- **ビジネスルールは prompt ではなくフックで強制**。$500 超ブロックを CLAUDE.md やシステムプロンプトに書くのは罠（非ゼロの失敗率が残る）。`PostToolUse` フックで決定論的に介入し、`` のような構造化レスポンスを返してエージェントに次のアクションを提示する
- **複数課題は 1 レスポンス内の並列 tool_use**。「返金 + 住所変更」を別ターンに分けるとレイテンシが線形に増加し、後段で context が欠ける。1 つのアシスタントレスポンス内に複数 `tool_use` ブロックを含めれば並列実行される

**詰まりやすい箇所：**

- `stop_reason === "end_turn"` で終了させず、テキストに「完了しました」が含まれるかで判定してしまう（試験頻出 anti-pattern）
- ツール結果の role 間違い — `user` ロールの `tool_result` ブロックとして返す（assistant ロールでもなく独立メッセージでもない）
- フック介入時に `tool_result` を返さず `tool_use` だけ追加し、エージェントが「結果が返ってない」と再呼出ループに入る
- 空配列を成功で返してしまう（access failure と valid empty result の混同、[D2.2](/d2-tool-mcp#22-構造化エラーレスポンス) 参照）

### 完了基準（Definition of Done）

**時間目安**: 90〜120 分

**動作確認チェックリスト：**

- [ ] `stop_reason === "end_turn"` で確実にループ終了することを確認
- [ ] `stop_reason === "tool_use"` で 1 レスポンス内の複数ツールが並列実行される
- [ ] 構造化エラー（4 カテゴリ）がツール戻り値に含まれ、`isRetryable` で retry 判断が分岐する
- [ ] $500 超の返金が PostToolUse フックでブロックされ、`escalate_to_human` にリダイレクトされる
- [ ] 「返金 + 住所変更」の複数課題リクエストで両方を分解・並列処理して統合レスポンスを返す
- [ ] tool_result が `role: 'user'` として履歴に追加されている（assistant ではない）
- [ ] permission エラーがリトライされず、即座にエスカレーションされる

**関連する試験シナリオ**: [Scenario 1: Customer Support Resolution Agent](/scenarios#scenario-1-customer-support-resolution-agent)

<details>
<summary><strong>参照実装を見る</strong>（自分で書いてから開くことを推奨）</summary>

**構成の概要**: 4 ツール + 構造化エラー型 + PostToolUse フック + stop_reason 駆動ループの最小一式。

```ts

const client = new Anthropic()

// 1. ツール定義（境界を明示した description が肝）
const tools = [
  {
    name: 'get_customer',
    description:
      '顧客 ID またはメールでアカウントを検索・確認。返金や情報変更の前に必ず呼ぶ。注文照会には lookup_order を使うこと',
    input_schema: {
      type: 'object',
      properties: {
        identifier: { type: 'string', description: '顧客 ID またはメールアドレス' }
      },
      required: ['identifier']
    }
  },
  {
    name: 'lookup_order',
    description:
      '注文 ID で注文を照会。get_customer で本人確認したあとに使う。process_refund の前提条件',
    input_schema: {
      type: 'object',
      properties: {
        order_id: { type: 'string' }
      },
      required: ['order_id']
    }
  },
  {
    name: 'process_refund',
    description:
      '返金処理。$500 を超える額は PostToolUse フックで自動的にエスカレーション扱いになる（プロンプト側で制御しない）',
    input_schema: {
      type: 'object',
      properties: {
        customer_id: { type: 'string' },
        order_id: { type: 'string' },
        amount: { type: 'number' }
      },
      required: ['customer_id', 'order_id', 'amount']
    }
  },
  {
    name: 'escalate_to_human',
    description:
      '人間オペレーターへ引き継ぐ。customer_id・root_cause・recommended_action を必ず含めること',
    input_schema: {
      type: 'object',
      properties: {
        customer_id: { type: 'string' },
        root_cause: { type: 'string' },
        recommended_action: { type: 'string' }
      },
      required: ['customer_id', 'root_cause', 'recommended_action']
    }
  }
]

// 2. 構造化エラー型 — LLM が「リトライしていいか」を機械的に判断できる形にする
type ErrorCategory = 'transient' | 'validation' | 'permission' | 'business'

type ToolErrorResult = {
  isError: true
  errorCategory: ErrorCategory
  isRetryable: boolean
  message: string
  retryAfterMs?: number
}

const RETRY_POLICY: Record<ErrorCategory, boolean> = {
  transient: true,
  validation: false,
  permission: false,
  business: false
}

function makeError(category: ErrorCategory, message: string): ToolErrorResult {
  return {
    isError: true,
    errorCategory: category,
    isRetryable: RETRY_POLICY[category],
    message
  }
}

// 3. PostToolUse フック — ビジネスルールを「決定論的に」強制
type ToolInput = Record<string, unknown>

function postToolUseHook(toolName: string, input: ToolInput, result: unknown) {
  if (toolName === 'process_refund' && typeof input.amount === 'number' && input.amount > 500) {
    return {
      blocked: true,
      redirect: 'escalate_to_human',
      reason: '$500 超の返金は人間承認が必要',
      input_for_redirect: {
        customer_id: input.customer_id,
        root_cause: 'refund_amount_over_threshold',
        recommended_action: `Approve $${input.amount} refund for customer ${input.customer_id}`
      }
    }
  }
  return result
}

// 4. ツール実行ディスパッチャ — 各ツールのエラーカテゴリを返す例
async function dispatchTool(name: string, input: ToolInput): Promise<unknown> {
  switch (name) {
    case 'get_customer': {
      // 検索結果なし = valid empty result（成功として返す）
      // タイムアウト = transient access failure（エラーとして返す）
      try {
        return await fakeDb.findCustomer(input.identifier as string)
      } catch (e: unknown) {
        if (e instanceof TimeoutError) return makeError('transient', String(e))
        throw e
      }
    }
    case 'process_refund': {
      const amount = input.amount as number
      if (amount <= 0) return makeError('validation', 'amount must be positive')
      return await fakeDb.refund(input as { customer_id: string; order_id: string; amount: number })
    }
    // ... 他のツールも同様
    default:
      return makeError('validation', `unknown tool: ${name}`)
  }
}

// 5. エージェンティックループ — stop_reason 駆動・並列 tool_use 対応
async function runAgent(userMessage: string) {
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: userMessage }]

  while (true) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools,
      messages
    })

    messages.push({ role: 'assistant', content: response.content })

    // ❌ Anti-pattern: テキストに「完了」が入っているかで判定
    // ✅ stop_reason で判定
    if (response.stop_reason === 'end_turn') return response

    if (response.stop_reason === 'tool_use') {
      // 1 レスポンス内の全 tool_use を「並列に」処理
      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
      )

      const toolResults = await Promise.all(
        toolUses.map(async tu => {
          const raw = await dispatchTool(tu.name, tu.input as ToolInput)
          const hooked = postToolUseHook(tu.name, tu.input as ToolInput, raw)
          return {
            type: 'tool_result' as const,
            tool_use_id: tu.id,
            content: JSON.stringify(hooked)
          }
        })
      )

      // tool_result は user ロールに含めて返す（ここを assistant にすると正しく動作しない）
      messages.push({ role: 'user', content: toolResults })
      continue
    }

    return response
  }
}
```

**設計上のポイント**

- `RETRY_POLICY` を別テーブルにしているのは、新しいエラーカテゴリを足しても retry 判断が散らばらないようにするため。マジックナンバーを ​1 箇所に集約するエージェントハーネス（agent harness）
- `postToolUseHook` の戻り値が `blocked: true, redirect: ..., input_for_redirect: ...` を含むのは、LLM が「次に何のツールを呼ぶべきか」を推論なしで判断できるようにするため。ヒントを構造化して渡す
- `dispatchTool` 内で `TimeoutError` のみ `transient` として捕捉している。それ以外の例外はそのまま投げて上層で捕捉 — 「全例外を transient 扱いする」と permission や validation のリトライループに陥る

</details>

> **関連**: ここで設計した `errorCategory` + `RETRY_POLICY` の構造は、[演習 4](#演習-4-design-and-debug-a-multi-agent-research-pipeline) の `SubagentFailure` 型でほぼそのまま再利用される。マルチエージェントでもサブエージェントの失敗を `transient / validation / permission / business` で分類し、コーディネーターが retry すべきか別経路を試すか判定する。

## 演習 2: Configure Claude Code for a Team Development Workflow

**目標**: CLAUDE.md 階層・Skills・MCP 設定を実際のプロジェクトで構築する

**カバー**: D3 / D2

1. プロジェクトレベルの `.claude/CLAUDE.md` を作成。コーディング基準・テストコンベンションを記述。これが全チームメンバーに適用されることを確認（`/memory` コマンドで検証）
2. `.claude/rules/` に YAML フロントマターの glob パターンを持つルールファイルを作成。例：`paths: ["src/api/**/*"]`（API 専用）、`paths: ["**/*.test.*"]`（テスト全体）
3. `.claude/skills/` に `context: fork` と `allowed-tools` 制限付きの Skill を作成。Skill が独立したコンテキストで実行されることを確認（メインコンテキストを汚染しない）
4. `.mcp.json` に `$` 環境変数展開で MCP サーバーを設定。個人用実験 MCP は `~/.claude.json` に設定。両方が同時に利用できることを確認
5. Plan mode と direct execution を意図的に使い分け：単一ファイルバグ修正（direct）・マルチファイルリファクタリング（plan）・ライブラリ移行（plan）

### 設計上のポイントと詰まりやすい箇所

**判断軸：**

- **共有可否でファイル配置を分ける**。チーム共有 → `.claude/CLAUDE.md`（git 管理下）、個人 override → `CLAUDE.local.md`（gitignore 対象）、全プロジェクト共通 → `~/.claude/CLAUDE.md`（git 外）。混同すると「新メンバーが設定を受け取れない」「個人設定がチームを汚染する」が発生
- **`paths:` と `globs:` の関係**。試験回答では `paths:`（公式仕様）を選ぶ。一方、実装上は `paths:` のクォート有無や YAML リスト記法が環境依存で動かない既知ケースが報告されており、未ドキュメントの `globs:` の方が安定動作するケースがある。**試験では `paths:`、本番実装で動かなければ `globs:` も試す** が現実解
- **`user-invocable: false` ≠ `disable-model-invocation: true`**。前者は `/` メニューに **表示しない**（UI 制御）、後者はモデルが **自動で呼び出さない**（実行制御）。デプロイ系・破壊的副作用のある Skill は **両方**設定するのが安全
- **`allowed-tools` は事前承認**。**ブロック機能ではない**。実際にツールを禁止したい場合は `.claude/settings.json` の `permissions.deny` を使う
- **Plan mode を使う閾値**。「複数ファイル + 複数の有効なアプローチ」の両方が揃ったら plan、片方だけなら direct で十分

**詰まりやすい箇所：**

- 「ディレクトリ横断ルール」をサブディレクトリの `CLAUDE.md` で実現しようとする — それは実現できない。`.claude/rules/` の glob パターンで条件付きロードを使う
- `~/.claude/commands/` にチーム共有のスラッシュコマンドを置いてしまい、`git clone` した新メンバーに届かない
- Skill の `allowed-tools` を読んで「他ツールがブロックされる」と誤解する — 試験の誤答選択肢に出るパターン
- `.mcp.json` に生のトークン (`"GITHUB_TOKEN": "ghp_..."`) を書いてリポジトリに commit する — 必ず `$` の形で環境変数展開
- **`user-invocable: false` で自動呼出を止められる** と思い込む。これは `/` スラッシュメニューに表示しないだけの UI 制御で、モデル側からの自動起動は止まらない。実行抑止には `disable-model-invocation: true` を併用
- **`disable-model-invocation: true` で context token を節約できる** という誤解。フラグの効果は「自動呼出抑止」だけで、Skill の name と description は system-reminder に注入され続ける。トークン節約目的の手段ではない（試験の罠候補）
- **path-rule は Read 時のみ注入され、Write 時には注入されない**（実装上の落とし穴）。「テストファイル編集時に強制したい規約」は Read 系操作の文脈にしか効かないことに注意。試験範囲ではないが本番運用で踏むので一度知っておく価値あり

### 完了基準（Definition of Done）

**時間目安**: 60〜90 分（コードを書くより設定ファイルを書く時間が支配的）

**動作確認チェックリスト：**

- [ ] `.claude/CLAUDE.md` の内容が `/memory` コマンドで確認できる
- [ ] `.claude/rules/api.md` が `src/api/**` 配下のファイルを Read した時のみ会話に注入される
- [ ] `.claude/skills/release-note/SKILL.md` が `/release-note` 明示呼び出しでのみ実行される（自動起動しない）
- [ ] `.mcp.json` の `$` が環境変数から展開される（生のトークンが commit されていない）
- [ ] `.claude/settings.json` の `permissions.deny` で `Bash(rm -rf:*)` 等が物理的にブロックされる
- [ ] `CLAUDE.local.md` が `.gitignore` 対象になっており、`git status` に出ない
- [ ] 単一ファイル修正は direct execution、マルチファイル変更は plan mode を意図的に使い分けられる

**関連する試験シナリオ**: [Scenario 2: Code Generation with Claude Code](/scenarios#scenario-2-code-generation-with-claude-code), [Scenario 4: Developer Productivity with Claude](/scenarios#scenario-4-developer-productivity-with-claude)

<details>
<summary><strong>参照実装を見る</strong>（自分で書いてから開くことを推奨）</summary>

**構成の概要**: チーム標準を `.claude/` に集約し、個人 override を `CLAUDE.local.md` に分離、API 専用ルールを `.claude/rules/` で条件付きロード、`/release-note` Skill を `context: fork` で隔離。

```md
<!-- .claude/CLAUDE.md（チーム共有・git 管理下） -->
# チーム標準

## コーディング規約

- TypeScript: strict mode 必須、`any` 型禁止、関数の戻り値型は明示
- React: Server Components 優先、'use client' は必要時のみ
- テスト: 新規モジュールは追加時にテストを書く（カバレッジ ratchet）

## Pull Request の流れ

1. `feat/...` ブランチで実装
2. `npm run typecheck && npm run test && npm run build` がパスすること
3. PR は draft で起票し、CI 緑になったら ready 化
4. squash merge

外部参照:

@./docs/architecture.md
@./docs/migration-rules.md
```

```md
<!-- .claude/rules/api.md（API 専用ルール、API ファイル編集時にだけロード） -->
---
paths:
  - "src/api/**/*.ts"
  - "src/api/**/*.tsx"
---
API ハンドラの規約：

- 入力 schema は zod で定義し、`parse` ではなく `safeParse` を使う
- すべてのエンドポイントに rate limit middleware を通す
- ログには PII（メール・電話番号）を含めない
```

```md
<!-- .claude/rules/typescript.md -->
---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---
- import は `import type` で型のみインポートする箇所と値インポートを区別する
- exhaustive switch は `assertNever` ヘルパでガードする
```

```md
<!-- .claude/skills/release-note/SKILL.md -->
---
name: release-note
description: 直近のリリースタグから現在までのコミットを集約し、CHANGELOG エントリを下書きする。`/release-note <tag>` で実行
context: fork
allowed-tools:
  - Bash
  - Read
argument-hint: "[from-tag]"
disable-model-invocation: true
model: sonnet
---

# Release note generator

`git log <from-tag>..HEAD --oneline` を解析し、Conventional Commits の prefix ごとに分類した changelog エントリをドラフトする。
副作用なし、実際の CHANGELOG.md への書き込みは人間レビュー後。
```

```jsonc
// .mcp.json — stdio + Streamable HTTP の混在例
// stdio（ローカル subprocess）と Streamable HTTP（hosted MCP）は同じ .mcp.json で混在 OK
{
  "mcpServers": {
    // stdio: ローカル subprocess を npx で起動
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    // Streamable HTTP: hosted MCP（2025-11-25 spec の remote 公式形式）
    "atlassian": {
      "url": "https://mcp.atlassian.com/v1",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer ${ATLASSIAN_TOKEN}"
      }
    }
  }
}
```

> **Transport の選び方**: ローカルツール（git, FS, DB の dev）は stdio、SaaS 連携は Streamable HTTP が原則。詳しくは [D2 §2.4 Transport の選択](/d2-tool-mcp#transport-の選択stdio--streamable-http) を参照。「SSE 単独 transport」は deprecated なので新規実装では選ばない（試験頻出区別ポイント）。

```md
<!-- CLAUDE.local.md（個人 override・gitignore 対象） -->
# 個人設定

ローカル開発で使うパス・ポート：

- DB: `postgres://localhost:5433/myapp_dev`
- 個人検証用ブランチは `wip/yokoto/...` プレフィックス
```

```jsonc
// .claude/settings.json — 実際のツール制限はここで
{
  "permissions": {
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ],
    "allow": [
      "Bash(npm run build)",
      "Bash(npm run typecheck)"
    ]
  }
}
```

**設計上のポイント**

- `.claude/CLAUDE.md` は **常時ロード**、`.claude/rules/*.md` は **glob 一致時のみロード**。常時ロードを肥大化させない（注意分散 (attention dilution) の予防）
- Skill の `disable-model-invocation: true` は副作用のある Skill（リリースノート生成・デプロイ・コミット）に必ず付ける。明示的に `/release-note` を呼んだときだけ実行されるようになり、誤発火を防げる
- `permissions.deny` で `Bash(rm -rf:*)` のような危険コマンドを物理的にブロック。これがフックや `allowed-tools` ではなく `permissions.deny` でしか実現できない点を体感する

</details>

> **関連**: ここで構築した `.claude/settings.json` の `permissions.deny`・[演習 1](#演習-1-build-a-multi-tool-agent-with-escalation-logic) の Agent SDK `PostToolUse` フックは「決定論的にツール挙動を強制する」 という同じ原則の異なる実装。試験では両者の違い（Claude Code lifecycle hooks vs Agent SDK hooks）を問う問題が出る — [D3.3](/d3-claude-code#33-claude-code-フックlifecycle-hooks) と [D1.5](/d1-agentic#15-agent-sdk-フックパターン) の対比を再確認しておく。

## 演習 3: Build a Structured Data Extraction Pipeline

**目標**: JSON schema 設計・tool_use・バリデーション・バッチ処理を実装する

**カバー**: D4 / D5

1. required / optional / nullable 混在の JSON schema を持つ抽出ツールを定義。情報が存在しないかもしれないフィールドは nullable 化。ドキュメントに情報がない場合にモデルが null を返すことを確認（ハルシネーション (hallucination) しないこと）
2. バリデーション失敗時の retry-with-error-feedback ループを実装。元ドキュメント・失敗した抽出・具体的なバリデーションエラーを含めて再送。フォーマットエラー（リトライ有効）vs 情報不在（リトライ無効）を区別
3. 多様な文書構造（inline citation vs bibliography、narrative vs structured table）を処理する few-shot examples を追加
4. Message Batches API で 100 件処理。`custom_id` で失敗文書を特定し、修正（大きすぎる文書はチャンク分割）して再送。処理時間と SLA 制約を計算
5. フィールド別 confidence score を出力させ、低信頼抽出を人間レビューにルーティング。ドキュメントタイプ・フィールド別に精度を分析

### 設計上のポイントと詰まりやすい箇所

**判断軸：**

- **「存在しないかもしれないフィールド」は nullable**、required にしない。required にするとモデルが値を捏造する（ハルシネーション）。`type: ["string", "null"]` で明示し、システムプロンプトで「不明な場合は null」を促す
- **enum + `"other"` パターン**。事前に列挙できない値は `"other"` を enum に含め、`category_detail` のような自由記述フィールドを併設する。`"unclear"` 値も同様で、判定不能ケースを LLM に正直に表明させる
- **リトライしていいエラーの見分け**。`tool_use` で構文は守られるが意味エラー（合計値の不一致など）は残る。バリデータが `validation` エラーを返す → リトライ可。情報がそもそもドキュメントに無い → リトライしても解決しない（無限リトライループ）
- **Batch API はエージェンティックループ非対応**。1 リクエスト = 1 往復。`tool_use` を含む抽出は OK だが、ループは展開できない。SLA 必須・ブロッキング処理には同期 API を使う

**詰まりやすい箇所：**

- 「全フィールド required にして安全側に倒す」 → モデルが捏造する（ハルシネーションの主要原因）
- pre-merge ブロッキングチェックに Batch API を使う（SLA 保証なし、最大 24 時間）
- 情報不在ケースを「frame を変えれば見つかるかも」と何度もリトライ
- `custom_id` を付けず、Batch のレスポンスをドキュメントに紐付けられない（失敗時に再送できない）
- 信頼スコアを LLM に「自己報告」させて閾値ルーティングに使う — 自己報告型は校正不良。アンサンブル（複数モデル合議）や rule-based の補助スコアが必要

### 完了基準（Definition of Done）

**時間目安**: 90〜120 分

**動作確認チェックリスト：**

- [ ] 情報が存在しないドキュメントで nullable フィールドが `null` を返す（モデルが値を捏造しない）
- [ ] `tool_choice: ` で抽出ツール呼び出しが強制される
- [ ] バリデーション失敗時、retry-with-error-feedback ループで具体的なエラーを context に含めて修正される
- [ ] 「フォーマットエラー（リトライ有効）」と「情報不在（リトライ無効）」が区別され、無限リトライループに陥らない
- [ ] Few-shot examples で inline citation / bibliography 等の異なる文書構造をハンドリングできる
- [ ] Batch API で 100 件投入し、`custom_id` で失敗ドキュメントを特定して再送できる
- [ ] line_item ごとの confidence で低信頼項目が人間レビューにルーティングされる

**関連する試験シナリオ**: [Scenario 6: Structured Data Extraction](/scenarios#scenario-6-structured-data-extraction)

<details>
<summary><strong>参照実装を見る</strong>（自分で書いてから開くことを推奨）</summary>

**構成の概要**: nullable 対応スキーマ + retry-with-error-feedback + few-shot + Batch 投入の最小一式。

```ts

const client = new Anthropic()

// 1. nullable と enum + "other" を活用したスキーマ
const extractInvoice = {
  name: 'extract_invoice',
  description: '請求書ドキュメントから構造化データを抽出する',
  input_schema: {
    type: 'object',
    properties: {
      invoice_number: { type: 'string' },                // required
      total_amount: { type: 'number' },                  // required
      currency: { type: 'string', enum: ['USD', 'JPY', 'EUR', 'other'] },
      currency_other: { type: ['string', 'null'] },       // currency=other の詳細
      due_date: { type: ['string', 'null'], description: 'ISO 8601 (YYYY-MM-DD) または不明なら null' },
      tax_rate: { type: ['number', 'null'] },
      line_items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            amount: { type: 'number' },
            confidence: { type: 'number', description: '0..1、低い場合は人間レビューへ' }
          },
          required: ['description', 'amount', 'confidence']
        }
      }
    },
    required: ['invoice_number', 'total_amount', 'currency', 'line_items']
  }
} as const

// 2. バリデータ — 構文ではなく意味エラーを検出する
type ValidationIssue = { path: string; reason: string }

function validateInvoice(data: any): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const sumOfLines = data.line_items.reduce(
    (s: number, li: any) => s + li.amount,
    0
  )
  if (Math.abs(sumOfLines - data.total_amount) > 0.01) {
    issues.push({
      path: '$',
      reason: `total_amount (${data.total_amount}) does not match sum of line_items (${sumOfLines})`
    })
  }
  if (data.currency === 'other' && !data.currency_other) {
    issues.push({ path: '$.currency_other', reason: 'must be set when currency=other' })
  }
  return issues
}

// 3. Few-shot プロンプトで「情報不在 → null」を強化
const SYSTEM_PROMPT = `あなたは請求書データを抽出するアシスタントです。

ルール:
- ドキュメントに記載がないフィールドは null を返す（推測しない）
- enum で網羅できない値は "other" を選び、currency_other に詳細を書く
- 各 line_item に confidence (0..1) を付ける。文字が掠れている・OCR ノイズが多い箇所は低めに

例 1（明確な請求書）:
入力: "Invoice #INV-001  Total: $100  Tax: 10%  Items: Widget x1 $90, Tax $10"
出力: {
  invoice_number: "INV-001",
  total_amount: 100,
  currency: "USD",
  currency_other: null,
  due_date: null,             // 期日の記載なし → null
  tax_rate: 0.10,
  line_items: [
    { description: "Widget x1", amount: 90, confidence: 0.95 },
    { description: "Tax", amount: 10, confidence: 0.95 }
  ]
}

例 2（OCR ノイズあり）:
入力: "Inv#A-22  T0tal: $48.20  Wdg3t: $43.20"  (一部判読不能)
出力: {
  invoice_number: "A-22",
  total_amount: 48.20,
  currency: "USD",
  currency_other: null,
  due_date: null,
  tax_rate: null,             // 不明 → null
  line_items: [
    { description: "Widget", amount: 43.20, confidence: 0.6 },  // OCR ノイズで low confidence
    { description: "(不明)", amount: 5.00, confidence: 0.3 }
  ]
}`

// 4. retry-with-error-feedback ループ
async function extractWithRetry(documentText: string, maxAttempts = 2) {
  let lastResult: any = null
  let lastIssues: ValidationIssue[] = []

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: `# Document\n\n${documentText}` }
    ]
    if (lastResult && lastIssues.length > 0) {
      // 失敗した抽出と具体的なエラーを context に含めて再送
      messages.push({ role: 'assistant', content: JSON.stringify(lastResult) })
      messages.push({
        role: 'user',
        content: `バリデーションが失敗しました。以下の問題を修正してください。

${lastIssues.map(i => `- ${i.path}: ${i.reason}`).join('\n')}

修正版を返してください。`
      })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      tools: [extractInvoice],
      tool_choice: { type: 'tool', name: 'extract_invoice' },  // 強制
      messages
    })

    const block = response.content.find(b => b.type === 'tool_use')
    if (!block || block.type !== 'tool_use') throw new Error('expected tool_use')

    const issues = validateInvoice(block.input)
    if (issues.length === 0) return { ok: true as const, data: block.input }

    lastResult = block.input
    lastIssues = issues
  }

  // ❌ Anti-pattern: ここで「情報不在」だった場合に無限リトライループ
  // ✅ 上限到達 → 人間レビューへ
  return { ok: false as const, partial: lastResult, issues: lastIssues }
}

// 5. Batch API 投入（100 件・SLA 不要なケースのみ）
async function submitBatch(documents: { id: string; text: string }[]) {
  return await client.messages.batches.create({
    requests: documents.map(d => ({
      custom_id: d.id,             // 紐付けに必須
      params: {
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        tools: [extractInvoice],
        tool_choice: { type: 'tool', name: 'extract_invoice' },
        messages: [{ role: 'user', content: `# Document\n\n${d.text}` }]
      }
    }))
  })
}
```

**設計上のポイント**

- `tool_choice: ` で抽出ツールの呼び出しを **強制**。`auto` だとモデルがテキストで返してくる失敗モードがある
- `validateInvoice` で意味エラー（合計値の不一致）を検出して context に流すのが retry-with-error-feedback の本質。「同じ入力で再試行」は無限リトライループ
- バッチ送信時の `custom_id` は **絶対に欠かせない**。失敗時の再送・部分的成功の合成・コスト分析のすべてで必要
- confidence は line_item ごとに出させて、合計や請求書全体の confidence は **後段で別途計算**する（自己報告のキャリブレーション不良を緩和）

</details>

> **関連**: `validateInvoice` の意味バリデーションと「失敗を context に流すリトライ」の構造は、[演習 4](#演習-4-design-and-debug-a-multi-agent-research-pipeline) の合成エージェントが受け取る `coverage_gaps` と同じ思想。「失敗を黙らせず、構造化して下流へ流す」が両演習の共通原則。

## 演習 4: Design and Debug a Multi-Agent Research Pipeline

**目標**: マルチエージェントの完全実装・エラー伝播・情報出所を体得する

**カバー**: D1 / D2 / D5

1. `allowedTools: ["Task"]` 付きコーディネーターを実装。各サブエージェントには直前の結果をプロンプトに直接含める（自動継承はない）
2. コーディネーターが 1 レスポンスで複数の Task 呼び出しを発行して並列実行。順次実行と比較してレイテンシ改善を測定
3. サブエージェントの出力に claim-source mapping（source URL・document 名・pub 日付・関連抜粋）を含めさせる。合成エージェントが帰属情報を保持することを確認
4. サブエージェントタイムアウトをシミュレート。コーディネーターが構造化エラーコンテキスト（失敗タイプ・試みたクエリ・部分結果）を受け取り、部分結果で処理を継続してカバレッジギャップを注釈付きで出力することを確認
5. 2 つの信頼できるソースが競合する統計を示すシナリオでテスト。合成出力が一方を選択せずに両方を帰属付きで含め、conflict を明示的に注釈することを確認

### 設計上のポイントと詰まりやすい箇所

**判断軸：**

- **サブエージェント description が委譲先を選ぶ唯一の根拠**。`search_agent: "Searches the web"` のような最小限ではなく、入力フォーマット・出力スキーマ・類似エージェントとの境界を入れる
- **コンテキストは自動継承されない**。ユーザーの元入力・前段の結果・制約条件 — すべて **コーディネーターがプロンプトに明示的に詰める**。試験頻出の最重要原則
- **独立タスクは 1 レスポンス内の並列 Task 発行**。順次実行はレイテンシが線形に増加する。後段が前段の結果に依存する場合のみ複数ターン化
- **部分的成功を採用、失敗を注釈**。1 つのサブエージェントが失敗 → 全体終了は anti-pattern。`partial_results` + `coverage_gaps` で帰属を明示
- **競合する情報源は両方残す**。一方を任意選択するのは出所情報（provenance）の消失。`conflict_detected: true` で両方を帰属付きで含める

**詰まりやすい箇所：**

- サブエージェント同士を直接通信させようとする（コーディネーター経由が原則）
- タイムアウトを空配列で「成功」として返してしまい、コーディネーターが「結果なし」と誤解
- Web 検索ツールを Synthesis Agent にも与える（4〜5 ツールを超えると選択精度が低下する罠 9）
- 合成出力で「数値が違う 2 ソース」のうち片方だけ採用してしまい、出所情報が消える
- 並列実行のつもりで `for ... await` してしまい順次実行になる（[D1.3](/d1-agentic#13-並列-vs-順次サブエージェント実行)）

### 完了基準（Definition of Done）

**時間目安**: 120〜180 分（最大の演習・3 演習の総合演習）

**動作確認チェックリスト：**

- [ ] コーディネーターが 1 アシスタントレスポンス内で複数 Task を発行し、並列実行される
- [ ] サブエージェントプロンプトに「元のユーザー要求」「前段の構造化出力」「制約」「出力スキーマ」がすべて明示的に詰められている
- [ ] サブエージェント出力に `source_url`・`published_date`・関連抜粋が含まれる
- [ ] サブエージェントタイムアウトを `Promise.allSettled` で受け、`partial_results` が保たれる
- [ ] 失敗したサブエージェントが `coverage_gaps` として明示的に注釈される
- [ ] 競合する数値（同じ metric で異なる値）が `conflict_detected: true` で両方保持される（一方を任意選択しない）
- [ ] 順次実行と比較して並列実行のレイテンシ改善を実測できる

**関連する試験シナリオ**: [Scenario 3: Multi-Agent Research System](/scenarios#scenario-3-multi-agent-research-system)

<details>
<summary><strong>参照実装を見る</strong>（自分で書いてから開くことを推奨）</summary>

**注意**: この演習の参照実装は **設計骨格（疑似コード混在）** です。`callSubagent`・`TaskTool`・`fakeDb` といったシンボルは未定義のまま残しており、そのままコピペでは動きません。これは演習 4 の本質が「Anthropic SDK のハンドラ詳細」ではなく「coordinator が部分的成功・競合・出所情報をどう構造化するか」にあるため、判断構造を読みやすさ優先で示しています。完全に runnable な実装が必要な場合は、`Promise.allSettled` と `client.messages.create` を直接使う形に各自で詰めてください。

**構成の概要**: コーディネーターが 1 レスポンスで Search / Analysis Agent を並列発行 → 部分的成功と競合を構造化して合成エージェントへ。

```ts
// 1. コーディネーターから並列 Task 発行
// 1 つの assistant レスポンスの content に複数 tool_use を含めれば並列
const coordinatorResponse = await client.messages.create({
  model: 'claude-opus-4-7',
  max_tokens: 8192,
  tools: [TaskTool],   // allowedTools: ["Task"] 相当
  messages: [
    { role: 'user', content: 'Q4 売上トレンドと競合動向を比較した投資レポートを作成' }
  ]
})

// 期待される content:
// [
//   { type: 'tool_use', name: 'Task', input: { description: 'Search Agent: ...', prompt: <full ctx> } },
//   { type: 'tool_use', name: 'Task', input: { description: 'Analysis Agent: ...', prompt: <full ctx> } }
// ]

// 2. コンテキスト渡し — 元要求 + 前段結果 + 制約 + 出力スキーマを明示
function buildAnalysisPrompt(originalRequest: string, searchResults: unknown) {
  return `## 元のユーザー要求
"${originalRequest}"

## 前段（Search Agent）の出力
${JSON.stringify(searchResults, null, 2)}

## あなたのタスク
上記の検索結果を分析し、以下の JSON 形式で返してください：

{
  "trends": [
    { "metric": string, "direction": "up" | "down" | "flat", "evidence": string, "source_url": string, "published_date": string }
  ],
  "competitors": [
    { "name": string, "signal": string, "source_url": string, "published_date": string, "excerpt": string }
  ]
}

## 制約
- 公開日 2024 年以降のソースのみ使用
- 各 claim に source_url と published_date を必ず含める
- 不確実な場合は trends/competitors から除外し、out_of_scope セクションに移すこと`
}

// 3. 部分的成功 + カバレッジギャップ注釈
type SubagentSuccess = { ok: true; data: unknown }
type SubagentFailure = {
  ok: false
  errorCategory: 'transient' | 'validation' | 'permission' | 'business'
  attemptedQuery: string
  partialResults: unknown | null
  alternatives: string[]
}
type SubagentResult = SubagentSuccess | SubagentFailure

async function runSubagentsInParallel(
  tasks: Array<{ name: string; prompt: string; query: string }>
): Promise<SubagentResult[]> {
  const results = await Promise.allSettled(
    tasks.map(t => callSubagent(t.name, t.prompt))
  )

  return results.map((r, i) => {
    if (r.status === 'fulfilled') return { ok: true, data: r.value }
    return {
      ok: false,
      errorCategory: 'transient',
      attemptedQuery: tasks[i].query,
      partialResults: null,
      alternatives: [
        'retry with narrower date range',
        'fall back to cached results',
        'skip and annotate as coverage_gap'
      ]
    }
  })
}

// 4. 合成エージェントの入力構築 — 失敗を「カバレッジギャップ」として明示
function buildSynthesisInput(
  results: SubagentResult[],
  originalRequest: string
) {
  const successful = results.filter((r): r is SubagentSuccess => r.ok)
  const failed = results.filter((r): r is SubagentFailure => !r.ok)

  return {
    original_request: originalRequest,
    partial_results: successful.map(s => s.data),
    coverage_gaps: failed.map(f => ({
      attempted_query: f.attemptedQuery,
      error_category: f.errorCategory,
      suggested_alternatives: f.alternatives
    })),
    is_complete: failed.length === 0
  }

  // ❌ Anti-pattern: if (failed.length > 0) throw new Error('全体失敗')
  // → 部分結果を捨ててしまう。コーディネーターは部分結果 + ギャップ注釈を必ず合成へ流す
}

// 5. 競合する情報源の扱い — 一方を選ばず両方を帰属付きで残す
type Claim = {
  metric: string
  value: number
  source_url: string
  published_date: string
}

type SynthesizedClaim = {
  metric: string
  values: Array<Claim>
  conflict_detected: boolean
  resolution_note: string | null
}

function reconcileClaims(claims: Claim[]): SynthesizedClaim[] {
  const byMetric = new Map<string, Claim[]>()
  for (const c of claims) {
    if (!byMetric.has(c.metric)) byMetric.set(c.metric, [])
    byMetric.get(c.metric)!.push(c)
  }

  return [...byMetric.entries()].map(([metric, vs]) => {
    const values = vs.map(v => v.value)
    const allEqual = values.every(v => v === values[0])
    return {
      metric,
      values: vs,                         // 両方の出所を保持
      conflict_detected: !allEqual,
      resolution_note: allEqual
        ? null
        : `Sources disagree on ${metric}. Reporting both with attribution; reader should choose primary source.`
    }
  })

  // ❌ Anti-pattern: const winner = vs[0]  // 任意選択 → 出所情報の消失
}
```

**設計上のポイント**

- `Promise.allSettled` を使うのは部分的成功を保つため。`Promise.all` だと 1 つの reject で全体が崩れる
- `coverage_gaps` を合成エージェントに渡すと、レポートに「この観点は調べられなかった」を明示できる。ユーザーが判断の不確実性を認識できる
- 競合データの解決を **コードでも LLM でもなく「読者」に委ねる** のは意図的。CCA-F が問う出所情報の保持は「機械が選ぶ」を明示的に拒否する設計
- `published_date` を必ず claim に含めるのは、新旧データの不一致と「ソースの正面衝突」を区別するため。古い記事 → 新しい記事 で値が変わるのは矛盾ではなく時系列差異

</details>

> **関連**: 4 演習はここで一周する。[演習 1](#演習-1-build-a-multi-tool-agent-with-escalation-logic) の `errorCategory` がここの `SubagentFailure` の核、[演習 2](#演習-2-configure-claude-code-for-a-team-development-workflow) の Skills `context: fork` がサブエージェント並列化の Claude Code 側実装、[演習 3](#演習-3-build-a-structured-data-extraction-pipeline) の retry-with-error-feedback が `coverage_gaps` を合成側に渡す思想と一致。試験のシナリオベース問題は「これらを組み合わせた状況での判断」を問うので、4 演習を完走したら一度全体を俯瞰しておく。


> 4 演習をすべて手で実装すると、試験で問われる判断軸が体感的に身につきます。とくに **演習 4 のマルチエージェントは試験頻出** なので、最低 1 回は完走することを強く推奨します。

---

# 用語チートシート（試験直前確認用）

## Claude Agent SDK

| 用語 / 値 | 意味・重要ポイント |
|---|---|
| `stop_reason: "tool_use"` | ツール実行して次イテレーションへ継続 |
| `stop_reason: "end_turn"` | ループ終了・最終レスポンス返却 |
| `PostToolUse` フック | ツール結果を変換 / インターセプト。決定論的保証に使用 |
| `allowedTools: ["Task"]` | コーディネーターがサブエージェントを生成するために必須 |
| `AgentDefinition` | description・system prompt・tool restrictions でサブエージェントを定義 |
| `fork_session` | 共有ベースラインから独立ブランチ作成 |
| `--resume <name>` | 名前付きセッションを再開 |

## MCP

| 用語 / 値 | 意味・重要ポイント |
|---|---|
| Tools | model-controlled。アクション実行（外部 API 等） |
| Resources | app-controlled。読み取り専用データ公開・コンテンツカタログ |
| Prompts | user-controlled。事前定義ワークフロー指示テンプレート |
| `isError` フラグ | ツール失敗をエージェントに通知する MCP パターン |
| `errorCategory` | transient / validation / permission / business |
| `isRetryable` | transient: true、その他: false |
| `.mcp.json` | プロジェクトスコープ（チーム共有） |
| `~/.claude.json` | ユーザースコープ（個人・実験） |

## Claude Code 設定

| パス / コマンド | 意味 |
|---|---|
| `~/.claude/CLAUDE.md` | ユーザーレベル（バージョン管理外・全プロジェクト共通の個人設定） |
| `.claude/CLAUDE.md` | プロジェクトレベル（バージョン管理・チーム共有） |
| `CLAUDE.local.md` | プロジェクトローカル（gitignore 対象・個人 override） |
| `@` パス参照 | 外部ファイルを CLAUDE.md に参照（`@./docs/api.md`）。「@import」キーワードは不要 |
| `.claude/rules/` | YAML フロントマターの `paths:` または `globs:` で glob パターン条件付きロード |
| `.claude/commands/` | プロジェクトスコープのカスタムコマンド |
| `~/.claude/commands/` | ユーザースコープのカスタムコマンド |
| `.claude/skills/` | Skill ファイル（SKILL.md + frontmatter） |
| `.claude/hooks/` または `settings.json` | Claude Code ライフサイクルフック（PreToolUse・PostToolUse 等） |
| `context: fork` | 独立サブエージェントで Skill を実行 |
| `allowed-tools` | **指定ツールへの事前承認付与**（プロンプト省略）。ブロック機能ではない |
| `argument-hint` | `/` オートコンプリートメニュー用の表示専用ヒント文字列 |
| `disable-model-invocation` | Skill の自動呼び出しを無効化（明示的に `/skill-name` でのみ実行） |
| `permissions.deny` | 実際にツールをブロックする設定（`.claude/settings.json` 内） |
| `-p / --print` | CI/CD 非インタラクティブモード（必須） |
| `--output-format json` | JSON 形式で出力 |
| `--json-schema` | JSON スキーマを指定 |
| `/memory` | ロード中のメモリファイルを確認・デバッグ |
| `/compact` | コンテキストを圧縮（要約に置き換え） |
| `/agents` | サブエージェントの管理（一覧・作成・編集） |
| `/skill <name>` | Skill の明示的呼び出し（`disable-model-invocation` Skill 用） |

## Claude API

| 用語 / 値 | 意味 |
|---|---|
| `tool_choice: "auto"` | ツールかテキストかモデルが自由選択（構造化保証なし） |
| `tool_choice: "any"` | 必ずいずれかのツールを呼ぶ（ツール呼び出し保証） |
| `tool_choice: ` | 特定ツールを強制実行 |
| Message Batches API | 50% コスト削減・最大 24 時間・SLA 保証なし・**エージェンティックループ非対応**（バッチ内では 1 往復のみ。tool_use 継続のループ展開不可） |
| `custom_id` | バッチリクエスト / レスポンスの紐付けと失敗特定に使用 |

---

# Anti-patterns 完全集（試験の誤答選択肢対策）

試験の誤答選択肢は「知識があると選びやすい」anti-pattern で設計されています。ドメイン別に整理します。

## Domain 1: Agentic

- 自然言語シグナル（「完了しました」）でエージェンティックループ終了を判定
- 固定の繰り返し回数を主要停止機構にする
- アシスタントのテキストコンテンツ有無を完了指標にする
- prompt 指示だけで金融操作の順序を強制する（非ゼロ失敗率）
- サブエージェント同士を直接通信させる（コーディネーターを経由しない）
- タスク分解が狭すぎてトピックの一部しかカバーしない
- コーディネーターがすべての状況で全パイプラインを通す（動的選択をしない）
- **独立タスクを別ターンで順次実行する（並列化機会の損失）**
- **サブエージェントが必要な情報をプロンプトに含めない（コンテキスト自動継承の誤想定）**
- **サブエージェント description が最小限で、コーディネーターが選択を誤る**

## Domain 2: Tool / MCP

- ツール description が最小限（"Retrieves information" 等）
- 汎用エラー "Operation failed" を返す（構造化情報なし）
- タイムアウト（access failure）を「成功・結果は空」として返す
- 1 エージェントに 18 個のツールを与える
- 合成エージェントに Web 検索ツールを与える（専門外・誤用の原因）
- チーム共有設定を `~/.claude.json` に置く（個人スコープ）
- **1 つの巨大ツールで action 引数で分岐させる（権限管理が不可能）**
- **削除操作を含むツールに固有の hook を設定しない（事故の温床）**

## Domain 3: Claude Code

- チームへのコマンド配布を `~/.claude/commands/` に置く
- ディレクトリ横断ルールにサブディレクトリ CLAUDE.md を使う（glob パターン不可）
- 単一ファイルのバグ修正に Plan mode を使う（オーバーキル）
- CI/CD で `-p` フラグなしに Claude Code を実行（ハングする）
- `CLAUDE_HEADLESS=true` を使う（存在しない）
- `--batch` フラグを使う（存在しない）
- コードを生成した同じセッションでレビューさせる（認知バイアス）
- **`allowed-tools` でツールをブロックしようとする（事前承認機能であり、ブロック機能ではない）**
- **`@import path/to/file` と書く（正しくは `@path/to/file` のみ）**
- **「保存後に prettier 実行」を CLAUDE.md に書く（決定論的な PostToolUse hook で実装すべき）**
- **個人 override 設定を `.claude/CLAUDE.md` に書く（チームを汚染する。`CLAUDE.local.md` を使うべき）**

## Domain 4: Prompt Engineering

- "be conservative" 等の曖昧な精度指示（効果なし）
- 情報が存在しないかもしれないフィールドを required にする（ハルシネーション (hallucination) の原因）
- pre-merge ブロッキングチェックに Batch API を使う（SLA 保証なし）
- 情報がそもそも存在しない場合にリトライを繰り返す（効果なし）
- 大量ファイルを一度にレビューさせる（注意分散; attention dilution）
- コード生成インスタンスに自分でレビューさせる（認知バイアス）
- **`tool_use` を含むワークフローを Batch に投げる（バッチではエージェンティックループが展開できない）**

## Domain 5: Context

- センチメントスコアでエスカレーション判断する（複雑度と無相関）
- 自己報告型信頼スコアでエスカレーション判断する（キャリブレーション不良）
- ツール出力を全フィールドそのままコンテキストに蓄積する
- エラーを「成功・結果は空」として返す
- 単一サブエージェントの失敗でワークフロー全体を終了させる
- 複数ソースが競合する場合に一方を任意選択する（出所情報 (provenance) が消える）
- 「大きなコンテキストウィンドウ」で注意分散を解決しようとする
- **`/compact` に頼って transactional facts（金額・ID・日付）を要約に流す**
- **permission error をリトライする（リトライ可能タイプではない）**
- **「情報がドキュメントに存在しない」ケースで何度もリトライする**

## 試験直前の最終確認 — この 10 点を確実に


> 1. `stop_reason` の値：`"tool_use"` → 継続、`"end_turn"` → 終了
> 2. CLAUDE.md の 4 階層：user（`~/.claude/`）/ project（`.claude/`）/ project-local（`CLAUDE.local.md`）/ directory（サブディレクトリ）
> 3. `tool_choice` の 3 設定：auto / any / forced — 違いと使いどころ
> 4. プログラマティック強制 vs プロンプト指示の判断基準
> 5. Batch API が適さないワークフロー（ブロッキング・SLA 必要・**エージェンティックループ含む**）
> 6. サブエージェントはコンテキストを自動継承しない（[D1.4](/d1-agentic#14-サブエージェントへのコンテキスト渡し)）
> 7. センチメントスコアはエスカレーション基準として使えない
> 8. **サブエージェント独立タスクは 1 レスポンスで並列実行（[D1.3](/d1-agentic#13-並列-vs-順次サブエージェント実行)）**
> 9. **`allowed-tools` はブロック機能ではなく事前承認機能**（実際にブロックするのは `permissions.deny`）
> 10. **Agent SDK Hooks（[D1.5](/d1-agentic#15-agent-sdk-フックパターン)）と Claude Code Hooks（[D3.3](/d3-claude-code#33-claude-code-フックlifecycle-hooks)）は別物**

---

# Anthropic Academy — コース完全ガイド

[`anthropic.skilljar.com`](https://anthropic.skilljar.com) で全コース無料受講可能。試験準備のために受講すべき優先順位を示します。


> **CCA 試験対策の推奨受講順序**
>
> 1. **Building with the Claude API**（8 時間以上 — 最重要）
> 2. **Introduction to MCP**（MCP の 3 プリミティブ）
> 3. **MCP Advanced Topics**（transport・sampling・notifications）
> 4. **Claude Code in Action**（1 時間 — Domain 3 の核心）
> 5. **Introduction to Agent Skills**（Skills 設定の詳細）
> 6. **Introduction to Subagents**（サブエージェント設計）
> 7. **Claude 101**（基礎確認・スキップ可）


## 必須コース

### Building with the Claude API 必須

84 講義・8 時間以上。API の基礎からエージェント・ワークフローまで。**試験の核心コース**。

**カリキュラム**: API 認証 → 会話管理 → システムプロンプト → Prompt Engineering → Tool use → RAG → Extended thinking → Prompt caching → MCP → Claude Code → エージェント / ワークフロー

**カバー範囲**: D1, D2, D4

### Introduction to MCP 必須

MCP の tools・resources・prompts の 3 プリミティブを Python SDK で実装。MCP サーバー / クライアントをゼロから構築。

**カリキュラム**: MCP 概要 → ツール定義 → Server Inspector → クライアント実装 → Resources → Prompts

**カバー範囲**: D2

### Claude Code in Action 必須

1 時間。Claude Code の開発ワークフロー統合・SDK 概念・MCP 連携。最短で Domain 3 の核心を把握。

**カリキュラム**: 他システムとの連携 → SDK 概念 → 実際の開発タスク → Coursera でも受講可

**カバー範囲**: D3

## 高優先コース

### MCP Advanced Topics

Sampling・通知・Roots（ファイルアクセス制御）・JSON メッセージ・STDIO / StreamableHTTP transport。

**カリキュラム**: Sampling → Log/Progress 通知 → Roots → JSON メッセージ → STDIO トランスポート → StreamableHTTP トランスポート

**カバー範囲**: D2

### Introduction to Agent Skills

Skills の作成・設定・チーム配布・トラブルシューティング。SKILL.md フロントマターの詳細。

**カリキュラム**: Skills 作成 → フロントマター設定 → チーム配布 → 問題解決

**カバー範囲**: D3

### Introduction to Subagents

Claude Code のサブエージェント機能。`/agents` コマンド・コンテキスト分離・タスク委譲パターン。

**カリキュラム**: サブエージェントの仕組み → カスタムサブエージェント作成 → 効果的な設計 → 使い所

**カバー範囲**: D1, D3

## 中優先コース

### Claude 101

Claude の基本的な使い方とコア機能。試験の前提知識を素早く確認。経験者はスキップ可。

### Claude Code 101

Claude Code の日常的な開発ワークフローへの組み込み方。

**カバー範囲**: D3

## 低優先・試験範囲外

### Claude with Amazon Bedrock

AWS 経由での Claude 利用。試験範囲外（cloud provider 設定は Out-of-Scope）のためスキップ可。

### AI Fluency / 教育者向け / 学生向け

AI 活用の基本フレームワーク。非技術職向け。技術者はスキップして問題なし。


> **Academy コースの最大活用法**
>
> **Building with the Claude API** は「Agents and Workflows」セクションが試験の D1 と直結します。Prompt Engineering・Tool use・MCP のセクションは D2・D4 に直結します。ただし **コースだけでは不十分**。[公式 Exam Guide 演習 1〜4](/exercises) の実装が理解を定着させます。

---

# 公式 Practice Exam と受験戦略


> **公式 Practice Exam について**
>
> - 60 問・実際の試験と同一シナリオ形式・各回答後に解説表示
> - Partner Network 登録後に Skilljar 内で利用可能
> - **本番受験前に必ず完了すること**（Exam Guide の推奨）
> - 目標：Practice Exam で **900 / 1000 以上を安定して出せる** ようになってから本番予約


## 自己採点と学習サイクル

Practice Exam は単に受けて終わりにせず、**間違えたドメインを特定 → 該当演習に戻って再実装する** ループの起点として使います。Skilljar の解説とドメイン別正答率がこのサイクルへの入口です。

### スコア帯別の方針

| スコア帯 | 状態の解釈 | 推奨アクション |
|---------|---------|--------------|
| **〜 599** | 基礎不足 | [Anthropic Academy](/academy) の必須 3 コースから再受講。[演習](/exercises) を 1 つも完走していない可能性大 |
| **600 〜 719** | 知識はあるが判断軸が未定着 | 全 [演習](/exercises) を順番に再実装。とくに「設計の判断軸」セクションを精読 |
| **720 〜 849** | 合格圏内、苦手ドメインを特定 | ドメイン別正答率を確認し、下表のドリル先に戻る |
| **850 〜 899** | 本番でも安定合格圏 | 試験で出ていない 2 つの [シナリオ](/scenarios) を読み込んでから本番予約 |
| **900 〜** | 本番レディ | 同じ Practice Exam で 2 回連続 900+ を確認したら本番予約 |

### ドメイン別誤答 → ドリル対応表

Skilljar の Practice Exam 結果ページでドメイン別正答率を確認し、**80% を切ったドメインは下表の演習に戻ります**。

| ドメイン | 配点 | 戻るべき演習 | 重点的に再読する箇所 |
|---|---:|---|---|
| **D1: Agentic** | 27% | [演習 1](/exercises#演習-1-build-a-multi-tool-agent-with-escalation-logic), [演習 4](/exercises#演習-4-design-and-debug-a-multi-agent-research-pipeline) | stop_reason 制御、並列 Task、コンテキスト渡し、サブエージェント description |
| **D2: Tool / MCP** | 18% | [演習 1](/exercises#演習-1-build-a-multi-tool-agent-with-escalation-logic), [演習 2](/exercises#演習-2-configure-claude-code-for-a-team-development-workflow) | ツール description の境界線、構造化エラー、MCP 3 プリミティブ |
| **D3: Claude Code** | 20% | [演習 2](/exercises#演習-2-configure-claude-code-for-a-team-development-workflow) | CLAUDE.md 階層、Skills フロントマター、`permissions.deny` vs `allowed-tools` |
| **D4: Prompt Eng** | 20% | [演習 3](/exercises#演習-3-build-a-structured-data-extraction-pipeline) | nullable schema、retry-with-error-feedback、Batch API の境界 |
| **D5: Context** | 15% | [演習 3](/exercises#演習-3-build-a-structured-data-extraction-pipeline), [演習 4](/exercises#演習-4-design-and-debug-a-multi-agent-research-pipeline) | コンテキスト圧縮、エスカレーション基準、出所情報（provenance）保持 |

### 学習サイクル


> **1 周のフロー**
>
> 1. **Practice Exam 受験**（60 問・約 90 分）
> 2. **ドメイン別正答率を Skilljar でチェック**
> 3. **80% を切ったドメイン**を上表で特定し、対応する演習に戻る
> 4. その演習の **完了基準（Definition of Done）** チェックリストをすべて ✅ できるか確認
> 5. ✅ できない項目があれば、判断軸 → 詰まりやすい箇所 → 参照実装の順で再読し、再実装
> 6. **1 週間〜10 日後** に Practice Exam 再受験（短すぎると問題を覚えてしまう）
> 7. **900/1000 を 2 回連続** で出せたら本番予約
>
> このサイクルを 1〜3 周まわすのが、合格者に共通するパターン。1 回目で 900+ を取れる人はほぼいません。


## コミュニティリソース（Practice Exam の補完）

| リソース | 内容 | URL |
|---|---|---|
| claudecertifications.com | 25 問練習問題・ドメイン別学習ガイド・12 週間プラン | claudecertifications.com |
| Rick Hightower（Medium） | 8 部作シリーズ。全シナリオの詳細解説 + 60 問模擬試験 | Medium @richardhightower |
| certsafari.com | 361 問の試験形式練習問題 | certsafari.com/anthropic/claude-certified-architect |
| Big Tech Careers | 5 日間合格者による 3 モード学習システム（Claude プロジェクト活用） | newsletter.bigtechcareers.com |

## 試験当日の戦略


> **本番試験のポイント**
>
> 1. 試験は **一時停止不可**。2.5 時間をカレンダーでブロック
> 2. 各問題：**「何が根本原因か」「最もコストが低い解決策か」「決定論的保証が必要か」** の 3 点で判断
> 3. 3 つの選択肢が正しく見える時は「最小コストで根本原因に対処するもの」を選ぶ
> 4. 回答せずにスキップしても減点なし。不明な問題は必ず guess する
> 5. シナリオのコンテキストを常に意識（同じ知識でも適用場面で答えが変わる）


## チェックリスト：本番予約前

| 確認項目 | 推奨水準 |
|---|---|
| Anthropic Academy 必須 3 コース受講 | 完了 |
| [4 つの公式演習](/exercises) を最低 1 回ずつ実装 | 完了 |
| [合格の 3 原則](/) を例示込みで説明できる | 即答できる |
| [罠 Top 10](/) を「なぜ罠か」まで言語化できる | 全 10 個 |
| 公式 Practice Exam | 900 / 1000 を 2 回以上連続 |
| ProctorFree 環境を事前に確認 | 受験当日にトラブル回避 |

---

# このサイトについて

`ccaf.dev` は **Claude Certified Architect – Foundations (CCA-F)** 試験対策の非公式学習ガイドです。

> 本サイトは Anthropic, PBC と関係のない非公式の学習ガイドです。
> This is an unofficial study guide. Not affiliated with or endorsed by Anthropic, PBC.

## サイトの位置づけ

CCA-F は Anthropic 公式の認定資格です。本サイトは公式 Exam Guide および Anthropic Academy の公開情報をもとに、学習者向けに整理した **参考資料** であり、Anthropic 公式の教材ではありません。

- 公式 Exam Guide には載っていない解釈や補足は、執筆者個人の理解に基づきます
- 試験仕様の正本は常に [Anthropic 公式ドキュメント](https://docs.claude.com/) です
- 内容に誤りや古い情報を見つけた場合は GitHub Issue でご指摘ください

## 著者

[Toshihiro Yokota（@yokoto）](https://github.com/yokoto)

## 更新方針

- Anthropic 公式の試験仕様変更・Academy 更新を四半期ごとに確認
- 重要な変更は `content/changelog.mdx`（予定）で履歴化
- 受験者からのフィードバックは GitHub Issue で受付

## 商標について

- "Claude," "Claude Code," "MCP," "CCA-F" およびその他の Anthropic プロダクト名は Anthropic, PBC の商標または商品名です
- 本サイトでの言及はすべて nominative fair use（指名的フェアユース）に基づくもので、商標権者の承認・後援を示すものではありません

## ライセンス

- **コード**: MIT — [LICENSE](https://github.com/yokoto/ccaf-guide/blob/main/LICENSE)
- **コンテンツ**: CC BY 4.0 — [LICENSE-CONTENT.md](https://github.com/yokoto/ccaf-guide/blob/main/LICENSE-CONTENT.md)

転載・引用時は出典として「[CCA-F 完全対策教科書（ccaf.dev）](https://ccaf.dev)」とリンクをお願いします。
