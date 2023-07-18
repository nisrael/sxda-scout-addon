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

package io.sxda.scout.addon.ace.ui.html.acefield;

import io.sxda.scout.addon.ace.client.acefield.IAceField;
import org.eclipse.scout.rt.ui.html.IUiSession;
import org.eclipse.scout.rt.ui.html.json.IJsonAdapter;
import org.eclipse.scout.rt.ui.html.json.JsonProperty;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonAdapterProperty;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonValueField;

public class JsonAceField extends JsonValueField<IAceField> {
  public JsonAceField(IAceField model, IUiSession uiSession, String id, IJsonAdapter<?> parent) {
    super(model, uiSession, id, parent);
  }

  @Override
  public String getObjectType() {
    return IAceField.OBJECT_TYPE;
  }

  @Override
  protected void initJsonProperties(IAceField model) {
    super.initJsonProperties(model);
    putJsonProperty(new JsonProperty<>(IAceField.PROP_THEME, model) {
      @Override
      protected String modelValue() {
        return getModel().getTheme();
      }
    });
  }
}
