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

package io.sxda.scout.addon.monaco.client.monacofield;

import org.eclipse.scout.rt.client.ui.form.fields.AbstractValueField;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClassId("a35fe425-089f-4954-bdcd-cbea26e202bb")
public abstract class AbstractMonacoField extends AbstractValueField<String> implements IMonacoField {
  private static final Logger LOG = LoggerFactory.getLogger(AbstractMonacoField.class);

  public AbstractMonacoField() {
    super(true);
  }

}
