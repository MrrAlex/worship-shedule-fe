import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter, switchMap} from "rxjs";
import {EndpointsService} from "../../../services/endpoints.service";
import {Service} from "../../../models/service.model";

@Component({
  selector: 'ws-add-new-service-page',
  templateUrl: './add-new-service-page.component.html',
  styleUrls: ['./add-new-service-page.component.scss']
})
export class AddNewServicePageComponent implements OnInit{
  constructor(private route: ActivatedRoute, private endpointsService: EndpointsService) {
  }

  service!: Service;

  ngOnInit() {
    this.route.data.pipe(
      filter(data => data['id']),
      switchMap(data => this.endpointsService.loadService(data['id']))
    ).subscribe(data => {
      this.service = data;
    })
  }
}
