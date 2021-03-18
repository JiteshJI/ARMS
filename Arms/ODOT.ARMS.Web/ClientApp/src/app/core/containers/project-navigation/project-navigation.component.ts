import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PanelBarItemModel} from '@progress/kendo-angular-layout';
import { Store } from '@ngrx/store';
import * as fromProjectreducer from "../../../project/state/reducers/project.reducer";
import * as  fromProjectAction from '../../../project/state/actions/project.actions';

@Component({
  selector: 'app-project-navigation',
  styleUrls: ['./project-navigation.component.scss'],
  templateUrl: './project-navigation.component.html'
})


export class ProjectNavigationComponent implements OnInit {

  @Output() selectHandler = new EventEmitter<any>();
  //Test data for giggles and grins
  private data = [];
  private olddata = [];

  private router: Router;
  private selectedId = '';

  constructor(router: Router, public projectStore: Store<fromProjectreducer.ProjectState>) {
  //constructor() {
    this.router = router;
    /*
    this.router = router;
    this.projectStore.dispatch(fromProjectAction.loadProject());
    //console.debug('NAV Constructor');
   // alert('test');
    this.projectStore.select(fromProjectreducer.getAllProject).subscribe(
      projects => {
        
        if (projects.length > 0) {
          this.data = projects;
          this.queryItems();
        }
      });
      */
    
  }
   public stateChange(data: Array<PanelBarItemModel>): boolean {
    const focusedEvent: PanelBarItemModel = data.filter(item => item.focused === true)[0];
    if (focusedEvent.id !== '~') {
      this.selectedId = focusedEvent.id;
      /** use this trigger navigation to a new route */
      this.router.navigate(['/project', 'edit', focusedEvent.id, focusedEvent.title,'prj', 'info']);
    }
    return false;
  }

  ngOnInit() {

    //this.router = router;
    /*
    this.projectStore.dispatch(fromProjectAction.loadProject());
    this.projectStore.select(fromProjectreducer.getAllProject).subscribe(
      projects => {

        if (projects.length > 0) {
          this.data = projects;
          this.queryItems();
        }
      });
      */
    this.reloadProjects();
   
  }

  //==========================================================================================================================
  //
  // This method load the NAV bar
  // Only if something changes
  //
  // To handle future loads when a new project is added, we will need to call this directly
  //
  // Not exactly sure how that is done
  //
  // Author: Philippe aka Hank
  //
  //==========================================================================================================================
  public reloadProjects() {
    this.projectStore.dispatch(fromProjectAction.loadProject());
    this.projectStore.select(fromProjectreducer.getAllProject).subscribe(
      projects => {

        if (projects.length > 0) {

          this.data = projects.sort((a, b) => (a.rfpNum > b.rfpNum) ? 1 : -1);
          if (!this.isEqual(this.data, this.olddata))
          {
            this.queryItems();
            this.olddata = this.nestedCopy(this.data);
          }

        }
      });
  }

  private nestedCopy(array): Array<any> {
    return JSON.parse(JSON.stringify(array));
  }

  private isEqual(a, b: Array<any>) {
  //var a = [1, 2, 3, 5];
  //var b = [1, 2, 3, 5];
  // if length is not equal 
    if (a.length != b.length)
      return false;
    else {
      // comapring each element of array 
      for (var i = 0; i < a.length; i++) {
        //console.info(a[i].rfpNum + ' ' + b[i].rfpNum);
        if (a[i].rfpNum != b[i].rfpNum)
          return false;
      }
    }
    return true;
}


  // tslint:disable-next-line: member-ordering
  public projectView: Array<any>;



  private queryItems(): void {
    //alert('Test');

    this.projectView = new Array<any>();

    const MyProj = <PanelBarItemModel>{
      title: "My Projects",
      id: "~",
      expanded: true,
      children: []
    };

    const StndProj = <PanelBarItemModel>{
      title: "Standard Projects",
      id: "~",
      expanded: false,
      children: []
    };

    const RocProj = <PanelBarItemModel>{
      title: "ROC Projects",
      id: "~",
      expanded: false,
      children: []
    };

    const PooledProj = <PanelBarItemModel>{
      title: "Pooled Funding",
      id: "~",
      expanded: false,
      children: []
    };

    const OrilProj = <PanelBarItemModel>{
      title: "ORIL Projects",
      id: "~",
      expanded: false,
      children: []
    };

    for (var item of this.data) {
      //if (item.owned_prj) {
        MyProj.children.push(<PanelBarItemModel>{
          id: item.projectClassificationId,
          title: item.rfpNum,

          children: []
        })
      //}

      if (item.projectClassificationId == 72) {//STANDARD
        StndProj.children.push(<PanelBarItemModel>{
          title: item.rfpNum,
          id: item.projectClassificationId,
          children: []
        });
      }

      if (item.projectClassificationId == 73) { //ROC
        RocProj.children.push(<PanelBarItemModel>{
          title: item.rfpNum,
          id: item.projectClassificationId,
          children: []
        }); 
      }

      if (item.projectClassificationId == 75) {//POOLED
        PooledProj.children.push(<PanelBarItemModel>{
          title: item.rfpNum,
          id: item.projectClassificationId,
          children: []
        });
      }

      if (item.projectClassificationId == 74) {//ORIL
        OrilProj.children.push(<PanelBarItemModel>{
          title: item.rfpNum,
          id: item.projectClassificationId,
          children: []
        });
      }
    }

    if (MyProj.children.length > 0) {
      this.projectView.push(MyProj);
    }

    if (StndProj.children.length > 0) {
      this.projectView.push(StndProj);
    }

    if (RocProj.children.length > 0) {
      this.projectView.push(RocProj);
    }

    if (PooledProj.children.length > 0) {
      this.projectView.push(PooledProj);
    }

    if (OrilProj.children.length > 0) {
      this.projectView.push(OrilProj);
    }
  }
}

