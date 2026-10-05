<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- ============= Project rules (append below) ============= -->

- Landing page is a single client-side route (src/routes/index.tsx); agent catalog and industries are static data in that file — no backend until the user asks for orders/accounts.
- Design tokens live in src/styles.css (oklch); fonts load via <link> in src/routes/__root.tsx, never @import in CSS.
