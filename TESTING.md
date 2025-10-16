# JavaScript/TypeScript Testing Guide

This document explains how to write and run tests for the sxda-scout-addon project.

## Test Framework

The project uses:
- **Jasmine**: BDD-style test framework (similar to JUnit)
- **Karma**: Test runner that executes tests in real browsers
- **Eclipse Scout Testing Utilities**: Helper functions for Scout-specific testing

## Running Tests

### Prerequisites

Tests run in Chrome/Chromium browser, so you need one of:
- Google Chrome installed
- Chromium installed
- Set `CHROME_BIN` environment variable to your Chrome executable

### Run All Tests

```bash
# From ace module
cd ace && npm run test:ci

# From codemirror module
cd codemirror && npm run test:ci

# From root (all modules)
pnpm test:all
```

### Development Mode (Watch)

```bash
cd ace
npm run testserver:start    # Start test server
# In another terminal:
npm run build:dev:watch      # Watch and rebuild
# Open http://localhost:9876 in browser
```

## Test File Structure

Tests are organized in the `test/` directory, mirroring the `src/` structure:

```
ace/
├── src/
│   ├── index.ts
│   └── ace/
│       ├── AceField.ts
│       ├── AceFieldAdapter.ts
│       └── modes/
│           ├── AceMode.ts
│           └── AceModeLookupCall.ts
└── test/
    ├── test-index.js              # Test entry point
    ├── ace/
    │   ├── AceFieldSpec.js        # Tests for AceField
    │   └── modes/
    │       └── AceModeLookupCallSpec.js  # Tests for lookup
    └── ...
```

## Test Naming Convention

- Test files end with `Spec.js` (e.g., `AceFieldSpec.js`)
- Test files are in the `test/` directory
- Mirror the source file structure

## Writing Tests

### Basic Test Structure

```javascript
import {AceField} from '../../src/index';
import {scout} from '@eclipse-scout/core';

describe('AceFieldSpec', () => {  // Test suite

  let session;

  beforeEach(() => {               // Setup before each test
    setFixtures(sandbox());
    session = sandboxSession();
  });

  it('creates field with defaults', () => {  // Individual test
    let field = new AceField();

    expect(field.theme).toBe('textmate');
    expect(field.tabSize).toBe(2);
  });
});
```

### Scout Session Setup

Most Scout components need a session. Use these helpers:

```javascript
let session;

beforeEach(() => {
  setFixtures(sandbox());         // Create DOM sandbox
  session = sandboxSession();     // Create test session
});
```

### Creating Scout Components

Use `scout.create()` for proper initialization:

```javascript
let field = scout.create(AceField, {
  parent: session.desktop,
  theme: 'monokai',
  tabSize: 4
});
```

### Rendering Components

Components must be rendered before DOM interactions:

```javascript
field.render();  // Creates DOM elements

// Now you can test DOM
expect(field.$container).toBeDefined();
expect(field.editor).toBeDefined();
```

### Common Jasmine Matchers

```javascript
// Equality
expect(value).toBe(42);                  // Strict equality (===)
expect(object).toEqual({a: 1});          // Deep equality
expect(value).not.toBe(null);            // Negation

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(10);
expect(value).toBeLessThan(100);
expect(value).toBeCloseTo(3.14, 2);      // For floats

// Strings
expect(str).toContain('substring');
expect(str).toMatch(/regex/);

// Arrays
expect(array).toContain(item);
expect(array.length).toBe(5);

// Functions
expect(fn).toThrow();
expect(fn).toThrowError('error message');
```

### Testing Async Code

Use `done` callback for asynchronous tests:

```javascript
it('executes async operation', (done) => {
  lookupCall.execute()
    .then(result => {
      expect(result).toBeDefined();
      done();              // Signal test completion
    })
    .catch(done.fail);     // Signal test failure
});
```

### Testing Property Changes

Scout uses property system. Test property changes:

```javascript
it('updates theme property', () => {
  field.setTheme('monokai');
  expect(field.theme).toBe('monokai');
});
```

### Testing Rendering Side Effects

After setting properties, check render methods were called:

```javascript
it('renders theme after property change', () => {
  field.render();
  field.setTheme('twilight');

  // The _renderTheme() method updates the ace editor
  expect(field.theme).toBe('twilight');
  // Ace editor theme would be updated (hard to test internals)
});
```

## Test Organization Patterns

### Group Related Tests

```javascript
describe('AceFieldSpec', () => {

  describe('initialization', () => {
    // All initialization tests
  });

  describe('property setters', () => {
    // All property setter tests
  });

  describe('rendering', () => {
    // All rendering tests
  });
});
```

### Use beforeEach for Common Setup

```javascript
describe('property setters', () => {
  let field;

  beforeEach(() => {
    field = scout.create(AceField, {
      parent: session.desktop
    });
  });

  it('setTheme updates theme', () => {
    field.setTheme('monokai');
    // ...
  });

  it('setTabSize updates tabSize', () => {
    field.setTabSize(4);
    // ...
  });
});
```

## What to Test

### ✅ DO Test

1. **Property initialization** - Default values
2. **Property setters** - State changes
3. **Rendering** - DOM creation, element presence
4. **Public methods** - Return values, state changes
5. **User interactions** - Clicks, focus, input
6. **Edge cases** - Null, undefined, empty, very long values
7. **Integration** - Component interactions

### ❌ DON'T Test

1. **Third-party library internals** - Trust ace-code works
2. **Private methods** (prefix with `_`) - Test through public API
3. **Framework internals** - Trust Scout framework
4. **Implementation details** - Test behavior, not how it's done

## Example: Full Test Coverage for a Method

For the `setTabSize(tabSize: number)` method:

```javascript
describe('tab size', () => {

  it('sets tab size property', () => {
    field.setTabSize(4);
    expect(field.tabSize).toBe(4);
  });

  it('applies tab size to editor', () => {
    field.render();
    field.setTabSize(8);
    expect(field.editor.session.getTabSize()).toBe(8);
  });

  it('handles edge case: very large tab size', () => {
    field.render();
    field.setTabSize(100);
    expect(field.editor.session.getTabSize()).toBe(100);
  });

  it('handles edge case: tab size of 1', () => {
    field.render();
    field.setTabSize(1);
    expect(field.editor.session.getTabSize()).toBe(1);
  });
});
```

## Comparing to Java/JUnit

| Java/JUnit | JavaScript/Jasmine |
|------------|-------------------|
| `@Test` | `it('test name', () => {})` |
| `@BeforeEach` | `beforeEach(() => {})` |
| `@AfterEach` | `afterEach(() => {})` |
| `@Nested class` | `describe('nested', () => {})` |
| `assertEquals(expected, actual)` | `expect(actual).toBe(expected)` |
| `assertTrue(condition)` | `expect(condition).toBe(true)` |
| `assertThrows(Exception.class, () -> {})` | `expect(fn).toThrow()` |
| `@Disabled` | `xit('test name', () => {})` or `xdescribe()` |

## Debugging Tests

### Run Single Test File

Modify `test-index.js`:

```javascript
// Instead of:
let context = require.context('./', true, /[sS]pec\.js$/);

// Use:
let context = require.context('./', true, /AceFieldSpec\.js$/);
```

### Skip Tests Temporarily

```javascript
xit('skipped test', () => {
  // This test won't run
});

xdescribe('skipped suite', () => {
  // None of these tests will run
});
```

### Focus on Specific Tests

```javascript
fit('only this test runs', () => {
  // Only focused tests run
});

fdescribe('only this suite runs', () => {
  // Only focused suites run
});
```

## Code Coverage

To generate code coverage reports:

```bash
# Add to package.json:
"test:coverage": "scout-scripts test:coverage"

# Run:
npm run test:coverage

# View report:
open coverage/index.html
```

## Common Issues

### "Cannot find Chrome binary"

**Solution**: Install Chrome or set `CHROME_BIN`:
```bash
export CHROME_BIN=/usr/bin/chromium-browser
# or
export CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

### "Timeout waiting for Webpack"

**Solution**: Increase timeout in `karma.conf.js`:
```javascript
browserNoActivityTimeout: 60000
```

### "Cannot read property of undefined"

**Cause**: Component not rendered before DOM access

**Solution**:
```javascript
field.render();  // Add this before accessing field.$container
```

### "Session is required"

**Cause**: Component needs session context

**Solution**:
```javascript
beforeEach(() => {
  session = sandboxSession();
});

let field = scout.create(AceField, {
  parent: session.desktop  // Add parent
});
```

## Test Examples in This Project

See these files for comprehensive examples:

- `ace/test/ace/AceFieldSpec.js` - Full component testing
- `ace/test/ace/modes/AceModeLookupCallSpec.js` - Lookup call testing

## Resources

- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [Eclipse Scout Testing Guide](https://eclipsescout.github.io/master/technical-guide/testing.html)
