import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ServiceTemplate} from "../../../models/service-template.model";

@Component({
  selector: 'ws-add-service-choose-template',
  templateUrl: './add-service-choose-template-modal.component.html',
  styleUrls: ['./add-service-choose-template-modal.component.scss']
})
export class AddServiceChooseTemplateModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddServiceChooseTemplateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  header!: string;
  templates!: ServiceTemplate[];

  selectedTemplate!: ServiceTemplate;

  ngOnInit() {
    this.header = this.data.header;
    this.templates = this.data.templates;
  }

  navigateToAddServicePage() {
    this.dialogRef.close(this.selectedTemplate)
  }

  navigateNoTemplate() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close(false)
  }
}
