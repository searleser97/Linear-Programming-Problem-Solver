import {InputData} from '../components/input-data/InputData';

export interface Method {
  execute(data: InputData): void;
}
