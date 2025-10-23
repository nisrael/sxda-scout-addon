# Agent Instructions

## Build & Test Commands
- **Full build**: `mvn clean package` (includes Maven + npm builds)
- **TypeScript build**: `cd {ace|codemirror} && npm run build:dev` (or `build:prod`, `build:all`)
- **Watch mode**: `cd {ace|codemirror} && npm run build:dev:watch`
- **Run all tests**: `mvn test` (Java) + `cd {ace|codemirror} && npm run test:ci` (TypeScript)
- **Run single JS test**: `cd {ace|codemirror} && npx karma start --single-run --grep="test name pattern"`
- **Run single Java test**: `mvn test -Dtest=ClassName#methodName`

## Code Style
- **Indentation**: 2 spaces (no tabs), enforced by `.editorconfig`
- **Line endings**: LF (Unix-style)
- **Linting**: Extends `@eclipse-scout` ESLint config (disable `linebreak-style` rule)
- **TypeScript**: Import from `@eclipse-scout/core`, use strict typing, declare model/eventMap/self in field classes
- **Java**: Extends `AbstractBasicField<String>`, use `propertySupport` for properties, `@ConfigProperty` annotations, protected `getConfiguredX()` methods for defaults
- **Naming**: TypeScript uses camelCase (e.g., `AceField`), Java uses PascalCase for classes, camelCase for methods
- **NO COMMENTS**: Do not add comments unless explicitly requested
- **Copyright headers**: Required on all files (EPL-2.0, BSI + Nils Israel)
- **Property pattern**: Java interface defines `PROP_X` constant + getters/setters, Abstract class implements with `propertySupport`, JSON adapter maps with `JsonProperty`, TypeScript has `_renderX()` method
- **Error handling**: Use Scout's built-in validation, trust framework and third-party editors (ACE/CodeMirror)
