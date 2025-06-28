import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../components/services/role.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[showContent]'
})
export class ShowContentDirective implements OnInit, OnDestroy {

  private requiredContent = '';
  private sub !: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private roleService: RoleService
  ) {}

  @Input()
  set showContent(content: string) {
    this.requiredContent = content;
    this.updateView();
  }

  ngOnInit() {
    this.sub = this.roleService.getAllowedContentObs().subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.roleService.isAllowedContent(this.requiredContent)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
        