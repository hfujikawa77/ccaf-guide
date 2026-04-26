# Terminology glossary

Canonical Japanese-language terminology for `content/*.mdx`. Apply consistently. When introducing a new term not listed here, prefer existing precedent in the content; when no precedent exists, follow the decision rules below.

## Decision rules

| Case | Rule | Example |
|---|---|---|
| TypeScript literal value | Keep English | `'transient' \| 'permission'` |
| JSON / settings key | Keep English | `permissions.deny` |
| Backtick-wrapped identifier in prose | Keep English | `` `transient` のみ `isRetryable: true` `` |
| Prose term whose code-literal counterpart appears in the same section | Keep English (avoids cognitive cost of mapping prose ↔ code) | `permission エラーをリトライする` |
| Prose term with no code counterpart | Use the canonical Japanese form below | `タイムアウト` (not `timeout`) |

## Katakana forms

| Term | English |
|---|---|
| ハルシネーション | hallucination |
| コンテキスト | context |
| サブエージェント | sub-agent |
| コーディネーター | coordinator |
| エスカレーション | escalation |
| リトライ | retry |
| フォールバック | fallback |
| キャリブレーション不良 | calibration deficiency |
| センチメントスコア | sentiment score |
| タイムアウト | timeout |
| マルチエージェント | multi-agent |
| アンサンブル | ensemble |
| ブーリアン | Boolean |

## Sino-Japanese (kanji) forms

| Term | English |
|---|---|
| 並列 | parallel |
| 順次 | sequential |
| 構造化エラー | structured error |
| 副作用のある | with side effects |
| 出所情報 | provenance |
| 注意分散 | attention dilution |
| 無限リトライループ | infinite retry loop |
| 疑似コード | pseudocode |
| 判断の不確実性 | decision uncertainty |
| 判断の分岐が少ない | shallow decision branching |

## Hybrid (Japanese + English gloss on first occurrence per page)

| Form | First occurrence | Subsequent |
|---|---|---|
| Agent harness | `エージェントハーネス（agent harness）` | `エージェントハーネス` |
| Attention dilution | `注意分散（attention dilution）` | `注意分散` |
| Provenance | `出所情報（provenance）` | `出所情報` |
| Hallucination | `ハルシネーション（hallucination）` | `ハルシネーション` |

## Forbidden forms (do not use)

| Forbidden | Use instead |
|---|---|
| `ボーリアン` | `ブーリアン` |
| `インフィニットリトライ` | `無限リトライループ` |
| `文脈` (when meaning LLM context window) | `コンテキスト` |
| `プロベナンス` | `出所情報` |
| `パーミッション` (as standalone prose) | Keep `permission` English when paired with code literals |
| `感情スコア` | `センチメントスコア` |
| `本番グレード` | `本番運用に耐えうる` |
| `永久リトライ` | `無限リトライループ` |
| `次手` | `次のアクション` |
| `副作用持ち` | `副作用のある` |
| `意思決定の不確実性` | `判断の不確実性` |

## Style notes

- Casual verbs in technical prose: prefer `含める / 添える` over `詰める / 入れる`
- Top-10 trap table uses bare numbers (`罠 1`〜`罠 10`), not `罠 #N`
- `疑似コード` uses kanji `疑` (not `擬`) — matches existing content usage
- `タイムアウト` is for prose only; code symbols like `TimeoutError` keep English
- `コンテキスト` is the LLM context-window meaning; `文脈` is reserved for "scope/case" sense (e.g., "Read 操作の文脈")

## See also

- `docs/migration-rules.md` — HTML → MDX conversion rules
- `docs/architecture.md` — stack rationale and verification log
