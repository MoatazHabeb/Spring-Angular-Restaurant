import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductActionsVM} from '../../../model/product-actions-vm';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../model/product';
import {CategoryVM} from '../../../model/category-vm';
import {CategoryService} from '../../../service/category.service';
import {CategoryComponent} from "../category/category.component";
import {CategoryRefreshService} from "../../../service/category-refresh-service";
import {ProductRefreshService} from "../../../service/product-refresh-service";
import {NgForm} from "@angular/forms";
import {response} from "express";


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  selectedFile!: File;

  proo: Product = {
    id: 0,
    name: '',
    logoPath: '',
    description: '',
    price: 0
  };
  product: ProductActionsVM = {
    name: '',
    logoPath: '',
    description: '',
    price: 0,
    categoryName: ''
  };
  category: CategoryVM = {
    name: '',
    logoPath: '',
    flag: ''
  };

  existedName = '';
  category2: CategoryVM = new CategoryVM();
  successMessage = '';
  errorMessage = '';

  categoryName = '';
  message = '';

  messageAr = '';
  messageEn = '';

  isAddProductMode = false;
  isUpdateProductMode = false;
  isAddCategoryMode = false;
  isDeleteCategoryMode = false;
  isUpdateCategoryMode = false;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private refreshService: CategoryRefreshService,
    private productRefreshService: ProductRefreshService,
    private router: Router
  ) {}
  @ViewChild('categoryForm') categoryForm!: NgForm;
  ngOnInit(): void {
    // Use the snapshot initially
    this.checkRoute();

    // Subscribe to the route params in case of changes (important for dynamic routes)
    this.activatedRoute.paramMap.subscribe(params => {
      this.checkRoute();
    });
  }

  private checkRoute(): void {
    const key = this.activatedRoute.snapshot.paramMap.get('key');
    this.isAddProductMode = key === 'addproduct';
    this.isUpdateProductMode = key === 'updateproduct';
    this.isAddCategoryMode = key === 'addcategory';
    this.isDeleteCategoryMode = key === 'deletecategory';
    this.isUpdateCategoryMode = key === 'updatecategory';
  }


  // UpdateCategory
  onSubmit(): void {
    if (!this.isUpdateCategoryMode) { return; }
    // Clear any previous error messages
    this.messageAr = '';
    this.messageEn = '';

    this.categoryService.updateCategory(this.existedName, this.category2).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (response) => {
        // Check if the server returns a NOT_ACCEPTABLE status
        // @ts-ignore
        if (response && response.status === 'NOT_ACCEPTABLE') {
          // If status is NOT_ACCEPTABLE, display the error messages
          // @ts-ignore
          this.messageAr = response.bundleMessage?.message_ar || 'فشل في حذف الفئة';
          // @ts-ignore
          this.messageEn = response.bundleMessage?.message_en || 'Failed to delete category';


        } else {
          this.successMessage = 'Category updated successfully!';
          this.errorMessage = '';

          // ✅ Trigger reload in CategoryComponent
          this.refreshService.triggerRefresh();

          // ✅ Reset the form to prepare for next update
          this.resetForm3();

          // ✅ Clear success message after 7 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 7000);
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to update category.';
        this.successMessage = '';

        // ✅ Clear error message after 7 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 7000);
      }
    });
  }
  resetForm3(): void {
    this.category2 = {
      // set the fields to initial/empty values
      name: '',
      logoPath: '',
      flag: ''
      // Add other fields if any
    };
    this.existedName = '';
  }












// DeleteCategory
  // tslint:disable-next-line:typedef
  deleteCategory(){
    if (!this.isDeleteCategoryMode) { return; }

    if (!this.categoryName.trim()) {
      this.message = 'Category name is required.';
      return;
    }

    // Clear any previous error messages
    this.messageAr = '';
    this.messageEn = '';

    this.categoryService.deleteCategoryByName(this.categoryName).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (response) => {
        // Check if the server returns a NOT_ACCEPTABLE status
        // @ts-ignore
        if (response && response.status === 'NOT_ACCEPTABLE') {
          // If status is NOT_ACCEPTABLE, display the error messages
          // @ts-ignore
          this.messageAr = response.bundleMessage?.message_ar || 'فشل في حذف الفئة';
          // @ts-ignore
          this.messageEn = response.bundleMessage?.message_en || 'Failed to delete category';

          // Clear the error messages after 7 seconds
          this.clearMessagesAfterDelay();
        } else {
          this.message = `Category "${this.categoryName}" deleted successfully.`;
          this.resetForm();
          this.categoryName = '';

          // Trigger reload in CategoryComponent
          this.refreshService.triggerRefresh();

          // Clear the success message after 7 seconds
          this.clearMessagesAfterDelay();
        }
      },
      error: (err) => {
        // Handle errors in case of a failed request
        this.message = `Failed to delete category: ${err.error || 'Unknown error'}`;

        // Clear the error message after 7 seconds
        this.clearMessagesAfterDelay();
      }
    });
  }

// Method to clear messages after 7 seconds
  // tslint:disable-next-line:typedef
  private clearMessagesAfterDelay() {
    setTimeout(() => {
      this.messageAr = '';
      this.messageEn = '';
      this.message = '';
    }, 7000); // 7000 milliseconds = 7 seconds
  }

// AddCategory
  submitCategory(): void {
    if (!this.isAddCategoryMode) { return; }

    // Clear any previous error messages
    this.messageAr = '';
    this.messageEn = '';

    // Call the service to add the category
    this.categoryService.addCategory(this.category).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (response) => {
        // Check if the server returns a NOT_ACCEPTABLE status
        // @ts-ignore
        if (response && response.status === 'NOT_ACCEPTABLE') {
          // If status is NOT_ACCEPTABLE, display the error messages
          // @ts-ignore
          this.messageAr = response.bundleMessage.message_ar || 'فشل في إضافة الفئة';
          // @ts-ignore
          this.messageEn = response.bundleMessage.message_en || 'Failed to add category';
        } else {
          // If category was added successfully (201 Created)
          alert('Category added successfully!');
          this.resetForm();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.refreshService.triggerRefresh();
          });
        }
      },
      (error) => {
        // Handle error response
        console.error('Error adding category:', error);

        // Check for known error format, such as status 406 (NOT_ACCEPTABLE)
        if (error && error.status === 406) {
          this.messageAr = error.error?.bundleMessage?.message_ar || 'فشل في إضافة الفئة';
          this.messageEn = error.error?.bundleMessage?.message_en || 'Failed to add category';
        } else {
          // Handle any other errors (e.g., network issues or unknown server errors)
          this.messageAr = 'فشل في إضافة الفئة';
          this.messageEn = 'Failed to add category';
        }
      }
    );
  }

  resetForm(): void {
    // Reset the form fields by setting the model values to empty strings
    this.category = { name: '', logoPath: '', flag: '' };

    // Reset the form controls
    if (this.categoryForm) {
      this.categoryForm.resetForm();
    }
  }
// ------------------------AddCategory






// UpdateProduct
  // tslint:disable-next-line:typedef
  updateProduct(formRef: NgForm): void {
    if (!this.isUpdateProductMode) { return; }
    const exid = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.proo.id = exid;
    this.productService.updateProduct(this.proo).subscribe({
      next: (updatedProduct) => {
        alert('Product updated successfully!');
        this.proo = updatedProduct;
        // 🔁 Trigger reload in CategoryComponent
        this.refreshService.triggerRefresh();
        // Trigger refresh event
        this.productRefreshService.triggerRefresh();
        // ✅ Reset the form after successful update
        formRef.resetForm();

      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Product update failed.');
      }
    });
  }


  onFileSelected(event: any): void {
    if (!this.isUpdateProductMode) { return; }
    const file: File = event.target.files[0];
    if (file) {
      const fullName = file.name; // e.g., 'my-logo.jpg'
      const nameWithoutExt = fullName.substring(0, fullName.lastIndexOf('.'));
      this.proo.logoPath = nameWithoutExt;

      // If you want to actually upload the file to the server, you'd do it here.
      // For now, we're just extracting and storing the name part.
      console.log('Filename without extension:', this.proo.logoPath);
    }
  }

// -----------------------UpdateProduct









// AddProduct
  handleProductAction(event?: any): void {
    if (!this.isAddProductMode) { return; }

    this.messageAr = '';
    this.messageEn = '';
    this.successMessage = '';
    this.errorMessage = '';

    const file = event?.target?.files[0]; // Get the file if it exists
    if (file) {
      this.selectedFile = file;

      // Remove extension from filename and assign it to the product's logoPath
      const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      this.product.logoPath = fileNameWithoutExtension;  // Set the logoPath in the product object
    }

    // Send the product object to the service
    this.productService.addProduct(this.product).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (response) => {
        // Check if the server returns a NOT_ACCEPTABLE status
        // @ts-ignore
        if (response && response.status === 'NOT_ACCEPTABLE') {
          // @ts-ignore
          this.messageAr = response.bundleMessage?.message_ar || 'فشل في إضافة الفئة';
          // @ts-ignore
          this.messageEn = response.bundleMessage?.message_en || 'Failed to add category';
          this.clearMessagesAfterDelay2();
        } else {
          this.successMessage = 'Product added successfully!';  // Display success message
          this.clearMessagesAfterDelay2();

          // Reset form data after successful submission
          this.resetForm2();
        }
      },
      (error) => {
        console.error('Error adding product:', error);
        if (error && error.status === 406) {
          this.errorMessage = error.error?.bundleMessage?.message_en || 'Failed to add product';
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
        this.clearMessagesAfterDelay2();
      }
    );
  }

  // Method to reset the form data
  resetForm2(): void {
    // Reset product object
    this.product = {
      name: '',
      logoPath: '',
      description: '',
      price: null,
      categoryName: ''
    };

    // Reset the file input field
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      (fileInput as HTMLInputElement).value = '';  // Clear the file input
    }
  }

  // Optionally, you can add a method to clear messages after a delay.
  clearMessagesAfterDelay2(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
      this.messageAr = '';
      this.messageEn = '';
    }, 3000); // Clear messages after 3 seconds
  }




  // ------------------------AddProduct
}
