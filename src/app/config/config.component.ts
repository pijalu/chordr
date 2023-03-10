import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

import { ConfigService, GenieConfiguration } from '../config.service';

import { StringMap } from '../../utils/string-map';

import { Modes } from '../../engine/modes';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [ConfigService]
})
export class ConfigComponent implements OnInit {
  isResetInfoShown = false;
  genieConfiguration: GenieConfiguration;
  genieConfigurationDisabledModes: StringMap<boolean>;

  constructor(private configService: ConfigService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.genieConfiguration = this.configService.GenieConfiguration();
    console.log('Genie config', this.genieConfiguration);

    // Setup disabled mode
    this.genieConfigurationDisabledModes = new StringMap<boolean>();
    this.genieConfigurationModes().forEach(m => this.genieConfigurationDisabledModes.put(m, false));
    this.genieConfiguration.excludedMode.forEach(m => this.genieConfigurationDisabledModes.put(m, true));
  }

  clearStorage() {
    console.log('Reset local storage');
    this.localStorageService.clearAll();
    this.isResetInfoShown = true;
  }

  toggleResetInfoShown() {
    this.isResetInfoShown = false;
  }

  genieConfigurationUpdate() {
    this.configService.UpdateGenieConfiguration(this.genieConfiguration);
  }

  genieConfigurationDisabledModesUpdate(mode: string, value: boolean) {
    this.genieConfiguration.excludedMode = [];
    this.genieConfigurationDisabledModes.keySet().forEach(keySet => {
       if (keySet.value) {
         this.genieConfiguration.excludedMode.push(keySet.key);
      }
    });
    this.genieConfigurationUpdate();
  }

  genieConfigurationModes(): Array<string> {
    return Modes.Mode.Names();
  }
}
