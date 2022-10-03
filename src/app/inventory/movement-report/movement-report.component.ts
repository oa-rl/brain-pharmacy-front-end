import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { Api } from 'src/app/core/rest-api';
import { ProductMovement } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'brain-movement-report',
  templateUrl: './movement-report.component.html',
  styleUrls: ['./movement-report.component.scss']
})
export class MovementReportComponent implements OnInit {

  private _api: Api<ProductMovement>;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Reporte de movimientos',
    }
  ];

  public listOfMovement!: ListData<Array<ProductMovement>>;
  
  constructor(private _core: CoreService) {
    this._api = this._core.resource('ProductMovement');
  }

  async ngOnInit() {
    await this.loadMaster();
  }

  async loadMaster() {
    const promise = await Promise.all([this._api.find().toPromise()]);
    this.listOfMovement = promise[0];

  }

  pdf() {
    const row:Array<any> = [];
    row.push([{ text: 'Movimiento', bold: true,  alignment: 'center'  }, { text: 'Motivo', bold: true }, { text: 'Producto', bold: true }, { text: 'Cantidad', bold: true,  alignment: 'center' } ]);
    this.listOfMovement.data.forEach((product: ProductMovement) => {
    row.push(
      [
       { text: product.operationType.sign,  alignment: 'center', border: [true, true, true, true] },
        product.operationType.description,
        `${product.productCombination.product?.name} ${product.productCombination.amountSize} ${product.productCombination.size?.name} ${product.productCombination.medicalHouse?.name}`,
        {text: product.quantity,  alignment: 'center'}
      ]
    );
  });
    const docDefinition = {
      content: [
        {text: 'Reporte de movimientos'},
        {
          table: {
            headerRows: 1,
           widths: ['*', '*', '*', '*'],
            body: row,
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download();
  }

}
