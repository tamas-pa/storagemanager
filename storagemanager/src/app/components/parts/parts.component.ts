import {Component, OnInit} from '@angular/core';
import {PartService} from '../../services/part.service';
import {PartModel} from '../../models/part-model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  parts: PartModel[];
  isLoading: boolean;

  constructor(
    private partService: PartService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.partService.getParts().subscribe((resp: any) => {
      this.parts = resp;
      this.isLoading = false;
    });
  }

  navigate(route): void {
    this.router.navigateByUrl(route);
  }

  deletePart(partId): void {
    this.partService.deletePart(partId).subscribe(resp => {
      this.partService.getParts().subscribe((resp: any) => {
        this.parts = resp;
        this.isLoading = false;
      });
    });
  }

}
