import {Component, OnInit} from '@angular/core';
import {PartModel} from "../../models/part-model";
import {ActivatedRoute, Router} from "@angular/router";
import {PartService} from "../../services/part.service";

@Component({
  selector: 'app-new-part',
  templateUrl: './new-part.component.html',
  styleUrls: ['./new-part.component.scss']
})
export class NewPartComponent implements OnInit {
  part = new PartModel();

  constructor(
    private router: Router,
    private partService: PartService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmitPartForm(): void {
    this.partService.savePart(this.part).subscribe(resp => {
      this.router.navigateByUrl('parts');
    });
  }
}
