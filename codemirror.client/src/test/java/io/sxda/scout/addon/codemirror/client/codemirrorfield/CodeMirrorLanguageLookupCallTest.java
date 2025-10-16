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

import org.eclipse.scout.rt.shared.services.lookup.ILookupRow;
import org.eclipse.scout.rt.testing.platform.runner.PlatformTestRunner;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for CodeMirrorLanguageLookupCall
 * <p>
 * Focuses on verifying the lookup call provides correct language options
 * and follows Scout's lookup call contract.
 */
@RunWith(PlatformTestRunner.class)
public class CodeMirrorLanguageLookupCallTest {

  @Test
  public void testLookupRowsAreCreated() {
    CodeMirrorLanguageLookupCall lookupCall = new CodeMirrorLanguageLookupCall();

    List<? extends ILookupRow<String>> rows = lookupCall.execCreateLookupRows();

    assertNotNull(rows, "Lookup rows should not be null");
    assertFalse(rows.isEmpty(), "Lookup rows should not be empty");
  }

  @Test
  public void testAllLanguagesHaveKeyAndText() {
    CodeMirrorLanguageLookupCall lookupCall = new CodeMirrorLanguageLookupCall();

    List<? extends ILookupRow<String>> rows = lookupCall.execCreateLookupRows();

    for (ILookupRow<String> row : rows) {
      assertNotNull(row.getKey(), "Each lookup row should have a key");
      assertNotNull(row.getText(), "Each lookup row should have text");
      assertFalse(row.getKey().isEmpty(), "Key should not be empty");
      assertFalse(row.getText().isEmpty(), "Text should not be empty");
    }
  }

  @Test
  public void testIncludesCommonLanguages() {
    CodeMirrorLanguageLookupCall lookupCall = new CodeMirrorLanguageLookupCall();

    List<? extends ILookupRow<String>> rows = lookupCall.execCreateLookupRows();
    List<String> keys = rows.stream().map(ILookupRow::getKey).toList();

    // Verify common programming languages are included
    assertTrue(keys.contains("Java"), "Should include Java");
    assertTrue(keys.contains("JavaScript"), "Should include JavaScript");
    assertTrue(keys.contains("Python"), "Should include Python");
    assertTrue(keys.contains("None"), "Should include None option");
  }

  @Test
  public void testNumberOfLanguages() {
    CodeMirrorLanguageLookupCall lookupCall = new CodeMirrorLanguageLookupCall();

    List<? extends ILookupRow<String>> rows = lookupCall.execCreateLookupRows();

    // Should have all enum values
    int expectedCount = CodeMirrorLanguage.values().length;
    assertEquals(expectedCount, rows.size(),
      "Number of lookup rows should match number of languages");
  }

  @Test
  public void testKeyAndTextAreFromEnum() {
    CodeMirrorLanguageLookupCall lookupCall = new CodeMirrorLanguageLookupCall();

    List<? extends ILookupRow<String>> rows = lookupCall.execCreateLookupRows();

    for (ILookupRow<String> row : rows) {
      // Find matching enum value
      boolean foundMatch = false;
      for (CodeMirrorLanguage lang : CodeMirrorLanguage.values()) {
        if (lang.getConfigTerm().equals(row.getKey()) &&
            lang.getDisplayName().equals(row.getText())) {
          foundMatch = true;
          break;
        }
      }
      assertTrue(foundMatch,
        "Lookup row key/text should match an enum value: " + row.getKey());
    }
  }

  @Test
  public void testNoDuplicateKeys() {
    CodeMirrorLanguageLookupCall lookupCall = new CodeMirrorLanguageLookupCall();

    List<? extends ILookupRow<String>> rows = lookupCall.execCreateLookupRows();
    List<String> keys = rows.stream().map(ILookupRow::getKey).toList();

    long uniqueCount = keys.stream().distinct().count();
    assertEquals(keys.size(), uniqueCount, "All lookup keys should be unique");
  }
}
