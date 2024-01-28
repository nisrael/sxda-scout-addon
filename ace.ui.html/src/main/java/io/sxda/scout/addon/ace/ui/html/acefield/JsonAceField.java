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
package io.sxda.scout.addon.ace.ui.html.acefield;

import io.sxda.scout.addon.ace.client.acefield.IAceField;
import org.eclipse.scout.rt.ui.html.IUiSession;
import org.eclipse.scout.rt.ui.html.json.IJsonAdapter;
import org.eclipse.scout.rt.ui.html.json.JsonEvent;
import org.eclipse.scout.rt.ui.html.json.JsonProperty;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonAdapterProperty;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonBasicField;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonValueField;
import org.json.JSONObject;

import static org.eclipse.scout.rt.client.ui.form.fields.IValueField.PROP_VALUE;

public class JsonAceField extends JsonValueField<IAceField> {
  public JsonAceField(IAceField model, IUiSession uiSession, String id, IJsonAdapter<?> parent) {
    super(model, uiSession, id, parent);
  }

  @Override
  public String getObjectType() {
    return IAceField.OBJECT_TYPE;
  }


  @Override
  protected void handleUiValueChange(JSONObject data) {
    super.handleUiValueChange(data);
  }

  @Override
  protected void handleUiPropertyChange(String propertyName, JSONObject data) {
    if (PROP_VALUE.equals(propertyName)){
      handleUiValueChange(data);
    }
  }

  @Override
  protected void setValueFromUI(Object value) {
    getModel().setValue((String) value);
  }

  @Override
  protected void initJsonProperties(IAceField model) {
    super.initJsonProperties(model);
    putJsonProperty(new JsonProperty<>(PROP_VALUE, model) {
      @Override
      protected Object modelValue() {
        return model.getValue();
      }
    });
    putJsonProperty(new JsonProperty<>(IAceField.PROP_THEME, model) {
      @Override
      protected Object modelValue() {
        return model.getTheme();
      }
    });
    putJsonProperty(new JsonProperty<>(IAceField.PROP_ACE_MODE, model) {
      @Override
      protected Object modelValue() {
        return model.getAceMode();
      }
    });
    putJsonProperty(new JsonProperty<>(IAceField.PROP_SHOW_PRINT_MARGIN, model) {
      @Override
      protected Object modelValue() {
        return getModel().getShowPrintMargin();
      }
    });

    putJsonProperty(new JsonProperty<>(IAceField.PROP_USE_SOFT_TABS, model) {
      @Override
      protected Object modelValue() {
        return getModel().getUseSoftTabs();
      }
    });

    putJsonProperty(new JsonProperty<>(IAceField.PROP_TAB_SIZE, model) {
      @Override
      protected Object modelValue() {
        return getModel().getTabSize();
      }
    });

    putJsonProperty(new JsonProperty<>(IAceField.PROP_HIGHLIGHT_ACTIVE_LINE, model) {
      @Override
      protected Object modelValue() {
        return getModel().getHighlightActiveLine();
      }
    });

    putJsonProperty(new JsonProperty<>(IAceField.PROP_USE_WRAP_MODE, model) {
      @Override
      protected Object modelValue() {
        return getModel().getUseWrapMode();
      }
    });
    putJsonProperty(new JsonProperty<>(IAceField.PROP_SELECT_ON_SET_VALUE, model) {
      @Override
      protected Object modelValue() {
        return getModel().getSelectOnSetValue();
      }
    });
  }
}
