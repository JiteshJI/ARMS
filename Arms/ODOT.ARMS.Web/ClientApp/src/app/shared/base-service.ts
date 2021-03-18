import { EnvService } from "../core/services/env.service";

export class BaseService {
  apiUrl = this.env.apiUrl;

  constructor(private env: EnvService) { }
}
