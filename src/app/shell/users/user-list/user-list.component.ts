import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThfPageFilter, ThfTableColumn } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/core/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  readonly filterSettings: ThfPageFilter = {
    action: 'filterUserByName',
    ngModel: 'userNameFilter',
    placeholder: 'Nome',

  };

  readonly columns: Array<ThfTableColumn> = [
    { property: 'name', label: 'Nome' },
    { property: 'perfil', label: 'Perfil' },
    { property: 'team', label: 'Equipe' }
  ];

  private page = 0;

  private size = 20;

  private destroy: Subject<void> = new Subject();

  isLoading = false;

  userNameFilter = '';

  userPage: any = { hasNext: false, items: [] };


  constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.handleParams();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  handleParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe(queryParams => {
        if (queryParams.initials) {
          this.filterUserByName(queryParams.initials);
        } else {
          this.loadUsers();
        }
      });
  }

  loadUsers(page = this.page, size = this.size): void {
    this.startLoading();
    this.usersService.findAllPaging(page, size)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => { this.stopLoading(); }))
      .subscribe(users => {
        this.userPage.hasNext = users.hasNext;
        if (this.userPage.items.length > 0) {
          this.userPage.items = this.userPage.items.concat(users.items);
        } else {
          this.userPage.items = users.items;
        }
      });
  }

  filterUserByName(filter = this.userNameFilter): void {
    this.resetPage();
    this.startLoading();
    this.setUserNameFilter(filter);
    this.usersService.findByNameContaining(filter, this.page, this.size)
      .pipe(finalize(() => { this.stopLoading(); }))
      .subscribe(users => {
        this.userPage = users;
      });
  }

  findUserByName(initials: string) {
    this.userNameFilter = initials;
    this.filterUserByName(this.userNameFilter);
  }

  loadMore(): void {
    this.nextPage();
    if (this.userNameFilter.trim() === '') {
      this.loadUsers();
    } else {
      this.usersService.findByNameContaining(this.userNameFilter, this.page, this.size)
        .pipe(finalize(() => { this.stopLoading(); }))
        .subscribe(students => {
          this.userPage.hasNext = students.hasNext;
          this.userPage.items = this.userPage.items.concat(students.items);
        });
    }
  }

  setUserNameFilter(userNameFilter: string): void {
    this.userNameFilter = userNameFilter;
  }

  nextPage(): void {
    this.page += 1;
  }

  resetPage(): void {
    this.page = 0;
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }

}
