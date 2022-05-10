import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartModel} from '../../models/part-model';
import {PartService} from '../../services/part.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  partId;
  part: PartModel;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private partService: PartService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.partId = params['params'].partId;
      if (this.partId) {
        this.partService.getPart(this.partId).subscribe(resp => {
          this.part = resp;
          this.isLoading = false;
        });
      } else {
        this.router.navigateByUrl('new-part');
      }
    });
  }

  onSubmitPartForm(): void {
    this.partService.updatePart(this.part).subscribe(resp => {
      this.router.navigateByUrl('parts');
    });
  }
}
