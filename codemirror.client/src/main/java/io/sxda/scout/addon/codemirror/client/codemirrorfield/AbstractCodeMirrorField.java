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

package io.sxda.scout.addon.codemirror.client.codemirrorfield;

import org.eclipse.scout.rt.client.ui.form.fields.AbstractBasicField;
import org.eclipse.scout.rt.client.ui.form.fields.AbstractFormField;
import org.eclipse.scout.rt.client.ui.form.fields.AbstractValueField;
import org.eclipse.scout.rt.client.ui.form.fields.IBasicFieldUIFacade;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClassId("7a467b1a-e29d-4fc8-802f-0c195b5db76b")
public abstract class AbstractCodeMirrorField extends AbstractValueField<String> implements ICodeMirrorField {
  private static final Logger LOG = LoggerFactory.getLogger(AbstractCodeMirrorField.class);

  public AbstractCodeMirrorField() {
    super(true);
  }

  @Override
  public void doAppLinkAction(String ref) {

  }
}
