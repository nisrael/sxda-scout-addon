/*
 * Copyright (c) 2023 BSI Business Systems Integration AG
 * Copyright (c) 2023 Nils Israel
 *
 * This program is based on work from the Eclipse Scout Project
 * https://www.eclipse.org/scout/ and provides an extension for it.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

package io.sxda.scout.addon.codemirror.client.extension.codemirrorfield;

import io.sxda.scout.addon.codemirror.client.codemirrorfield.AbstractCodeMirrorField;
import org.eclipse.scout.rt.client.extension.ui.form.fields.AbstractFormFieldExtension;

public abstract class AbstractCodeMirrorFieldExtension<OWNER extends AbstractCodeMirrorField> extends AbstractFormFieldExtension<OWNER> implements ICodeMirrorFieldExtension<OWNER> {

  public AbstractCodeMirrorFieldExtension(OWNER owner) {
    super(owner);
  }
}
