import { Component, OnInit } from '@angular/core';
import { ConfigService, GenieConfiguration} from '../config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [ConfigService]
})
export class ConfigComponent implements OnInit {
  genieConfiguration: GenieConfiguration;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.genieConfiguration = this.configService.GenieConfiguration();
    console.log('Genie config', this.genieConfiguration);
  }

  genieConfigurationUpdate() {
    this.configService.UpdateGenieConfiguration(this.genieConfiguration);
  }
}
