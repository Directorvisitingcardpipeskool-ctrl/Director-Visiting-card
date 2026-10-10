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

## Application architecture
- Public director data is loaded through a publishable-key server function and shared TanStack Query options so card links render during SSR without authentication.
- Director editing uses authenticated browser mutations with database-enforced admin roles in a separate protected roles table; signing up never grants administrator privileges.
- Reusable director presentation and exports live outside route modules so the directory and each shareable card use the same behavior.
- Brand media uses CDN asset pointers; only the square favicon stays in public for browser compatibility.
