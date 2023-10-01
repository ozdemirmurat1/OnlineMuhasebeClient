import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/directives/services/generic-http.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { LogModel } from '../models/log.model';
import { LoginResponseService } from 'src/app/common/directives/services/login-response.service';
import { LogRequestModel } from '../models/log-request.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { UcafModel } from '../../ucafs/models/ucaf.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private _http:GenericHttpService,
    private _loginResponse: LoginResponseService
  ) { }

  getAllByTableName(model : LogRequestModel, callBack: (res: ResponseModel<PaginationResultModel<LogModel[]>>)=> void){
     
     model.companyId=this._loginResponse.getLoginResponseModel().company.companyId;

     this._http.post<ResponseModel<PaginationResultModel<LogModel[]>>>("Logs/GetLogsByTableName",model,res=>{
      callBack(res);
      console.log(res)
     })
  }
}
