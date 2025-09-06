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
package io.sxda.scout.addon.codemirror.ui.html;

import org.eclipse.scout.rt.ui.html.IUiTextContributor;

import java.util.Arrays;
import java.util.Set;

public class CodeMirrorUiTextContributor implements IUiTextContributor {

  @Override
  public void contribute(Set<String> textKeys) {
    textKeys.addAll(Arrays.asList(
      "ui.nix"));
  }
}
