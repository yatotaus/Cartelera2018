import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillboardService } from 'app/services/billboard.service';
import { Billboard } from 'app/model/billboard';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
})
export class NewPublicationComponent implements OnInit {

  publicationForm: FormGroup;
  submitted = false;
  billboards$: Billboard;

  constructor(private formBuilder: FormBuilder, private billboardService: BillboardService) { }

  ngOnInit() {
     this.billboardService.getBillboards().subscribe(
        result => {
          this.billboards$ = result;
        }
    )

    this.publicationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', Validators.required],
      coments: [false, [Validators.required]],
      billboard: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.publicationForm.invalid) {
        return;
    }
    this.billboardService.addPublication(this.publicationForm.value);
  }
  get f() { return this.publicationForm.controls; }
}