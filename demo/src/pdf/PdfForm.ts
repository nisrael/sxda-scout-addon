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
import {Form, FormModel, InitModelOf, models} from '@eclipse-scout/core';
import PdfFormModel from './PdfFormModel';
import {PdfFormWidgetMap} from '../index';

export class PdfForm extends Form {
  declare widgetMap: PdfFormWidgetMap;

  constructor() {
    super();
  }

  protected override _jsonModel(): FormModel {
    return models.get(PdfFormModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let pdfGroupBox = this.widget('PdfGroupBox');

    let enableField = this.widget('EnableField');
    enableField.setValue(pdfGroupBox.enabled);
    enableField.on('propertyChange:value', event => pdfGroupBox.setEnabled(event.newValue));

    let showToolbarField = this.widget('ShowToolbarField');
    showToolbarField.setValue(pdfGroupBox.menuBarVisible);
    showToolbarField.on('propertyChange:value', event => pdfGroupBox.setMenuBarVisible(event.newValue));

    let enablePrintField = this.widget('EnablePrintField');
    enablePrintField.setValue(pdfGroupBox.enablePrint);
    enablePrintField.on('propertyChange:value', event => pdfGroupBox.setEnablePrint(event.newValue));

    let enableDownloadField = this.widget('EnableDownloadField');
    enableDownloadField.setValue(pdfGroupBox.enableDownload);
    enableDownloadField.on('propertyChange:value', event => pdfGroupBox.setEnableDownload(event.newValue));

    let pdfSourceField = this.widget('PdfSourceField');
    pdfSourceField.setValue(pdfGroupBox.pdfSource);
    
    let loadPdfButton = this.widget('LoadPdfButton');
    loadPdfButton.on('click', event => pdfGroupBox.setPdfSource(pdfSourceField.value));

    this.widget('EventsTab').setField(pdfGroupBox.pdfField);
  }
}
