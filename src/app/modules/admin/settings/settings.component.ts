import { Component, OnInit } from '@angular/core';
import {CategoryModel, ResModel} from "../../../shared/models";
import {SettingsService} from "./settings.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-setting',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  ngOnInit(): void {
  }
}
