

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

import {BasicField, FormField, InitModelOf, StringField, ValueField, ValueFieldAdapter} from '@eclipse-scout/core';
import {CodeMirrorFieldModel} from '../index';
import {EditorView, basicSetup} from "codemirror"
import {ViewPlugin} from '@codemirror/view';
import {Transaction} from '@codemirror/state';
import {javascript, json} from '@codemirror/lang-json'


export class CodeMirrorField extends ValueField<string> implements CodeMirrorFieldModel{
  editor: EditorView;

  protected override _init(model: InitModelOf<this>) {
    super._init(model);
    this.editor = new EditorView({
      doc: 'console.log("Hello world")',
      extensions: [
        basicSetup,
        json()
      ],
      dispatch: tr => this._dispatchCodemirrorTransaction(tr)
    });
  }

  _dispatchCodemirrorTransaction(tr: Transaction){

    let isRemote = tr.annotation(Transaction.remote);
    if (!isRemote && tr.docChanged) {
      console.log(tr.state.doc.toString());
      this.setProperty('value', tr.state.doc.toString());
      this.setValue(tr.state.doc.toString());
    }
  }

  override _renderDisplayText() {
    super._renderDisplayText();
    let newDisplayText = this.displayText;
    let transaction = this.editor.state.update({changes: {from: 0, to: this.editor.state.doc.length, insert: newDisplayText}})
    this.editor.dispatch(transaction)
  }

  override _readDisplayText(): string {
    if (this.editor!=null && this.editor.state.doc!=null) {
      return this.editor.state.doc.toString();
    }
    return "";
  }

  override _render() {
    // Create the container
    this.addContainer(this.$parent, 'code-mirror-field');

    // Add a label
    this.addLabel();

    let $field = this.$parent.appendDiv('codemirror');
    this.addField($field);

    $field.append(this.editor.dom);

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }
}
