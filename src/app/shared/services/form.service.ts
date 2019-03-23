import {Injectable} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  var;

  constructor(private formBuilder: FormBuilder) {
  }

  getDefaultValue(property: any): any {
    switch (typeof property) {
      case 'string':
        return [''];
      case 'number':
        return [0];
      case 'boolean':
        return [false];
    }
    return [''];
  }

  newGroup(model: Object) {
    const group = {};
    for (const key of Object.keys(model)) {
      if (typeof model[key] === 'undefined') {
        // group[key] = this.newGroup(model[key]);
        group[key] = this.getDefaultValue(model[key]);
      } else {
        group[key] = model[key];
      }
    }
    return this.formBuilder.group(group);
  }

  getFilteredItems(formControl: FormControl, items: Object[]): Observable<any> {
    return formControl.valueChanges
      .pipe(
        startWith(''),
        map(input => {
            return items.filter(
              item => {
                for (const [key, value] of Object.entries(this.flattenObject(item))) {
                  if (typeof value === 'string' || typeof value === 'number') {
                    if (value.toString().toLowerCase().includes(input.toLowerCase())) {
                      return true;
                    }
                  }
                }
                return false;
              });
          }
        ));
  }

  flattenObject(ob) {
    const toReturn = {};

    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) { continue; }

      if ((typeof ob[i]) === 'object') {
        const flatObject = this.flattenObject(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) { continue; }

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }
}
