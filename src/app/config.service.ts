import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

/** Genie configuration */
export class GenieConfiguration {
  /** disabled automatic progression calculation */
  searchProgressionAutomatically = true;
  /** Skip common progression pattern from calculation */
  skipCommonProgressionPattern = false;
  /** List of excluded modes */
  excludedMode: Array<string> = [];
  
  constructor() { }
}

const configGenieKey = 'ConfigService_genie';

@Injectable()
export class ConfigService {
  constructor(private localStorageService: LocalStorageService) { }

  /** Get current genie config */
  GenieConfiguration(): GenieConfiguration {
    let config: GenieConfiguration = this.localStorageService.get(configGenieKey);
    if (!config) {
      config = new GenieConfiguration();
      console.log('Created new genie configuration', config);
      this.UpdateGenieConfiguration(config);
    }
    return config;
  }

  /** update genie configuration */
  UpdateGenieConfiguration(config: GenieConfiguration) {
    this.localStorageService.set(configGenieKey, config);
  }
}
