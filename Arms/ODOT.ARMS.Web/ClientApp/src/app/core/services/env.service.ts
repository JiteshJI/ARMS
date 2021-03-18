import { Injectable } from '@angular/core';

// Read environment variables from browser window
export const browserWindow = window || {};
export const browserWindowEnv = browserWindow['__env'] || {};


// This pattern for loading environment variables from an external source was inspired by:
// https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js
  // Using this service is a better approach for environment-specific settings than the built-in environment.ts
  // because the built-in file(s) are going to be compiled as part of the source code and, therefore, cannot
  // be overriden for each environment. You have to run a new build for each environment which is inefficient.
  // This system allows us to copy the appropriate environment settings file
  // (environments / app.dev.js, environments / app.tst.js, etc.) while deploying. This helps our builds and
  // release pipelines be cleaner

  public production = false;
  public baseUrl = '';
  public apiUrl = '';

  constructor() {
    for (const key in browserWindowEnv) {
      if (browserWindowEnv.hasOwnProperty(key)) {
        this[key] = window['__env'][key];
      }
    }
  }
}
