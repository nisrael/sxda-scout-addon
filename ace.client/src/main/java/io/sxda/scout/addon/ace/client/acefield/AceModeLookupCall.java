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

import org.eclipse.scout.rt.shared.services.lookup.ILookupRow;
import org.eclipse.scout.rt.shared.services.lookup.LocalLookupCall;
import org.eclipse.scout.rt.shared.services.lookup.LookupRow;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class AceModeLookupCall extends LocalLookupCall<String> {
  private static final long serialVersionUID = 1L;

  @Override
  protected List<? extends ILookupRow<String>> execCreateLookupRows() {
    return Arrays.stream(AceMode.values()).map(mode -> new LookupRow<>(mode.getConfigTerm(), mode.getDisplayName())).collect(Collectors.toList());
  }
}
