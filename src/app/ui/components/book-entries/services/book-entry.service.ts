import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/directives/services/generic-http.service';
import { LoginResponseService } from 'src/app/common/directives/services/login-response.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { RequestModel } from 'src/app/common/models/request.model';
import { BookEntryModel } from '../models/book-entry.model';
import { MessageResponseModel } from 'src/app/common/models/message-response.model';
import { CreateBookEntryModel } from '../models/create-book-entry.model';
import { RemoveByIdModel } from 'src/app/common/models/remove-by-id.model';

@Injectable({
  providedIn: 'root'
})
export class BookEntryService {

  constructor(
    private _http:GenericHttpService,
    private _loginResponse:LoginResponseService
  ) { }

  getAll(model:RequestModel,callBack:(res:PaginationResultModel<BookEntryModel[]>)=> void){
      model.companyId=this._loginResponse.getLoginResponseModel().company.companyId;
      model.year=this._loginResponse.getLoginResponseModel().year;
      this._http.post<PaginationResultModel<BookEntryModel[]>>("BookEntries/GetAllBookEntryQuery",model,res=>{
        callBack(res);
      })
  }
  
  create(model:CreateBookEntryModel,callBack:(res:MessageResponseModel)=>void){
    model.companyId=this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<MessageResponseModel>("BookEntries/CreateBookEntry",model,res=>{
      callBack(res);
    })
  }

  update(model:BookEntryModel,callBack:(res:MessageResponseModel)=>void){
    model.companyId=this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<MessageResponseModel>("BookEntries/Update",model,res=>{
      callBack(res);
    })
  }

  removeById(model:RemoveByIdModel,callBack:(res:MessageResponseModel)=>void){
    model.companyId=this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<MessageResponseModel>("BookEntries/RemoveById",model,res=>{
      callBack(res);
    })
  }
}
