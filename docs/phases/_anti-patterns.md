# Anti-patterns

| Anti-pattern | What goes wrong |
|---|---|
| **Skipping Discover** | Editing based on the single reported symptom. The user reports the symptom; Discover finds the disease. |
| **Editing without a Design** | Making consistent-feeling changes without a `docs/` policy. The next agent will undo them when they hit a different example. |
| **One-way acceptance criteria** | Implementer can't push back on a flawed Plan. Planner errors propagate into Implement. Use the negotiation step in Phase 3. |
| **Multiple PRs per cleanup with one reviewer** | Adds review cycles without benefit. Use atomic commits inside one PR instead. |
| **Spec and content edits in the same commit** | The spec must land first (or as the first commit on the branch) so subsequent commits can be reviewed against it. |
| **Closing the issue without Verify** | The PR must show typecheck + build exit codes. Without them, the next refresh will discover the regression. |
| **Indefinite Verify retries** | Looping past iteration 2 wastes time and usually means the spec is wrong, not the implementation. Escalate. |
| **Quietly expanding scope** | If Discover surfaces an unrelated problem, open a separate issue. Don't bundle. |
