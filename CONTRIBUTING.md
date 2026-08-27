# Contributing

## Branch and pull request flow

1. Branch from `main` using `feature/short-name`, `fix/short-name`, or `chore/short-name`.
2. Keep components small enough to review and place feature-specific code together.
3. Add tests for business behavior and regression fixes.
4. Check keyboard, loading, empty, error, and responsive states where relevant.
5. Request at least one teammate review before merging.

## Definition of done

- `npm run lint`, `npm test`, and `npm run build` pass.
- UI changes work at mobile and desktop widths.
- Interactive elements have accessible names and keyboard focus.
- API contract changes are coordinated with the backend repository.
- No credentials or local `.env` files are committed.

Use conventional commit subjects where practical, for example `feat(cart): add quantity controls`.
