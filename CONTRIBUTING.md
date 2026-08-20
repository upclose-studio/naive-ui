# Contributing

- For new features & bug fixes, please create pull request to `main` branch.
- For documentation, please create pull request to `docs` branch.

## Useful Commands

```bash
# open the dev server, please note that hot module reload doesn't work well
# if you find anything doesn't work, just refresh the page
# if you aren't able to open the page at the first time, try to refresh a couple of times
# pnpm version 11.10.0 and above is required
pnpm run dev

# testing
pnpm run test

# testing some component
pnpm run test -- src/xxx

# testing with coverage
pnpm run test:cov

# lint code
pnpm run lint:code

# check type
pnpm run lint:type

# lint code & type
pnpm run lint

# build site (if site build failed, you might need to run `git clean -fdx` first)
pnpm run build:site
```

## About Docs and Changelog Format

- Add period `.` to each description in English API tables (and each log of changelogs).
- Don't write changelogs in a released version.
- When rebase the branch, pay attention to whether it is placed in the released version.
- Add NEXT_VERSION to the version of the API table.

For Example:

```
English API table:
| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| example | `any` | `undefined` | Need period. | NEXT_VERSION |

English Changelog:
- Some changes, period needed.

Changelog position:

# CHANGELOG

## NEXT_VERSION

### Feats

your changelog

### Fixes
```
