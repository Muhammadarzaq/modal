import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandaService } from 'src/app/core/services/landa.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.component.html',
  styleUrls: ['./produk.component.scss']
  
})
export class ProdukComponent implements OnInit {
  dtOptions: any;
  closeResult: string;
  showForm: boolean;
  pageTitle: string;
  constructor(private LandaService: LandaService, private router: Router, private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    
    this.getData();
    this.empty();
  }

  empty() {
    this.getData();
  }
  getData() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pagingType: 'full_numbers',
      ajax: (dataTablesParameters: any, callback) => {
        const params = {
          // filter: JSON.stringify(this.modelParam),
          offset: dataTablesParameters.start,
          limit: dataTablesParameters.length,
        };
        this.LandaService.DataGet('/produk', params).subscribe((res: any) => {
          // console.log(res);
          // return;
          this.listData = res.data.list;
          callback({
            recordsTotal: res.data.totalItems,
            recordsFiltered: res.data.totalItems,
            data: [],
          });
        });
      },
    };
  }
  
  index() {
    this.showForm = !this.showForm;
    this.pageTitle = 'Data Master Barang';
    this.getData();
  }
delete(val){}
edit(val){}
listData: any;
  
modal(val){}

}
