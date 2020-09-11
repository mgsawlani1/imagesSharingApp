import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ImagesService } from 'src/app/core/services/images.service';
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

  id: any;

  constructor(
    private route: ActivatedRoute,

    private router: Router,

    private imgService: ImagesService,

    private store: Store<ImageState>,

    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
    });

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.edit = true;
    }
    if (this.edit) {
      this.imgService.getImageDataById(this.id).subscribe((data) => {
        this.editForm.setValue(data);
      });
    }
  }

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
    if (this.editForm.invalid) {
      window.alert('Form is not valid Please fill required Details');
    }
    this.submitted = true;
    const newImage = this.editForm.value;
    //add
    if (!this.edit) {
      this.store.dispatch(new Add(this.editForm.value));
      this.store.dispatch(new GetImages());
      this.router.navigate(['/image']);
    } else {
      this.store.dispatch(new Update(newImage));
      this.store.dispatch(new GetImages());
      window.alert('updated successfully');
      this.router.navigate(['/image']);
    }
  }
  goBack(): void {
    this.router.navigate(['/image']);
  }
}
