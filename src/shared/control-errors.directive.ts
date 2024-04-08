import { Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
import { AbstractControl, FormControlName, FormGroupDirective } from "@angular/forms";

type ErrorMessages = {[key: string]: string};

const DEFAULT_ERROR_MESSAGES: ErrorMessages = {
  'required': 'Field is required',
  'email': 'Email is not valid',
  'pattern': 'Password should contain min length 8 and at least one number and one letter',
  'matching': 'Password should be the same',
  'usernameExist': 'This username already exist'
}

@Directive({
  selector: '[controlErrors]',
})
export class ControlErrorsDirective implements OnInit {
  @Input() errorTemplate!: TemplateRef<{ error: string }>;

  // Can be provided different error messages for each control
  // in case you need message like 'Username is required' instead 'Field is required' or different letters length etc.
  // but I used only default messages
  @Input() messages: ErrorMessages = DEFAULT_ERROR_MESSAGES;

  private control: AbstractControl | undefined;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private formControl: FormControlName,
              private container: ViewContainerRef,
              private formGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.control = this.formGroup.getControl(this.formControl);
    this.control.statusChanges
      .pipe() // TODO: unsubscribe on destroy
      .subscribe(() => this._onControlValueChanged());
  }

  private _onControlValueChanged(): void {
    const error: string | null = this._getErrorMessage();

    if (error) {
      this._showError(error);
    } else {
      this._hideError();
    }
  }

  private _showError(text: string): void {
    this.container.clear();
    this.container.createEmbeddedView(this.errorTemplate, {error: text});
  }

  private _hideError(): void {
    this.container.clear();
  }

  private _getErrorMessage(): string | null {
    if (!this.control?.errors)
      return null;

    const errorsKeys: string[] = Object.keys(this.control!.errors ?? {});
    const errorKey: string = errorsKeys[0];

    if (!this.messages.hasOwnProperty(errorKey)) {
      console.warn(`Missed validation error: ${errorKey}`);
      return 'Field is invalid';
    }

    return this.messages[errorKey];
  }
}
