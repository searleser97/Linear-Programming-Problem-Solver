import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RESTResponse} from '../classes/rest-response';
import {RESTRequest} from '../classes/rest-request';
import {DialogService} from '../modules/material/services/dialog.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RESTService {

  public static OK = 200;
  public static FAIL = 500;
  public static DBFAIL = 501;

  constructor(private http: HttpClient, private dialogService: DialogService, private userService: UserService) {
  }

  public getUserToken(): string {
    if (this.userService.user) {
      return this.userService.getId();
    } else {
      return '';
    }
  }

  public buildRequest(payload: any): RESTRequest<any> {
    return new RESTRequest<any>(this.getUserToken(), payload);
  }

  // All kind of requests
  public request<T>(method: string, endpoint: string, payload?: any): Observable<RESTResponse<T>> {

    const body = this.buildRequest(payload);

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})
    };

    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get<RESTResponse<T>>(endpoint, httpOptions);
      case 'post':
        return this.http.post<RESTResponse<T>>(endpoint, body, httpOptions);
      case 'put':
        return this.http.put<RESTResponse<T>>(endpoint, body, httpOptions);
      case 'patch':
        return this.http.patch<RESTResponse<T>>(endpoint, body, httpOptions);
      case 'delete':
        return this.http.delete<RESTResponse<T>>(endpoint, httpOptions);
      default:
        return undefined;
    }
  }

  async get<T>(endpoint: string, actionAfter?: string, hideErrorAlert?: boolean): Promise<T> {
    try {
      const response = await this.request<T>('get', endpoint).toPromise();
      console.log('getAsync', endpoint, response);
      if (response.code === RESTService.OK) {
        return response.payload;
      }
      if (!hideErrorAlert) {
        this.dialogService.errorDialog('Error', response.message, 'Aceptar', actionAfter);
      }
      return null;
    } catch (e) {
      this.notAvailableServicesDialog();
      return null;
    }
  }

  async submit<T>(method: string, endpoint: string, payload: any, actionAfter?: string, hideAlert?: boolean): Promise<boolean> {
    console.log(payload);
    try {
      const response: RESTResponse<T> = await this.request<T>(method, endpoint, payload).toPromise();
      console.log(method + 'Async', endpoint, response);
      if (response.code === RESTService.OK) {
        if (!hideAlert) {
          this.dialogService.messageDialog('Mensaje:', response.message, 'Aceptar', actionAfter);
        }
        return true;
      }
      this.dialogService.errorDialog('Error', response.message, 'Aceptar');
      return false;
    } catch (e) {
      this.notAvailableServicesDialog();
      return false;
    }
  }

  async delete<T>(endpoint: string, confirmMsg: string, actionAfter?: string): Promise<boolean> {
    const result = await this.dialogService.simpleConfirmDialog('Mensaje', confirmMsg, 'Si', 'No', true)
      .afterClosed().toPromise();
    if (result === 'ok') {
      try {
        const response: RESTResponse<T> = await this.request<T>('delete', endpoint).toPromise();
        if (response.code === RESTService.OK) {
          return true;
        }
        this.dialogService.errorDialog('Error', response.message, 'Aceptar', actionAfter);
        return false;
      } catch (e) {
        this.notAvailableServicesDialog();
        return false;
      }
    }
  }

  notAvailableServicesDialog(failUrl?: string) {
    this.dialogService.errorDialog('Error', 'Servicios no disponibles.', 'Aceptar', failUrl);
  }

  notAvailableServiceMessage(failures: number, errorMsg, failUrl?: string) {
    if (failures === 1) {
      this.dialogService.errorDialog('Error', errorMsg, 'Aceptar', failUrl);
    }
  }
}
