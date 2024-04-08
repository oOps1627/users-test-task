import { NgModule } from "@angular/core";
import { ControlErrorsDirective } from "./control-errors.directive";

@NgModule({
  declarations: [ControlErrorsDirective],
  exports: [ControlErrorsDirective]
})
export class SharedModule {
}
