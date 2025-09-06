/*
 * Copyright (c) 2010-2024 BSI Business Systems Integration AG
 * Copyright (c) 2023-2024 Nils Israel
 *
 * This program is an extension of the original work from the Eclipse Scout Project,
 * available at https://www.eclipse.org/scout/.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package io.sxda.scout.addon.codemirror.client.codemirrorfield;

import java.util.Arrays;
import java.util.Optional;

public enum CodeMirrorLanguage {
  NONE("None", "None"),
  CPP("C++", "C++"),
  CQL("CQL", "CQL"),
  CSS("CSS", "CSS"),
  GO("Go", "Go"),
  HTML("HTML", "HTML"),
  JAVA("Java", "Java"),
  JAVASCRIPT("JavaScript", "JavaScript"),
  JSON("JSON", "JSON"),
  JSX("JSX", "JSX"),
  LESS("LESS", "LESS"),
  LIQUID("Liquid", "Liquid"),
  MARIADB_SQL("MariaDB SQL", "MariaDB SQL"),
  MARKDOWN("Markdown", "Markdown"),
  MS_SQL("MS SQL", "MS SQL"),
  MYSQL("MySQL", "MySQL"),
  PHP("PHP", "PHP"),
  PLSQL("PLSQL", "PLSQL"),
  POSTGRESQL("PostgreSQL", "PostgreSQL"),
  PYTHON("Python", "Python"),
  RUST("Rust", "Rust"),
  SASS("Sass", "Sass"),
  SCSS("SCSS", "SCSS"),
  SQL("SQL", "SQL"),
  SQLITE("SQLite", "SQLite"),
  TSX("TSX", "TSX"),
  TYPESCRIPT("TypeScript", "TypeScript"),
  WEBASSEMBLY("WebAssembly", "WebAssembly"),
  XML("XML", "XML"),
  YAML("YAML", "YAML"),
  APL("APL", "APL"),
  PGP("PGP", "PGP"),
  ASN_1("ASN.1", "ASN.1"),
  ASTERISK("Asterisk", "Asterisk"),
  BRAINFUCK("Brainfuck", "Brainfuck"),
  COBOL("Cobol", "Cobol"),
  CSHARP("C#", "C#"),
  CLOJURE("Clojure", "Clojure"),
  CLOJURESCRIPT("ClojureScript", "ClojureScript"),
  CLOSURE_STYLESHEETS_GSS("Closure_Stylesheets (GSS)", "Closure_Stylesheets (GSS)"),
  CMAKE("CMake", "CMake"),
  COFFEESCRIPT("CoffeeScript", "CoffeeScript"),
  COMMON_LISP("Common Lisp", "Common Lisp"),
  CYPHER("Cypher", "Cypher"),
  CYTHON("Cython", "Cython"),
  CRYSTAL("Crystal", "Crystal"),
  DART("Dart", "Dart"),
  DIFF("diff", "diff"),
  DOCKERFILE("Dockerfile", "Dockerfile"),
  DTD("DTD", "DTD"),
  DYLAN("Dylan", "Dylan"),
  EBNF("EBNF", "EBNF"),
  ECL("ECL", "ECL"),
  EDN("edn", "edn"),
  EIFFEL("Eiffel", "Eiffel"),
  ELM("Elm", "Elm"),
  ERLANG("Erlang", "Erlang"),
  ESPER("Esper", "Esper"),
  FACTOR("Factor", "Factor"),
  FCL("FCL", "FCL"),
  FORTH("Forth", "Forth"),
  FORTRAN("Fortran", "Fortran"),
  FSHARP("F#", "F#"),
  GAS("Gas", "Gas"),
  GHERKIN("Gherkin", "Gherkin"),
  GROOVY("Groovy", "Groovy"),
  HASKELL("Haskell", "Haskell"),
  HAXE("Haxe", "Haxe"),
  HXML("HXML", "HXML"),
  HTTP("HTTP", "HTTP"),
  IDL("IDL", "IDL"),
  JSON_LD("JSON-LD", "JSON-LD"),
  JINJA2("Jinja2", "Jinja2"),
  JULIA("Julia", "Julia"),
  KOTLIN("Kotlin", "Kotlin"),
  LIVESCRIPT("LiveScript", "LiveScript"),
  LUA("Lua", "Lua"),
  MIRC("mIRC", "mIRC"),
  MATHEMATICA("Mathematica", "Mathematica"),
  MODELICA("Modelica", "Modelica"),
  MUMPS("MUMPS", "MUMPS"),
  MBOX("Mbox", "Mbox"),
  NGINX("Nginx", "Nginx"),
  NSIS("NSIS", "NSIS"),
  NTRIPLES("NTriples", "NTriples"),
  OBJECTIVE_C("Objective-C", "Objective-C"),
  OBJECTIVE_CPP("Objective-C++", "Objective-C++"),
  OCAML("OCaml", "OCaml"),
  OCTAVE("Octave", "Octave"),
  OZ("Oz", "Oz"),
  PASCAL("Pascal", "Pascal"),
  PERL("Perl", "Perl"),
  PIG("Pig", "Pig"),
  POWERSHELL("PowerShell", "PowerShell"),
  PROPERTIES_FILES("Properties files", "Properties files"),
  PROTOBUF("ProtoBuf", "ProtoBuf"),
  PUG("Pug", "Pug"),
  PUPPET("Puppet", "Puppet"),
  RPM_CHANGES("RPM Changes", "RPM Changes"),
  RPM_SPEC("RPM Spec", "RPM Spec"),
  RUBY("Ruby", "Ruby"),
  SAS("SAS", "SAS"),
  SCALA("Scala", "Scala"),
  SCHEME("Scheme", "Scheme"),
  SHELL("Shell", "Shell"),
  SIEVE("Sieve", "Sieve"),
  SMALLTALK("Smalltalk", "Smalltalk"),
  SOLR("Solr", "Solr"),
  SML("SML", "SML"),
  SPARQL("SPARQL", "SPARQL"),
  SPREADSHEET("Spreadsheet", "Spreadsheet"),
  SQUIRREL("Squirrel", "Squirrel"),
  STYLUS("Stylus", "Stylus"),
  SWIFT("Swift", "Swift"),
  STEX("sTeX", "sTeX"),
  LATEX("LaTeX", "LaTeX"),
  SYSTEMVERILOG("SystemVerilog", "SystemVerilog"),
  TCL("Tcl", "Tcl"),
  TEXTILE("Textile", "Textile"),
  TIDDLYWIKI("TiddlyWiki", "TiddlyWiki"),
  TIKI_WIKI("Tiki wiki", "Tiki wiki"),
  TOML("TOML", "TOML"),
  TROFF("Troff", "Troff"),
  TTCN("TTCN", "TTCN"),
  TTCN_CFG("TTCN_CFG", "TTCN_CFG"),
  TURTLE("Turtle", "Turtle"),
  WEB_IDL("Web IDL", "Web IDL"),
  VB_NET("VB.NET", "VB.NET"),
  VBSCRIPT("VBScript", "VBScript"),
  VELOCITY("Velocity", "Velocity"),
  VERILOG("Verilog", "Verilog"),
  VHDL("VHDL", "VHDL"),
  XQUERY("XQuery", "XQuery"),
  YACAS("Yacas", "Yacas"),
  Z80("Z80", "Z80"),
  MSCGEN("MscGen", "MscGen"),
  XU("Xù", "Xù"),
  MSGENNY("MsGenny", "MsGenny"),
  VUE("Vue", "Vue"),
  ANGULAR_TEMPLATE("Angular Template", "Angular Template");

  private final String configTerm;
  private final String displayName;

  public String getConfigTerm() {
    return configTerm;
  }

  public String getDisplayName() {
    return displayName;
  }

  CodeMirrorLanguage(String configTerm, String displayName) {
    this.configTerm = configTerm;
    this.displayName = displayName;
  }

  private static Optional<CodeMirrorLanguage> fromConfigTerm(String value) {
    return Arrays.stream(CodeMirrorLanguage.values()).filter(codeMirrorLanguage -> codeMirrorLanguage.configTerm.equals(value)).findFirst();
  }
}


