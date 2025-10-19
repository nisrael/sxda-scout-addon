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
package io.sxda.scout.addon.monaco.ui.html.monacofield;

import io.sxda.scout.addon.monaco.client.monacofield.IMonacoField;
import org.eclipse.scout.rt.ui.html.IUiSession;
import org.eclipse.scout.rt.ui.html.json.IJsonAdapter;
import org.eclipse.scout.rt.ui.html.json.JsonProperty;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonBasicField;

import static org.eclipse.scout.rt.client.ui.form.fields.IValueField.PROP_VALUE;

public class JsonMonacoField extends JsonBasicField<IMonacoField> {
  public JsonMonacoField(IMonacoField model, IUiSession uiSession, String id, IJsonAdapter<?> parent) {
    super(model, uiSession, id, parent);
  }

  @Override
  public String getObjectType() {
    return IMonacoField.OBJECT_TYPE;
  }

  @Override
  protected void handleUiAcceptInputWhileTyping(String displayText) {
    getModel().getUIFacade().setDisplayTextFromUI(displayText);
  }

  @Override
  protected void handleUiAcceptInputAfterTyping(String displayText) {
    getModel().getUIFacade().parseAndSetValueFromUI(displayText);
  }

  @Override
  protected void setValueFromUI(Object value) {
    getModel().setValue((String) value);
  }

  @Override
  protected void initJsonProperties(IMonacoField model) {
    super.initJsonProperties(model);
    putJsonProperty(new JsonProperty<>(PROP_VALUE, model) {
      @Override
      protected Object modelValue() {
        return model.getValue();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_LANGUAGE, model) {
      @Override
      protected Object modelValue() {
        return model.getLanguage();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_THEME, model) {
      @Override
      protected Object modelValue() {
        return model.getTheme();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_LINE_NUMBERS, model) {
      @Override
      protected Object modelValue() {
        return model.getLineNumbers();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_MINIMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getMinimap();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_WORD_WRAP, model) {
      @Override
      protected Object modelValue() {
        return model.getWordWrap();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_FONT_SIZE, model) {
      @Override
      protected Object modelValue() {
        return model.getFontSize();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_TAB_SIZE, model) {
      @Override
      protected Object modelValue() {
        return model.getTabSize();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_INSERT_SPACES, model) {
      @Override
      protected Object modelValue() {
        return model.getInsertSpaces();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_AUTOMATIC_LAYOUT, model) {
      @Override
      protected Object modelValue() {
        return model.getAutomaticLayout();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_FOLDING, model) {
      @Override
      protected Object modelValue() {
        return model.getFolding();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_RENDER_WHITESPACE, model) {
      @Override
      protected Object modelValue() {
        return model.getRenderWhitespace();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_SCROLL_BEYOND_LAST_LINE, model) {
      @Override
      protected Object modelValue() {
        return model.getScrollBeyondLastLine();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_FORMAT_ON_PASTE, model) {
      @Override
      protected Object modelValue() {
        return model.getFormatOnPaste();
      }
    });
    putJsonProperty(new JsonProperty<>(IMonacoField.PROP_FORMAT_ON_TYPE, model) {
      @Override
      protected Object modelValue() {
        return model.getFormatOnType();
      }
    });
  }
}
