import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ImagesService } from '../../core/services/images.service';
import { Add, GetImages, Update } from '../../store/actions/image.actions';
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

  isAuthUser: boolean;

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
        window.alert(error.status);
      }
    );
  }

  ngOnInit(): void {}

  get form(): any {
    return this.editForm.controls;
  }

  resetForm(): any {
    this.editForm.controls['id'].setValue(this.image.id);
    this.editForm.controls['name'].setValue(this.image.name);
    this.editForm.controls['description'].setValue(this.image.description);
    this.editForm.controls['imageUrl'].setValue('this.image.imageUrl');
  }

  onSubmit(): any {
    this.submitted = true;
    const newImage = this.editForm.value;
    if (!this.edit) {
      this.store.dispatch(new Add(newImage));
      this.store.dispatch(new GetImages());
      this.router.navigate(['/image', { isAuthUser: true }]);
    } else {
      this.store.dispatch(new Update(newImage));
      this.store.dispatch(new GetImages());
      this.router.navigate(['/image', { isAuthUser: true }]);
    }
  }
}
