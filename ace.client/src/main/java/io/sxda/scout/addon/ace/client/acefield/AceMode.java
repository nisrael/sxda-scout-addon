/*
 *  Copyright (c) 2010-2024 BSI Business Systems Integration AG
 *  Copyright (c) 2023-2024 Nils Israel
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
package io.sxda.scout.addon.ace.client.acefield;

import java.util.Arrays;
import java.util.Optional;

public enum AceMode {
  ABAP("abap", "ABAP"),
  ABC("abc", "ABC"),
  ACTIONSCRIPT("actionscript", "ActionScript"),
  ADA("ada", "ADA"),
  APACHE_CONF("apache_conf", "Apache_Conf"),
  ASCIIDOC("asciidoc", "AsciiDoc"),
  ASSEMBLY_X86("assembly_x86", "Assembly_x86"),
  AUTOHOTKEY("autohotkey", "AutoHotKey"),
  BATCHFILE("batchfile", "BatchFile"),
  C9SEARCH("c9search", "C9Search"),
  C_CPP("c_cpp", "C_Cpp"),
  CIRRU("cirru", "Cirru"),
  CLOJURE("clojure", "Clojure"),
  COBOL("cobol", "Cobol"),
  COFFEE("coffee", "coffee"),
  COLDFUSION("coldfusion", "ColdFusion"),
  CSHARP("csharp", "CSharp"),
  CSS("css", "CSS"),
  CURLY("curly", "Curly"),
  D("d", "D"),
  DART("dart", "Dart"),
  DIFF("diff", "Diff"),
  DOCKERFILE("dockerfile", "Dockerfile"),
  DOT("dot", "Dot"),
  DUMMY("dummy", "Dummy"),
  DUMMYSYNTAX("dummysyntax", "DummySyntax"),
  EIFFEL("eiffel", "Eiffel"),
  EJS("ejs", "EJS"),
  ELIXIR("elixir", "Elixir"),
  ELM("elm", "Elm"),
  ERLANG("erlang", "Erlang"),
  FORTH("forth", "Forth"),
  FTL("ftl", "FTL"),
  GCODE("gcode", "Gcode"),
  GHERKIN("gherkin", "Gherkin"),
  GITIGNORE("gitignore", "Gitignore"),
  GLSL("glsl", "Glsl"),
  GOLANG("golang", "golang"),
  GROOVY("groovy", "Groovy"),
  HAML("haml", "HAML"),
  HANDLEBARS("handlebars", "Handlebars"),
  HASKELL("haskell", "Haskell"),
  HAXE("haxe", "haXe"),
  HTML("html", "HTML"),
  HTML_RUBY("html_ruby", "HTML_Ruby"),
  INI("ini", "INI"),
  IO("io", "Io"),
  JACK("jack", "Jack"),
  JADE("jade", "Jade"),
  JAVA("java", "Java"),
  JAVASCRIPT("javascript", "JavaScript"),
  JSON("json", "JSON"),
  JSONIQ("jsoniq", "JSONiq"),
  JSP("jsp", "JSP"),
  JSX("jsx", "JSX"),
  JULIA("julia", "Julia"),
  LATEX("latex", "LaTeX"),
  LESS("less", "LESS"),
  LIQUID("liquid", "Liquid"),
  LISP("lisp", "Lisp"),
  LIVESCRIPT("livescript", "LiveScript"),
  LOGIQL("logiql", "LogiQL"),
  LSL("lsl", "LSL"),
  LUA("lua", "Lua"),
  LUAPAGE("luapage", "LuaPage"),
  LUCENE("lucene", "Lucene"),
  MAKEFILE("makefile", "Makefile"),
  MARKDOWN("markdown", "Markdown"),
  MASK("mask", "Mask"),
  MATLAB("matlab", "MATLAB"),
  MEL("mel", "MEL"),
  MUSHCODE("mushcode", "MUSHCode"),
  MYSQL("mysql", "MySQL"),
  NIX("nix", "Nix"),
  OBJECTIVEC("objectivec", "ObjectiveC"),
  OCAML("ocaml", "OCaml"),
  PASCAL("pascal", "Pascal"),
  PERL("perl", "Perl"),
  PGSQL("pgsql", "pgSQL"),
  PHP("php", "PHP"),
  POWERSHELL("powershell", "Powershell"),
  PRAAT("praat", "Praat"),
  PROLOG("prolog", "Prolog"),
  PROPERTIES("properties", "Properties"),
  PROTOBUF("protobuf", "Protobuf"),
  PYTHON("python", "Python"),
  R("r", "R"),
  RDOC("rdoc", "RDoc"),
  RHTML("rhtml", "RHTML"),
  RUBY("ruby", "Ruby"),
  RUST("rust", "Rust"),
  SASS("sass", "SASS"),
  SCAD("scad", "SCAD"),
  SCALA("scala", "Scala"),
  SCHEME("scheme", "Scheme"),
  SCSS("scss", "SCSS"),
  SH("sh", "SH"),
  SJS("sjs", "SJS"),
  SMARTY("smarty", "Smarty"),
  SNIPPETS("snippets", "Snippets"),
  SOY_TEMPLATE("soy_template", "Soy Template"),
  SPACE("space", "Space"),
  SQL("sql", "SQL"),
  STYLUS("stylus", "Stylus"),
  SVG("svg", "SVG"),
  TCL("tcl", "Tcl"),
  TEX("tex", "Tex"),
  TEXT("text", "Text"),
  TEXTILE("textile", "Textile"),
  TOML("toml", "Toml"),
  TWIG("twig", "Twig"),
  TYPESCRIPT("typescript", "Typescript"),
  VALA("vala", "Vala"),
  VBSCRIPT("vbscript", "VBScript"),
  VELOCITY("velocity", "Velocity"),
  VERILOG("verilog", "Verilog"),
  VHDL("vhdl", "VHDL"),
  XML("xml", "XML"),
  XQUERY("xquery", "XQuery"),
  YAML("yaml", "YAML");

  private final String configTerm;
  private final String displayName;

  public String getConfigTerm() {
    return configTerm;
  }

  public String getDisplayName() {
    return displayName;
  }

  AceMode(String configTerm, String displayName) {
    this.configTerm = configTerm;
    this.displayName = displayName;
  }

  private static Optional<AceMode> fromConfigTerm(String value) {
    return Arrays.stream(AceMode.values()).filter(aceTheme -> aceTheme.configTerm.equals(value)).findFirst();
  }


}


