/*
 * Copyright (c) 2010-2025 BSI Business Systems Integration AG
 * Copyright (c) 2023-2025 Nils Israel
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

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for CodeMirrorLanguage enum
 * <p>
 * Focuses on verifying enum values are properly configured with
 * config terms and display names.
 */
public class CodeMirrorLanguageTest {

  @Test
  public void testEnumHasValues() {
    CodeMirrorLanguage[] languages = CodeMirrorLanguage.values();

    assertNotNull(languages, "Language enum should have values");
    assertTrue(languages.length > 0, "Should have at least one language");
  }

  @Test
  public void testNoneLanguageExists() {
    CodeMirrorLanguage none = CodeMirrorLanguage.NONE;

    assertNotNull(none, "NONE language should exist");
    assertEquals("None", none.getConfigTerm(), "NONE config term should be 'None'");
    assertEquals("None", none.getDisplayName(), "NONE display name should be 'None'");
  }

  @Test
  public void testCommonLanguagesExist() {
    // Verify common programming languages are defined
    assertNotNull(CodeMirrorLanguage.JAVA, "Java should be defined");
    assertNotNull(CodeMirrorLanguage.JAVASCRIPT, "JavaScript should be defined");
    assertNotNull(CodeMirrorLanguage.PYTHON, "Python should be defined");
    assertNotNull(CodeMirrorLanguage.TYPESCRIPT, "TypeScript should be defined");
    assertNotNull(CodeMirrorLanguage.JSON, "JSON should be defined");
  }

  @Test
  public void testConfigTermAndDisplayNameNotNull() {
    for (CodeMirrorLanguage language : CodeMirrorLanguage.values()) {
      assertNotNull(language.getConfigTerm(),
        "Config term should not be null for " + language.name());
      assertNotNull(language.getDisplayName(),
        "Display name should not be null for " + language.name());
    }
  }

  @Test
  public void testConfigTermAndDisplayNameNotEmpty() {
    for (CodeMirrorLanguage language : CodeMirrorLanguage.values()) {
      assertFalse(language.getConfigTerm().isEmpty(),
        "Config term should not be empty for " + language.name());
      assertFalse(language.getDisplayName().isEmpty(),
        "Display name should not be empty for " + language.name());
    }
  }

  @Test
  public void testConfigTermsAreUnique() {
    CodeMirrorLanguage[] languages = CodeMirrorLanguage.values();

    for (int i = 0; i < languages.length; i++) {
      for (int j = i + 1; j < languages.length; j++) {
        assertNotEquals(languages[i].getConfigTerm(), languages[j].getConfigTerm(),
          "Config terms should be unique: " + languages[i].name() + " vs " + languages[j].name());
      }
    }
  }

  @Test
  public void testJavaLanguageProperties() {
    CodeMirrorLanguage java = CodeMirrorLanguage.JAVA;

    assertEquals("Java", java.getConfigTerm(), "Java config term should be 'Java'");
    assertEquals("Java", java.getDisplayName(), "Java display name should be 'Java'");
  }

  @Test
  public void testJavaScriptLanguageProperties() {
    CodeMirrorLanguage js = CodeMirrorLanguage.JAVASCRIPT;

    assertEquals("JavaScript", js.getConfigTerm(),
      "JavaScript config term should be 'JavaScript'");
    assertEquals("JavaScript", js.getDisplayName(),
      "JavaScript display name should be 'JavaScript'");
  }

  @Test
  public void testSQLVariantsExist() {
    // Verify various SQL dialects are available
    assertNotNull(CodeMirrorLanguage.SQL, "SQL should exist");
    assertNotNull(CodeMirrorLanguage.MYSQL, "MySQL should exist");
    assertNotNull(CodeMirrorLanguage.POSTGRESQL, "PostgreSQL should exist");
    assertNotNull(CodeMirrorLanguage.MS_SQL, "MS SQL should exist");
  }

  @Test
  public void testWebLanguagesExist() {
    // Verify web development languages
    assertNotNull(CodeMirrorLanguage.HTML, "HTML should exist");
    assertNotNull(CodeMirrorLanguage.CSS, "CSS should exist");
    assertNotNull(CodeMirrorLanguage.JAVASCRIPT, "JavaScript should exist");
    assertNotNull(CodeMirrorLanguage.TYPESCRIPT, "TypeScript should exist");
  }

  @Test
  public void testMarkupLanguagesExist() {
    // Verify markup/config languages
    assertNotNull(CodeMirrorLanguage.MARKDOWN, "Markdown should exist");
    assertNotNull(CodeMirrorLanguage.XML, "XML should exist");
    assertNotNull(CodeMirrorLanguage.YAML, "YAML should exist");
    assertNotNull(CodeMirrorLanguage.JSON, "JSON should exist");
  }
}
