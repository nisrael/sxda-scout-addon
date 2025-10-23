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
package io.sxda.scout.addon.pdf.ui.html.pdffield;

import io.sxda.scout.addon.pdf.client.pdffield.IPdfField;
import org.eclipse.scout.rt.ui.html.IUiSession;
import org.eclipse.scout.rt.ui.html.json.IJsonAdapter;
import org.eclipse.scout.rt.ui.html.json.JsonProperty;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonBasicField;

import static org.eclipse.scout.rt.client.ui.form.fields.IValueField.PROP_VALUE;

public class JsonPdfField extends JsonBasicField<IPdfField> {
  public JsonPdfField(IPdfField model, IUiSession uiSession, String id, IJsonAdapter<?> parent) {
    super(model, uiSession, id, parent);
  }

  @Override
  public String getObjectType() {
    return IPdfField.OBJECT_TYPE;
  }

  @Override
  protected void setValueFromUI(Object value) {
    getModel().setValue((String) value);
  }

  @Override
  protected void initJsonProperties(IPdfField model) {
    super.initJsonProperties(model);
    putJsonProperty(new JsonProperty<>(PROP_VALUE, model) {
      @Override
      protected Object modelValue() {
        return model.getValue();
      }
    });
    putJsonProperty(new JsonProperty<>(IPdfField.PROP_PDF_SOURCE, model) {
      @Override
      protected Object modelValue() {
        return model.getPdfSource();
      }
    });
    putJsonProperty(new JsonProperty<>(IPdfField.PROP_ZOOM_LEVEL, model) {
      @Override
      protected Object modelValue() {
        return model.getZoomLevel();
      }
    });
    putJsonProperty(new JsonProperty<>(IPdfField.PROP_PAGE_NUMBER, model) {
      @Override
      protected Object modelValue() {
        return model.getPageNumber();
      }
    });
    putJsonProperty(new JsonProperty<>(IPdfField.PROP_SHOW_TOOLBAR, model) {
      @Override
      protected Object modelValue() {
        return getModel().getShowToolbar();
      }
    });
    putJsonProperty(new JsonProperty<>(IPdfField.PROP_SHOW_SIDEBAR, model) {
      @Override
      protected Object modelValue() {
        return getModel().getShowSidebar();
      }
    });
    putJsonProperty(new JsonProperty<>(IPdfField.PROP_ENABLE_PRINT, model) {
      @Override
      protected Object modelValue() {
        return getModel().getEnablePrint();
      }
    });
    putJsonProperty(new JsonProperty<>(IPdfField.PROP_ENABLE_DOWNLOAD, model) {
      @Override
      protected Object modelValue() {
        return getModel().getEnableDownload();
      }
    });
  }
}
