# Monaco Editor Field for Eclipse Scout

This module provides a wrapper for the [Monaco Editor](https://microsoft.github.io/monaco-editor/) (the code editor that powers VS Code) as an Eclipse Scout form field.

## Features

- Full-featured code editor with syntax highlighting
- IntelliSense (autocomplete) support
- Multiple language support (JavaScript, TypeScript, JSON, HTML, CSS, Java, Python, and many more)
- Configurable themes (VS, VS Dark, High Contrast)
- Line numbers, minimap, code folding
- Word wrap, format on paste/type
- Find and replace functionality
- Multiple cursor support
- Diff editor capabilities

## Usage

See the main [README](../README.adoc) for detailed usage instructions.

## Configuration

The Monaco field supports the following properties:

- `language` - Programming language for syntax highlighting (default: "plaintext")
- `theme` - Editor theme (default: "vs")
- `lineNumbers` - Show line numbers (default: true)
- `minimap` - Show minimap overview (default: true)
- `wordWrap` - Enable word wrapping (default: false)
- `fontSize` - Font size in pixels (default: 14)
- `tabSize` - Number of spaces per tab (default: 4)
- `insertSpaces` - Insert spaces instead of tabs (default: true)
- `automaticLayout` - Automatically resize editor (default: true)
- `folding` - Enable code folding (default: true)
- `renderWhitespace` - How to render whitespace (default: "none")
- `scrollBeyondLastLine` - Allow scrolling beyond last line (default: false)
- `formatOnPaste` - Format code when pasting (default: false)
- `formatOnType` - Format code while typing (default: false)

## Example

```java
public class CodeEditorField extends AbstractMonacoField {
  @Override
  protected String getConfiguredLanguage() {
    return "json";
  }

  @Override
  protected String getConfiguredTheme() {
    return "vs-dark";
  }

  @Override
  protected int getConfiguredTabSize() {
    return 2;
  }

  @Override
  protected boolean getConfiguredFormatOnPaste() {
    return true;
  }
}
```

## Supported Languages

Monaco Editor supports syntax highlighting and IntelliSense for many languages including:

- JavaScript, TypeScript
- JSON, YAML, XML
- HTML, CSS, SCSS, LESS
- Java, C#, C++, Python, Go
- SQL, Shell scripts
- And many more...

## License

Eclipse Public License 2.0
