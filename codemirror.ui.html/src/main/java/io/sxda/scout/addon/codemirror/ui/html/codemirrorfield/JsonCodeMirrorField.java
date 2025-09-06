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
package io.sxda.scout.addon.codemirror.ui.html.codemirrorfield;

import io.sxda.scout.addon.codemirror.client.codemirrorfield.ICodeMirrorField;
import org.eclipse.scout.rt.ui.html.IUiSession;
import org.eclipse.scout.rt.ui.html.json.IJsonAdapter;
import org.eclipse.scout.rt.ui.html.json.JsonProperty;
import org.eclipse.scout.rt.ui.html.json.form.fields.JsonBasicField;

import static org.eclipse.scout.rt.client.ui.form.fields.IValueField.PROP_VALUE;

public class JsonCodeMirrorField extends JsonBasicField<ICodeMirrorField> {
  public JsonCodeMirrorField(ICodeMirrorField model, IUiSession uiSession, String id, IJsonAdapter<?> parent) {
    super(model, uiSession, id, parent);
  }

  @Override
  public String getObjectType() {
    return ICodeMirrorField.OBJECT_TYPE;
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
  protected void initJsonProperties(ICodeMirrorField model) {
    super.initJsonProperties(model);
    putJsonProperty(new JsonProperty<>(PROP_VALUE, model) {
      @Override
      protected Object modelValue() {
        return model.getValue();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_THEME, model) {
      @Override
      protected Object modelValue() {
        return model.getTheme();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_LANGUAGE, model) {
      @Override
      protected Object modelValue() {
        return model.getLanguage();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_TAB_SIZE, model) {
      @Override
      protected Object modelValue() {
        return model.getTabSize();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_HIGHLIGHT_ACTIVE_LINE, model) {
      @Override
      protected Object modelValue() {
        return model.getHighlightActiveLine();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_SYNTAX_HIGHLIGHTING, model) {
      @Override
      protected Object modelValue() {
        return model.getSyntaxHighlighting();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_LINE_NUMBERS, model) {
      @Override
      protected Object modelValue() {
        return model.getLineNumbers();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_HIGHLIGHT_ACTIVE_LINE_GUTTER, model) {
      @Override
      protected Object modelValue() {
        return model.getHighlightActiveLineGutter();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_FOLD_GUTTER, model) {
      @Override
      protected Object modelValue() {
        return model.getFoldGutter();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_DROP_CURSOR, model) {
      @Override
      protected Object modelValue() {
        return model.getDropCursor();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_ALLOW_MULTIPLE_SELECTIONS, model) {
      @Override
      protected Object modelValue() {
        return model.getAllowMultipleSelections();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_INDENT_ON_INPUT, model) {
      @Override
      protected Object modelValue() {
        return model.getIndentOnInput();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_BRACKET_MATCHING, model) {
      @Override
      protected Object modelValue() {
        return model.getBracketMatching();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_CLOSE_BRACKETS, model) {
      @Override
      protected Object modelValue() {
        return model.getCloseBrackets();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_AUTO_COMPLETION, model) {
      @Override
      protected Object modelValue() {
        return model.getAutocompletion();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_RECTANGULAR_SELECTION, model) {
      @Override
      protected Object modelValue() {
        return model.getRectangularSelection();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_CROSSHAIR_CURSOR, model) {
      @Override
      protected Object modelValue() {
        return model.getCrosshairCursor();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_HIGHLIGHT_SELECTION_MATCHES, model) {
      @Override
      protected Object modelValue() {
        return model.getHighlightSelectionMatches();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_CLOSE_BRACKETS_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getCloseBracketsKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_SEARCH_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getSearchKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_FOLD_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getFoldKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_COMPLETION_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getCompletionKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_LINT_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getLintKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_HIGHLIGHT_SPECIAL_CHARS, model) {
      @Override
      protected Object modelValue() {
        return model.getHighlightSpecialChars();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_HISTORY, model) {
      @Override
      protected Object modelValue() {
        return model.getHistory();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_DRAW_SELECTION, model) {
      @Override
      protected Object modelValue() {
        return model.getDrawSelection();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_DEFAULT_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getDefaultKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_HISTORY_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getHistoryKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_INDENT_WITH_TAB_KEYMAP, model) {
      @Override
      protected Object modelValue() {
        return model.getIndentWithTabKeymap();
      }
    });
    putJsonProperty(new JsonProperty<>(ICodeMirrorField.PROP_LINE_WRAPPING, model) {
      @Override
      protected Object modelValue() {
        return model.getLineWrapping();
      }
    });


  }
}
