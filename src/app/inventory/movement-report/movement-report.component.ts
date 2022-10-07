import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { Api } from 'src/app/core/rest-api';
import { Product, ProductMovement } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { clone, filter, replace } from 'lodash';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'brain-movement-report',
  templateUrl: './movement-report.component.html',
  styleUrls: ['./movement-report.component.scss']
})
export class MovementReportComponent implements OnInit {

  public initDate!: Date;
  public finishDate!: Date;
  public movement:string = '';
  public product: string = '';

  private _api: Api<ProductMovement>;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Reporte de movimientos',
    }
  ];

  public listOfMovement!: ListData<Array<ProductMovement>>;
  public listOfMovementSearch!:Array<ProductMovement>;
  
  constructor(private _core: CoreService) {
    this._api = this._core.resource('ProductMovement');
  }

  async ngOnInit() {
    await this.loadMaster();
  }

  async loadMaster() {
    const promise = await Promise.all([this._api.find().toPromise()]);
    this.listOfMovement = promise[0];
    this.listOfMovement.data.forEach((movement: ProductMovement) => {
      movement.movementDate = new Date(new Date(movement.movementDate).toDateString())
    });
    this.listOfMovementSearch = clone(this.listOfMovement.data);
  }

  search() {
    this.listOfMovement.data = this.listOfMovementSearch;
    if(this.initDate && this.finishDate) {
      const newInitDate = new Date(replace(this.initDate.toString(), '-', '/')) ;
      const newFinishDate = new Date(replace(this.finishDate.toString(), '-', '/')) ;
      const data = filter(this.listOfMovement.data, (movement: ProductMovement)=> {
        if(new Date(movement.movementDate) >= newInitDate && new Date(movement.movementDate) <= newFinishDate) {
          return true;
        }
        return false;
      });
      this.listOfMovement.data = data;
    }

    if(this.movement) {
      const data = filter(this.listOfMovement.data, (movement: ProductMovement) => {
        return (movement.operationType.sign === this.movement) ? true : false;
      });
      this.listOfMovement.data = data;
    }

    if(this.product) {
      const data = filter(this.listOfMovement.data, (movement: ProductMovement) => {
        return (movement.productCombination.product?.name.toLowerCase()?.includes(this.product.toLowerCase())) ? true : false;
      });
      this.listOfMovement.data = data;
    }
    
  }

  pdf() {
    const row:Array<any> = [];
    row.push([{ text: 'Fecha', bold: true,  alignment: 'center'  },{ text: 'Movimiento', bold: true,  alignment: 'center'  }, { text: 'Motivo', bold: true }, { text: 'Producto', bold: true }, { text: 'Cantidad', bold: true,  alignment: 'center' } ]);
    this.listOfMovement.data.forEach((product: ProductMovement) => {
    row.push(
      [
        new Date(product.movementDate).toLocaleString().split(',')[0],
       { text: product.operationType.sign,  alignment: 'center'},
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
           widths: ['*', '*', '*', '*', '*'],
            body: row,
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download('Reporte de movimientos');
  }

}
