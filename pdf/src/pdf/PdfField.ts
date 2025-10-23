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
  showToolbar: boolean;
  showSidebar: boolean;
  enablePrint: boolean;
  enableDownload: boolean;

  protected _pdfDocument: any;
  protected _currentScale: number;
  protected _$canvas: JQuery;
  protected _$toolbar: JQuery;
  protected _$pageDisplay: JQuery;
  protected _renderingTask: any;

  constructor() {
    super();
    this.pdfSource = null;
    this.zoomLevel = 'auto';
    this.pageNumber = 1;
    this.showToolbar = true;
    this.showSidebar = false;
    this.enablePrint = true;
    this.enableDownload = true;
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

  setShowToolbar(showToolbar: boolean) {
    this.setProperty('showToolbar', showToolbar);
  }

  setShowSidebar(showSidebar: boolean) {
    this.setProperty('showSidebar', showSidebar);
  }

  setEnablePrint(enablePrint: boolean) {
    this.setProperty('enablePrint', enablePrint);
  }

  setEnableDownload(enableDownload: boolean) {
    this.setProperty('enableDownload', enableDownload);
  }

  override _render() {
    this.addContainer(this.$parent, 'pdf-field');
    this.addLabel();

    let $fieldContainer = this.$parent.appendDiv('pdf-field-container');
    
    if (this.showToolbar) {
      this._$toolbar = $fieldContainer.appendDiv('pdf-toolbar');
      this._renderToolbar();
    }

    this._$canvas = $fieldContainer.appendElement('<canvas>', 'pdf-canvas');
    this.addField(this._$canvas);

    this.addMandatoryIndicator();
    this.addStatus();

    if (this.pdfSource) {
      this._loadPdf();
    }
  }

  protected _renderToolbar() {
    let $prevBtn = this._$toolbar.appendDiv('pdf-btn').text('◀');
    $prevBtn.on('click', () => this._previousPage());

    this._$pageDisplay = this._$toolbar.appendDiv('pdf-page-display');
    
    let $nextBtn = this._$toolbar.appendDiv('pdf-btn').text('▶');
    $nextBtn.on('click', () => this._nextPage());

    let $zoomOutBtn = this._$toolbar.appendDiv('pdf-btn').text('−');
    $zoomOutBtn.on('click', () => this._zoomOut());

    let $zoomInBtn = this._$toolbar.appendDiv('pdf-btn').text('+');
    $zoomInBtn.on('click', () => this._zoomIn());

    if (this.enablePrint) {
      let $printBtn = this._$toolbar.appendDiv('pdf-btn').text('🖨');
      $printBtn.on('click', () => this._print());
    }

    if (this.enableDownload) {
      let $downloadBtn = this._$toolbar.appendDiv('pdf-btn').text('⬇');
      $downloadBtn.on('click', () => this._download());
    }
  }

  protected async _loadPdf() {
    if (!this.pdfSource) {
      return;
    }

    try {
      const loadingTask = pdfjsLib.getDocument(this.pdfSource);
      this._pdfDocument = await loadingTask.promise;
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
      
      let viewport = page.getViewport({scale: this._currentScale});
      
      if (this.zoomLevel === 'auto') {
        const containerWidth = this._$canvas.parent().width();
        this._currentScale = containerWidth / viewport.width;
        viewport = page.getViewport({scale: this._currentScale});
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      this._renderingTask = page.render(renderContext);
      await this._renderingTask.promise;
      this._renderingTask = null;

      if (this._$pageDisplay) {
        this._$pageDisplay.text(`${pageNum} / ${this._pdfDocument.numPages}`);
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      this._renderingTask = null;
    }
  }

  protected _previousPage() {
    if (this.pageNumber <= 1) {
      return;
    }
    this.setPageNumber(this.pageNumber - 1);
  }

  protected _nextPage() {
    if (!this._pdfDocument || this.pageNumber >= this._pdfDocument.numPages) {
      return;
    }
    this.setPageNumber(this.pageNumber + 1);
  }

  protected _zoomIn() {
    this._currentScale *= 1.2;
    this._renderPage(this.pageNumber);
  }

  protected _zoomOut() {
    this._currentScale /= 1.2;
    this._renderPage(this.pageNumber);
  }

  protected _print() {
    if (this._pdfDocument) {
      window.print();
    }
  }

  protected _download() {
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
    if (this.zoomLevel === 'auto') {
      this._currentScale = 1.0;
    }
    if (this._pdfDocument) {
      this._renderPage(this.pageNumber);
    }
  }

  _renderShowToolbar() {
    if (this.rendered) {
      this._remove();
      this._render();
    }
  }

  protected override _renderProperties() {
    super._renderProperties();
    this._renderPdfSource();
    this._renderPageNumber();
    this._renderZoomLevel();
    this._renderShowToolbar();
  }
}
