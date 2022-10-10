import { Component, OnInit } from '@angular/core';
import { clone, filter, find, orderBy, replace, round } from 'lodash';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Customer, ProductCombination } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { SaleInvoice, SaleInvoiceDetails } from 'src/app/models/sale.models';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'brain-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent extends FormComponent implements OnInit {

  public initDate!: Date;
  public finishDate!: Date;
  public name:string = '';
  public nit: string = '';

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
  public listOfSaleInvoiceSearch!:Array<SaleInvoice>;
  



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
    promise[1].data.forEach((sale: SaleInvoice) => {
      sale.customer.fullName = `${sale.customer.name} ${sale.customer.lastName}`
    });
    this.listOfSaleInvoice = promise[1];
    this.listOfSaleInvoice.data.forEach((sale:SaleInvoice) => {
      sale.saleInvoiceDetails.forEach((detail: SaleInvoiceDetails) => {
        detail.productCombination = find(promise[0].data,{'id': detail.productCombinationId})
      });
    });
    this.listOfSaleInvoice.data = orderBy(this.listOfSaleInvoice.data, ['movementDate', 'ask']);
    this.listOfSaleInvoiceSearch = clone(this.listOfSaleInvoice.data);
  }

  total(saleDetails: SaleInvoice): number {
    let total = 0;
    saleDetails.saleInvoiceDetails.forEach((detail: SaleInvoiceDetails) => {
      total += detail.amount * detail.price
    });
    return total;
  }

  search() {
    this.listOfSaleInvoice.data = this.listOfSaleInvoiceSearch;
    if(this.initDate && this.finishDate) {
      const newInitDate = new Date(replace(this.initDate.toString(), '-', '/')) ;
      const newFinishDate = new Date(replace(this.finishDate.toString(), '-', '/')) ;
      const data = filter(this.listOfSaleInvoice.data, (sale: SaleInvoice)=> {
        if(new Date(sale.date) >= newInitDate && new Date(sale.date) <= newFinishDate) {
          return true;
        }
        return false;
      });
      this.listOfSaleInvoice.data = data;
    }

    if(this.name) {
      const data = filter(this.listOfSaleInvoice.data, (sale: SaleInvoice) => {
        return (sale.customer.fullName?.toLowerCase()?.includes(this.name.toLowerCase())) ? true : false;
      });
      this.listOfSaleInvoice.data = data;
    }

    if(this.nit) {
      const data = filter(this.listOfSaleInvoice.data, (sale: SaleInvoice) => {
        return (sale.customer.nit?.includes(this.nit)) ? true : false;
      });
      this.listOfSaleInvoice.data = data;
    }
    
  }

  pdf() {
    const row:Array<any> = [];
    row.push([{ text: 'Fecha', bold: true, alignment: 'center' }, { text: 'Autorización', bold: true, alignment: 'center' }, { text: 'Nombre', bold: true, alignment: 'center' }, { text: 'NIT', bold: true, alignment: 'center' }, { text: 'Total', bold: true, alignment: 'center' } ]);
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
          table: {
           widths: ['*', '*', '*', '*', '*'],
            body: row
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download('Reporte de ventas');
  }

}
