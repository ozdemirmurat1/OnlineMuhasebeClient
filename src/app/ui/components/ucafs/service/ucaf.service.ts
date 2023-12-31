import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/directives/services/generic-http.service';
import { UcafModel } from '../models/ucaf.model';
import { CryptoService } from 'src/app/common/directives/services/crypto.service';
import { LoginResponseModel } from '../../auth/models/login-response.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { MessageResponseModel } from 'src/app/common/models/message-response.model';
import { mode } from 'crypto-ts';
import { LoginResponseService } from 'src/app/common/directives/services/login-response.service';
import { RemoveByIdModel } from 'src/app/common/models/remove-by-id.model';

@Injectable({
  providedIn: 'root'
})
export class UcafService {

  loginResponse:LoginResponseModel=new LoginResponseModel();

  constructor(
    private _htpp:GenericHttpService,
    private _loginResponse:LoginResponseService
  ) { 
    this.loginResponse=this._loginResponse.getLoginResponseModel();
  }

  // getAll(callBack:(res:UcafModel[])=>void){
  //   this._htpp.get<UcafModel[]>("UCAFs/GetAllUCAF",res=>callBack(res));
  // }

  getAll(callBack:(res:ResponseModel<UcafModel[]>)=>void){
    let model={companyId:this.loginResponse.company.companyId};
    this._htpp.post<ResponseModel<UcafModel[]>>("UCAFs/GetAllUCAF",model,res=>callBack(res))
  }

  add(model:UcafModel,callBack:(res:MessageResponseModel)=> void){
    model.companyId=this.loginResponse.company.companyId;
    this._htpp.post<MessageResponseModel>("UCAFs/CreateUCAF",model, (res)=>callBack(res));
  }

  update(model:UcafModel,callBack:(res:MessageResponseModel)=> void){
    model.companyId=this.loginResponse.company.companyId;
    this._htpp.post<MessageResponseModel>("UCAFs/UpdateUCAF",model, (res)=>callBack(res));
  }

  removeById(model:RemoveByIdModel,callBack:(res:MessageResponseModel)=> void){
      model.companyId=this.loginResponse.company.companyId;
      this._htpp.post<MessageResponseModel>("UCAFs/RemoveByIdUCAF",model, (res)=>callBack(res))
  }
}
