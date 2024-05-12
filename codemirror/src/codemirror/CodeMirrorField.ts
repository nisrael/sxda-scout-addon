/*
* Copyright (c) 2010-2024 BSI Business Systems Integration AG
* Copyright (c) 2023-2024 Nils Israel
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
import {BasicField} from "@eclipse-scout/core";
import {CodeMirrorFieldModel} from "./CodeMirrorFieldModel";
import {CodeMirrorFieldEventMap} from "./CodeMirrorFieldEventMap";
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';

export class CodeMirrorField extends BasicField<string> implements CodeMirrorFieldModel {
  declare model: CodeMirrorFieldModel;
  declare eventMap: CodeMirrorFieldEventMap;
  declare self: CodeMirrorField;

  editorView: EditorView;
  editorState: EditorState;

  override _render() {
    // Create the container
    this.addContainer(this.$parent, 'codemirror-field');

    // Add a label
    this.addLabel();

    let $field = this.$parent.appendDiv('codemirror');
    this.addField($field);

    this.editorState = EditorState.create({
      doc: this.displayText,
      extensions: [
        basicSetup({
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
        }),
      ],
    });

    this.editorView = new EditorView({
      parent: $field.get()[0],
      state: this.editorState,
    });

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }

  protected override _renderEnabled() {
    super._renderEnabled();
    this.editorState.update({effects: []});
  }

  protected override _renderProperties() {
    super._renderProperties();
  }
}
