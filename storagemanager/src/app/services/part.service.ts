import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {PartModel} from "../models/part-model";
import {Part} from "../../../backend/src/entity/Part";

@Injectable({
  providedIn: 'root'
})
export class PartService {
  getPartsUrl = `${this.config.api}parts`;
  getPartUrl = `${this.config.api}part/`;
  savePartUrl = `${this.config.api}save-part`;
  updatePartUrl = `${this.config.api}update-part`;
  deletePartUrl = `${this.config.api}delete-part/`;

  _parts;

  constructor(
    private config: ConfigService,
    private http: HttpClient) {
  }

  get parts() {
    return this._parts;
  }

  set parts(val) {
    this._parts = val;
  }


  getParts() {
    return this.http.get(this.getPartsUrl).pipe(map((resp: any) => {
      this.parts = resp;
      return resp;
    }));
  }

  getPart(partId) {
    return this.http.get(`${this.getPartUrl}${partId}`).pipe(map((resp: any) => {
      return resp;
    }));
  }

  savePart(part: PartModel): any {
    return this.http.post(this.savePartUrl, part).pipe(map((resp: any) => {
      return resp;
    }));
  }

  deletePart(id): any {
    return this.http.delete(this.deletePartUrl + id).pipe(map((resp: any) => {
      return resp;
    }));
  }

  updatePart(part: PartModel): any {
    return this.http.post(this.updatePartUrl, part).pipe(map((resp: any) => {
      return resp;
    }));
  }

  getPartById(id): any {
    return this.parts.find(x => x.id == id);
  }

}
