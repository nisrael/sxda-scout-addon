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
import {BasicField, InitModelOf} from '@eclipse-scout/core';
import {PdfFieldModel} from "./PdfFieldModel";
import {PdfFieldEventMap} from "./PdfFieldEventMap";
import * as pdfjsLib from 'pdfjs-dist';

export class PdfField extends BasicField<string> implements PdfFieldModel {
  declare model: PdfFieldModel;
  declare eventMap: PdfFieldEventMap;
  declare self: PdfField;

  pdfSource: string;
  zoomLevel: string;
  pageNumber: number;
  totalPages: number;

  protected _pdfDocument: any;
  protected _currentScale: number;
  protected _$canvas: JQuery;
  protected _renderingTask: any;

  constructor() {
    super();
    this.pdfSource = null;
    this.zoomLevel = 'auto';
    this.pageNumber = 1;
    this.totalPages = 0;
    this._currentScale = 1.0;
    
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);
  }

  setPdfSource(pdfSource: string) {
    this.setProperty('pdfSource', pdfSource);
  }

  setZoomLevel(zoomLevel: string) {
    this.setProperty('zoomLevel', zoomLevel);
  }

  setPageNumber(pageNumber: number) {
    this.setProperty('pageNumber', pageNumber);
  }

  setTotalPages(totalPages: number) {
    this.setProperty('totalPages', totalPages);
  }

  override _render() {
    this.addContainer(this.$parent, 'pdf-field');
    this.addLabel();

    let $fieldContainer = this.$parent.appendDiv('pdf-field-container');
    this._$canvas = $fieldContainer.appendElement('<canvas>', 'pdf-canvas');
    this.addField(this._$canvas);

    this.addMandatoryIndicator();
    this.addStatus();

    if (this.pdfSource) {
      this._loadPdf();
    }
  }

  protected async _loadPdf() {
    if (!this.pdfSource) {
      return;
    }

    try {
      const loadingTask = pdfjsLib.getDocument(this.pdfSource);
      this._pdfDocument = await loadingTask.promise;
      this.setTotalPages(this._pdfDocument.numPages);
      await this._renderPage(this.pageNumber);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  protected async _renderPage(pageNum: number) {
    if (!this._pdfDocument || this._renderingTask) {
      return;
    }

    try {
      const page = await this._pdfDocument.getPage(pageNum);
      
      const canvas = this._$canvas[0] as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      
      let viewport;
      let scale = this._currentScale;
      
      if (this.zoomLevel === 'auto') {
        const defaultViewport = page.getViewport({scale: 1.0});
        const containerWidth = this._$canvas.parent().width();
        scale = (containerWidth - 20) / defaultViewport.width;
      }
      
      viewport = page.getViewport({scale: scale});

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      this._renderingTask = page.render(renderContext);
      await this._renderingTask.promise;
      this._renderingTask = null;
    } catch (error) {
      console.error('Error rendering page:', error);
      this._renderingTask = null;
    }
  }

  zoomIn() {
    this._currentScale *= 1.2;
    this.setZoomLevel('manual');
  }

  zoomOut() {
    this._currentScale /= 1.2;
    this.setZoomLevel('manual');
  }

  print() {
    if (this._pdfDocument) {
      window.print();
    }
  }

  download() {
    if (this.pdfSource) {
      const link = document.createElement('a');
      link.href = this.pdfSource;
      link.download = 'document.pdf';
      link.click();
    }
  }

  _renderPdfSource() {
    if (this._$canvas) {
      this._loadPdf();
    }
  }

  _renderPageNumber() {
    if (this._pdfDocument) {
      this._renderPage(this.pageNumber);
    }
  }

  _renderZoomLevel() {
    if (this._pdfDocument) {
      this._renderPage(this.pageNumber);
    }
  }

  protected override _renderProperties() {
    super._renderProperties();
    this._renderPdfSource();
    this._renderPageNumber();
    this._renderZoomLevel();
  }
}
