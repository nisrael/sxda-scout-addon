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

    let pdf = this.widget('PdfField');

    let enableField = this.widget('EnableField');
    enableField.setValue(pdf.enabled);
    enableField.on('propertyChange:value', event => pdf.setEnabled(event.newValue));

    let showToolbarField = this.widget('ShowToolbarField');
    showToolbarField.setValue(pdf.showToolbar);
    showToolbarField.on('propertyChange:value', event => pdf.setShowToolbar(event.newValue));

    let enablePrintField = this.widget('EnablePrintField');
    enablePrintField.setValue(pdf.enablePrint);
    enablePrintField.on('propertyChange:value', event => pdf.setEnablePrint(event.newValue));

    let enableDownloadField = this.widget('EnableDownloadField');
    enableDownloadField.setValue(pdf.enableDownload);
    enableDownloadField.on('propertyChange:value', event => pdf.setEnableDownload(event.newValue));

    let pdfSourceField = this.widget('PdfSourceField');
    pdfSourceField.setValue(pdf.pdfSource);
    
    let loadPdfButton = this.widget('LoadPdfButton');
    loadPdfButton.on('click', event => pdf.setPdfSource(pdfSourceField.value));

    this.widget('EventsTab').setField(pdf);
  }
}
