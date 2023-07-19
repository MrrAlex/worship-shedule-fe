import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../../../models/service.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'ws-add-new-service-form',
  templateUrl: './add-new-service-form.component.html',
  styleUrls: ['./add-new-service-form.component.scss']
})
export class AddNewServiceFormComponent implements OnInit{

  constructor(private fb: UntypedFormBuilder) {
  }

  @Input()
  service!: Service

  serviceForm!: UntypedFormGroup;

  ngOnInit() {
    this.serviceForm = this.fb.group({
      name: '',
      description: '',
      date: '',
      instruments: '',
    })
  }
}
