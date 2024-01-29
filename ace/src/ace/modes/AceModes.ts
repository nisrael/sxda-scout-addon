/*
 *  Copyright (c) 2010-20240129-202419 BSI Business Systems Integration AG
 *  Copyright (c) 2023-20240129-202419 Nils Israel
 *
 * This program is an extension of the original work from the Eclipse Scout Project,
 * available at https://www.eclipse.org/scout/.
 *
 *  This program and the accompanying materials are made
 *  available under the terms of the Eclipse Public License 2.0
 *  which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 *  SPDX-License-Identifier: EPL-2.0
 */
import {AceMode} from "./AceMode";

export class AceModes {
  private static instance: AceModes;
  private _register: Map<string, AceMode> = new Map();

  private constructor() {
    this.registerModes();
  }

  public static getInstance(): AceModes {
    if (!AceModes.instance) {
      AceModes.instance = new AceModes();
    }
    return AceModes.instance;
  }

  register(mode: AceMode) {
    this._register.set(mode.id, mode);
  }

  get(id: string): AceMode {
    return this._register.get(id);
  }

  all(): AceMode[] {
    return Array.from(this._register.values());
  }

  registerModes() {
    this.register(new AceMode('abap', 'ABAP', 'ace/mode/abap'));
    this.register(new AceMode('abc', 'ABC', 'ace/mode/abc'));
    this.register(new AceMode('actionscript', 'ActionScript', 'ace/mode/actionscript'));
    this.register(new AceMode('ada', 'ADA', 'ace/mode/ada'));
    this.register(new AceMode('apache_conf', 'Apache_Conf', 'ace/mode/apache_conf'));
    this.register(new AceMode('asciidoc', 'AsciiDoc', 'ace/mode/asciidoc'));
    this.register(new AceMode('assembly_x86', 'Assembly_x86', 'ace/mode/assembly_x86'));
    this.register(new AceMode('autohotkey', 'AutoHotKey', 'ace/mode/autohotkey'));
    this.register(new AceMode('batchfile', 'BatchFile', 'ace/mode/batchfile'));
    this.register(new AceMode('c9search', 'C9Search', 'ace/mode/c9search'));
    this.register(new AceMode('c_cpp', 'C_Cpp', 'ace/mode/c_cpp'));
    this.register(new AceMode('cirru', 'Cirru', 'ace/mode/cirru'));
    this.register(new AceMode('clojure', 'Clojure', 'ace/mode/clojure'));
    this.register(new AceMode('cobol', 'Cobol', 'ace/mode/cobol'));
    this.register(new AceMode('coffee', 'coffee', 'ace/mode/coffee'));
    this.register(new AceMode('coldfusion', 'ColdFusion', 'ace/mode/coldfusion'));
    this.register(new AceMode('csharp', 'CSharp', 'ace/mode/csharp'));
    this.register(new AceMode('css', 'CSS', 'ace/mode/css'));
    this.register(new AceMode('curly', 'Curly', 'ace/mode/curly'));
    this.register(new AceMode('d', 'D', 'ace/mode/d'));
    this.register(new AceMode('dart', 'Dart', 'ace/mode/dart'));
    this.register(new AceMode('diff', 'Diff', 'ace/mode/diff'));
    this.register(new AceMode('dockerfile', 'Dockerfile', 'ace/mode/dockerfile'));
    this.register(new AceMode('dot', 'Dot', 'ace/mode/dot'));
    this.register(new AceMode('dummy', 'Dummy', 'ace/mode/dummy'));
    this.register(new AceMode('dummysyntax', 'DummySyntax', 'ace/mode/dummysyntax'));
    this.register(new AceMode('eiffel', 'Eiffel', 'ace/mode/eiffel'));
    this.register(new AceMode('ejs', 'EJS', 'ace/mode/ejs'));
    this.register(new AceMode('elixir', 'Elixir', 'ace/mode/elixir'));
    this.register(new AceMode('elm', 'Elm', 'ace/mode/elm'));
    this.register(new AceMode('erlang', 'Erlang', 'ace/mode/erlang'));
    this.register(new AceMode('forth', 'Forth', 'ace/mode/forth'));
    this.register(new AceMode('ftl', 'FTL', 'ace/mode/ftl'));
    this.register(new AceMode('gcode', 'Gcode', 'ace/mode/gcode'));
    this.register(new AceMode('gherkin', 'Gherkin', 'ace/mode/gherkin'));
    this.register(new AceMode('gitignore', 'Gitignore', 'ace/mode/gitignore'));
    this.register(new AceMode('glsl', 'Glsl', 'ace/mode/glsl'));
    this.register(new AceMode('golang', 'golang', 'ace/mode/golang'));
    this.register(new AceMode('groovy', 'Groovy', 'ace/mode/groovy'));
    this.register(new AceMode('haml', 'HAML', 'ace/mode/haml'));
    this.register(new AceMode('handlebars', 'Handlebars', 'ace/mode/handlebars'));
    this.register(new AceMode('haskell', 'Haskell', 'ace/mode/haskell'));
    this.register(new AceMode('haxe', 'haXe', 'ace/mode/haxe'));
    this.register(new AceMode('html', 'HTML', 'ace/mode/html'));
    this.register(new AceMode('html_ruby', 'HTML_Ruby', 'ace/mode/html_ruby'));
    this.register(new AceMode('ini', 'INI', 'ace/mode/ini'));
    this.register(new AceMode('io', 'Io', 'ace/mode/io'));
    this.register(new AceMode('jack', 'Jack', 'ace/mode/jack'));
    this.register(new AceMode('jade', 'Jade', 'ace/mode/jade'));
    this.register(new AceMode('java', 'Java', 'ace/mode/java'));
    this.register(new AceMode('javascript', 'JavaScript', 'ace/mode/javascript'));
    this.register(new AceMode('json', 'JSON', 'ace/mode/json'));
    this.register(new AceMode('jsoniq', 'JSONiq', 'ace/mode/jsoniq'));
    this.register(new AceMode('jsp', 'JSP', 'ace/mode/jsp'));
    this.register(new AceMode('jsx', 'JSX', 'ace/mode/jsx'));
    this.register(new AceMode('julia', 'Julia', 'ace/mode/julia'));
    this.register(new AceMode('latex', 'LaTeX', 'ace/mode/latex'));
    this.register(new AceMode('less', 'LESS', 'ace/mode/less'));
    this.register(new AceMode('liquid', 'Liquid', 'ace/mode/liquid'));
    this.register(new AceMode('lisp', 'Lisp', 'ace/mode/lisp'));
    this.register(new AceMode('livescript', 'LiveScript', 'ace/mode/livescript'));
    this.register(new AceMode('logiql', 'LogiQL', 'ace/mode/logiql'));
    this.register(new AceMode('lsl', 'LSL', 'ace/mode/lsl'));
    this.register(new AceMode('lua', 'Lua', 'ace/mode/lua'));
    this.register(new AceMode('luapage', 'LuaPage', 'ace/mode/luapage'));
    this.register(new AceMode('lucene', 'Lucene', 'ace/mode/lucene'));
    this.register(new AceMode('makefile', 'Makefile', 'ace/mode/makefile'));
    this.register(new AceMode('markdown', 'Markdown', 'ace/mode/markdown'));
    this.register(new AceMode('mask', 'Mask', 'ace/mode/mask'));
    this.register(new AceMode('matlab', 'MATLAB', 'ace/mode/matlab'));
    this.register(new AceMode('mel', 'MEL', 'ace/mode/mel'));
    this.register(new AceMode('mushcode', 'MUSHCode', 'ace/mode/mushcode'));
    this.register(new AceMode('mysql', 'MySQL', 'ace/mode/mysql'));
    this.register(new AceMode('nix', 'Nix', 'ace/mode/nix'));
    this.register(new AceMode('objectivec', 'ObjectiveC', 'ace/mode/objectivec'));
    this.register(new AceMode('ocaml', 'OCaml', 'ace/mode/ocaml'));
    this.register(new AceMode('pascal', 'Pascal', 'ace/mode/pascal'));
    this.register(new AceMode('perl', 'Perl', 'ace/mode/perl'));
    this.register(new AceMode('pgsql', 'pgSQL', 'ace/mode/pgsql'));
    this.register(new AceMode('php', 'PHP', 'ace/mode/php'));
    this.register(new AceMode('powershell', 'Powershell', 'ace/mode/powershell'));
    this.register(new AceMode('praat', 'Praat', 'ace/mode/praat'));
    this.register(new AceMode('prolog', 'Prolog', 'ace/mode/prolog'));
    this.register(new AceMode('properties', 'Properties', 'ace/mode/properties'));
    this.register(new AceMode('protobuf', 'Protobuf', 'ace/mode/protobuf'));
    this.register(new AceMode('python', 'Python', 'ace/mode/python'));
    this.register(new AceMode('r', 'R', 'ace/mode/r'));
    this.register(new AceMode('rdoc', 'RDoc', 'ace/mode/rdoc'));
    this.register(new AceMode('rhtml', 'RHTML', 'ace/mode/rhtml'));
    this.register(new AceMode('ruby', 'Ruby', 'ace/mode/ruby'));
    this.register(new AceMode('rust', 'Rust', 'ace/mode/rust'));
    this.register(new AceMode('sass', 'SASS', 'ace/mode/sass'));
    this.register(new AceMode('scad', 'SCAD', 'ace/mode/scad'));
    this.register(new AceMode('scala', 'Scala', 'ace/mode/scala'));
    this.register(new AceMode('scheme', 'Scheme', 'ace/mode/scheme'));
    this.register(new AceMode('scss', 'SCSS', 'ace/mode/scss'));
    this.register(new AceMode('sh', 'SH', 'ace/mode/sh'));
    this.register(new AceMode('sjs', 'SJS', 'ace/mode/sjs'));
    this.register(new AceMode('smarty', 'Smarty', 'ace/mode/smarty'));
    this.register(new AceMode('snippets', 'Snippets', 'ace/mode/snippets'));
    this.register(new AceMode('soy_template', 'Soy Template', 'ace/mode/soy_template'));
    this.register(new AceMode('space', 'Space', 'ace/mode/space'));
    this.register(new AceMode('sql', 'SQL', 'ace/mode/sql'));
    this.register(new AceMode('stylus', 'Stylus', 'ace/mode/stylus'));
    this.register(new AceMode('svg', 'SVG', 'ace/mode/svg'));
    this.register(new AceMode('tcl', 'Tcl', 'ace/mode/tcl'));
    this.register(new AceMode('tex', 'Tex', 'ace/mode/tex'));
    this.register(new AceMode('text', 'Text', 'ace/mode/text'));
    this.register(new AceMode('textile', 'Textile', 'ace/mode/textile'));
    this.register(new AceMode('toml', 'Toml', 'ace/mode/toml'));
    this.register(new AceMode('twig', 'Twig', 'ace/mode/twig'));
    this.register(new AceMode('typescript', 'Typescript', 'ace/mode/typescript'));
    this.register(new AceMode('vala', 'Vala', 'ace/mode/vala'));
    this.register(new AceMode('vbscript', 'VBScript', 'ace/mode/vbscript'));
    this.register(new AceMode('velocity', 'Velocity', 'ace/mode/velocity'));
    this.register(new AceMode('verilog', 'Verilog', 'ace/mode/verilog'));
    this.register(new AceMode('vhdl', 'VHDL', 'ace/mode/vhdl'));
    this.register(new AceMode('xml', 'XML', 'ace/mode/xml'));
    this.register(new AceMode('xquery', 'XQuery', 'ace/mode/xquery'));
    this.register(new AceMode('yaml', 'YAML', 'ace/mode/yaml'));
  }
}
