---
description: "Commit Message Command — generate a Conventional Commit message based on changes"
---

# Generate Conventional Commit Message

Generate a commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) specification based on the current changes in the repository.

## Instructions

1.  **Analyze Changes**: Run `git diff --cached` (if staged) or `git diff` to understand the modifications.
2.  **Determine Scope**:
    *   If changes are inside `src/components/{ComponentName}/`, use `{ComponentName}` as the scope (e.g., `feat(Button): ...`).
    *   If changes affect global files like `src/lib/utils.ts` or `src/lib/index.ts`, use `core` or `lib` as the scope.
    *   If changes affect project configuration (`tsconfig.json`, `package.json`), use `config` or `build`.
3.  **Select Type**:
    *   `feat`: A new feature
    *   `fix`: A bug fix
    *   `docs`: Documentation only changes
    *   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    *   `refactor`: A code change that neither fixes a bug nor adds a feature
    *   `perf`: A code change that improves performance
    *   `test`: Adding missing tests or correcting existing tests
    *   `build`: Changes that affect the build system or external dependencies
    *   `ci`: Changes to our CI configuration files and scripts
    *   `chore`: Other changes that don't modify src or test files
    *   `revert`: Reverts a previous commit
4.  **Format Description**:
    *   Use the imperative, present tense: "change" not "changed" nor "changes".
    *   Don't capitalize the first letter.
    *   No dot (.) at the end.
5.  **Output**: Return only the commit message string.

## Example Output
`feat(Button): add primary variant and loading state`
