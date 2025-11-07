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
import {GroupBox, InitModelOf, Menu} from '@eclipse-scout/core';
import {PdfGroupBoxModel} from './PdfGroupBoxModel';
import {PdfField} from './PdfField';

export class PdfGroupBox extends GroupBox implements PdfGroupBoxModel {
  declare model: PdfGroupBoxModel;
  declare self: PdfGroupBox;

  pdfSource: string;
  zoomLevel: string;
  pageNumber: number;
  enablePrint: boolean;
  enableDownload: boolean;

  pdfField: PdfField;
  prevMenu: Menu;
  nextMenu: Menu;
  pageMenu: Menu;
  zoomOutMenu: Menu;
  zoomInMenu: Menu;
  printMenu: Menu;
  downloadMenu: Menu;

  constructor() {
    super();
    this.pdfSource = null;
    this.zoomLevel = 'auto';
    this.pageNumber = 1;
    this.enablePrint = true;
    this.enableDownload = true;
  }

  protected override _init(model: InitModelOf<this>) {
    if (!model.fields) {
      model.fields = this._createFields();
    }
    if (!model.menus) {
      model.menus = this._createMenus();
    }

    super._init(model);

    this.pdfField = this.widget('PdfField') as unknown as PdfField;
    
    this.prevMenu = this.menus.find(m => m.id === 'PrevMenu') as Menu;
    this.nextMenu = this.menus.find(m => m.id === 'NextMenu') as Menu;
    this.pageMenu = this.menus.find(m => m.id === 'PageMenu') as Menu;
    this.zoomOutMenu = this.menus.find(m => m.id === 'ZoomOutMenu') as Menu;
    this.zoomInMenu = this.menus.find(m => m.id === 'ZoomInMenu') as Menu;
    
    if (this.enablePrint) {
      this.printMenu = this.menus.find(m => m.id === 'PrintMenu') as Menu;
    }
    if (this.enableDownload) {
      this.downloadMenu = this.menus.find(m => m.id === 'DownloadMenu') as Menu;
    }

    this.prevMenu.on('action', () => this._previousPage());
    this.nextMenu.on('action', () => this._nextPage());
    this.zoomOutMenu.on('action', () => this._zoomOut());
    this.zoomInMenu.on('action', () => this._zoomIn());

    if (this.printMenu) {
      this.printMenu.on('action', () => this._print());
    }
    if (this.downloadMenu) {
      this.downloadMenu.on('action', () => this._download());
    }

    this.pdfField.on('propertyChange:pageNumber', event => {
      this.setPageNumber(event.newValue);
    });

    this.pdfField.on('propertyChange:totalPages', event => {
      this._updatePageLabel();
    });

    if (this.pdfSource) {
      this.pdfField.setPdfSource(this.pdfSource);
    }
    if (this.zoomLevel) {
      this.pdfField.setZoomLevel(this.zoomLevel);
    }
    if (this.pageNumber) {
      this.pdfField.setPageNumber(this.pageNumber);
    }
  }

  protected _createMenus(): any[] {
    const menus = [
      {
        id: 'PrevMenu',
        objectType: Menu,
        text: '◀',
        tooltipText: 'Previous Page'
      },
      {
        id: 'PageMenu',
        objectType: Menu,
        text: '1 / 0',
        enabled: false
      },
      {
        id: 'NextMenu',
        objectType: Menu,
        text: '▶',
        tooltipText: 'Next Page'
      },
      {
        id: 'ZoomOutMenu',
        objectType: Menu,
        text: '−',
        tooltipText: 'Zoom Out'
      },
      {
        id: 'ZoomInMenu',
        objectType: Menu,
        text: '+',
        tooltipText: 'Zoom In'
      }
    ];

    if (this.enablePrint) {
      menus.push({
        id: 'PrintMenu',
        objectType: Menu,
        text: '🖨',
        tooltipText: 'Print'
      });
    }

    if (this.enableDownload) {
      menus.push({
        id: 'DownloadMenu',
        objectType: Menu,
        text: '⬇',
        tooltipText: 'Download'
      });
    }

    return menus;
  }

  protected _createFields(): any[] {
    return [
      {
        id: 'PdfField',
        objectType: PdfField,
        labelVisible: false,
        statusVisible: false,
        gridDataHints: {
          weightY: 1,
          heightInPixel: 600,
          fillVertical: true
        }
      }
    ];
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

  setEnablePrint(enablePrint: boolean) {
    this.setProperty('enablePrint', enablePrint);
  }

  setEnableDownload(enableDownload: boolean) {
    this.setProperty('enableDownload', enableDownload);
  }

  protected _renderPdfSource() {
    if (this.pdfField) {
      this.pdfField.setPdfSource(this.pdfSource);
    }
  }

  protected _renderZoomLevel() {
    if (this.pdfField) {
      this.pdfField.setZoomLevel(this.zoomLevel);
    }
  }

  protected _renderPageNumber() {
    if (this.pdfField) {
      this.pdfField.setPageNumber(this.pageNumber);
      this._updatePageLabel();
    }
  }

  protected _renderEnablePrint() {
    if (this.printMenu) {
      this.printMenu.setVisible(this.enablePrint);
    }
  }

  protected _renderEnableDownload() {
    if (this.downloadMenu) {
      this.downloadMenu.setVisible(this.enableDownload);
    }
  }

  protected _updatePageLabel() {
    if (this.pageMenu && this.pdfField) {
      const totalPages = this.pdfField.totalPages || 0;
      this.pageMenu.setText(`${this.pageNumber} / ${totalPages}`);
    }
  }

  protected _previousPage() {
    if (this.pageNumber <= 1) {
      return;
    }
    this.setPageNumber(this.pageNumber - 1);
  }

  protected _nextPage() {
    if (!this.pdfField || this.pageNumber >= this.pdfField.totalPages) {
      return;
    }
    this.setPageNumber(this.pageNumber + 1);
  }

  protected _zoomIn() {
    if (this.pdfField) {
      this.pdfField.zoomIn();
    }
  }

  protected _zoomOut() {
    if (this.pdfField) {
      this.pdfField.zoomOut();
    }
  }

  protected _print() {
    if (this.pdfField) {
      this.pdfField.print();
    }
  }

  protected _download() {
    if (this.pdfField) {
      this.pdfField.download();
    }
  }
}
