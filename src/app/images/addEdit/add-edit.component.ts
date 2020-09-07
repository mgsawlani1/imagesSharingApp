import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ImagesService } from '../../core/services/images.service';
import * as ImageAction from '../../store/actions/image.actions';
import { ImageState } from './../../store/image.state';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  edit = false;
  image: any;
  public editForm: FormGroup;
  imageData: any;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imgService: ImagesService,
    private store: Store<ImageState>,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.edit = true;
    }
    this.imgService.getImageDataById(id).subscribe(
      (image) => {
        this.editForm.setValue(image);
      },
      (error) => {
        console.log('Error : ', error);
        window.alert(error.status);
      }
    );
  }

  ngOnInit(): void {}

  get form(): any {
    return this.editForm.controls;
  }
  resetForm(): any {
    this.editForm.controls['name'].setValue(this.image.name);
    this.editForm.controls['description'].setValue(this.image.description);
    this.editForm.controls['imageUrl'].setValue('this.image.imageUrl');
  }

  saveForm(value): any {
    this.submitted = true;
    const imageData = this.editForm.value;
    if (!this.edit) {
      this.imgService.addImage(value).subscribe(
        (image) => {
          this.router.navigate(['/image']);
        },
        (error) => {
          console.log('Error : ', error);
          window.alert(error.status);
        }
      );
    } else {
      this.imgService.updateImage(value).subscribe(
        (image) => {
          this.router.navigate(['/image']);
        },
        (error) => {
          console.log('Error : ', error);
          window.alert(error);
        }
      );
    }
    // store data
    this.store.dispatch(
      new ImageAction.Add({
        id: imageData.id,
        name: imageData.name,
        description: imageData.description,
        imageUrl: imageData.imageUrl,
      })
    );
  }
}
