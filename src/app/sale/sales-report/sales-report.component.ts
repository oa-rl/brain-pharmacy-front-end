import { Component, OnInit } from '@angular/core';
import { find, round } from 'lodash';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { ProductCombination } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { SaleInvoice, SaleInvoiceDetails } from 'src/app/models/sale.models';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'brain-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent extends FormComponent implements OnInit {

  private _api: Api<SaleInvoice>;
  private _apiProductCombination: Api<ProductCombination>;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Reporte de ventas',
    }
  ];

  public listOfProductsCombination!: ListData<Array<ProductCombination>>;
  public listOfSaleInvoice!: ListData<Array<SaleInvoice>>;
  



  constructor(private _core: CoreService) {
    super();
    this._api = this._core.resource('SaleInvoice');
    this._apiProductCombination = this._core.resource('ProductCombination');
  }

  async ngOnInit() {
    await this.loadMaster();
  }

  async loadMaster() {
    const promise = await Promise.all([this._apiProductCombination.find().toPromise(), this._api.find().toPromise()]);
    console.log(promise);
    this.listOfSaleInvoice = promise[1];
    this.listOfSaleInvoice.data.forEach((sale:SaleInvoice) => {
      sale.saleInvoiceDetails.forEach((detail: SaleInvoiceDetails) => {
        detail.productCombination = find(promise[0].data,{'id': detail.productCombinationId})
      });
    });
    console.log(this.listOfSaleInvoice);
  }

  total(saleDetails: SaleInvoice): number {
    let total = 0;
    saleDetails.saleInvoiceDetails.forEach((detail: SaleInvoiceDetails) => {
      total += detail.amount * detail.price
    });
    return total;
  }

  pdf() {
    const row:Array<any> = [];
    row.push([{ text: 'Fecha', bold: true }, { text: 'Autorización', bold: true }, { text: 'Nombre', bold: true }, { text: 'NIT', bold: true }, { text: 'Total', bold: true } ]);
    this.listOfSaleInvoice.data.forEach((sale: SaleInvoice) => {
    row.push(
      [
        new Date(sale.date).toLocaleDateString(),
        sale.authorization,
        `${sale.customer.name} ${sale.customer.lastName}`,
        sale.customer.nit,
        `Q. ${round(this.total(sale),2)}`
      ]
    );
  });
    const docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 2,
           widths: ['*', '*', '*', '*', '*'],
            body: row
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download();
  }

}
