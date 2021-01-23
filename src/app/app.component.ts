import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isDarkTheme: Observable<boolean>;

  public deviceTypes = [
    { label: 'Smartphone', value: 0.0012 },
    { label: 'Tablet', value: 0.003 },
    { label: 'Laptop', value: 0.022 },
    { label: 'Television (50" LED)', value: 0.12 },
  ];

  public networkTypes = [
    { label: 'WiFi', value: 0.01821 },
    { label: '4G', value: 0.00853 }
  ];

  public totalEmissions: number;
  public deviceConsumption: number;
  public networkConsumption: number;

  private worldValue = 463;

  public form: FormGroup = new FormGroup({
    hours: new FormControl(null, [Validators.required, Validators.min(1)]),
    device: new FormControl(null, [Validators.required]),
    network: new FormControl(null, [Validators.required])
  });

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.calculateTotalEmissions();
      } else {
        this.totalEmissions = null;
      }
    });
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  private calculateTotalEmissions(): void {
    this.deviceConsumption = this.form.value.hours * this.deviceValue.value;
    this.networkConsumption = this.form.value.hours * this.networkValue.value;

    // Round total emissions to two decimal places
    this.totalEmissions = Math.round(this.worldValue * (this.deviceConsumption + this.networkConsumption) * 100) / 100;
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  get deviceValue(): { label: string, value: number } {
    return this.form.get('device').value;
  }

  get networkValue(): { label: string, value: number } {
    return this.form.get('network').value;
  }

  get hoursValue(): number {
    return this.form.get('hours').value;
  }

}
