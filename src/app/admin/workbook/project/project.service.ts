import {Injectable} from '@angular/core';
import {BaseService} from '../../../base.service';
import {catchError} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class ProjectService extends BaseService {
    // project
    getProjects() {
        const url = `/apis/wb_projects`;
        return this.http.get(url).pipe(catchError(this.handleError));
    }

    getProject(id: number) {
        const url = `/apis/wb_projects`;
        let params = new HttpParams();
        params = params.set('id', id.toString());
        return this.http.get(url, {params: params}).pipe(catchError(this.handleError));
    }

    putProject(project) {
        const url = `/apis/wb_projects`;
        return this.http.put(url, project).pipe(catchError(this.handleError));
    }

    postProject(project) {
        const url = `/apis/wb_projects`;
        return this.http.post(url, project).pipe(catchError(this.handleError));
    }

    deleteProject(id: number) {
        const url = `/apis/wb_projects`;
        let params = new HttpParams();
        params = params.set('id', id.toString());
        return this.http.delete(url, {params: params}).pipe(catchError(this.handleError));
    }

    // activity
    getActivities(id_project: number) {
        const url = `/apis/wb_activities`;
        let params = new HttpParams();
        params = params.set('id_project', id_project.toString());
        return this.http.get(url, {params: params}).pipe(catchError(this.handleError));
    }

    getActivity(id: number) {
        const url = `/apis/wb_activities`;
        let params = new HttpParams();
        params = params.set('id', id.toString());
        return this.http.get(url, {params: params}).pipe(catchError(this.handleError));
    }

    postActivity(activity) {
        const url = `/apis/wb_activities`;
        return this.http.post(url, activity).pipe(catchError(this.handleError));
    }

    putActivity(activity) {
        const url = `/apis/wb_activities`;
        return this.http.put(url, activity).pipe(catchError(this.handleError));
    }

    deleteActivity(id: number) {
        const url = `/apis/wb_activities`;
        let params = new HttpParams();
        params = params.set('id', id.toString());
        return this.http.delete(url, {params: params}).pipe(catchError(this.handleError));
    }

    // other
    setEndActivity(body) {
        const url = `/apis/wb_set_end_a`;
        let params = new HttpParams();
        params = params.set('id', body.id.toString());
        return this.http.post(url, body, {params: params}).pipe(catchError(this.handleError));
    }

    getAllActivities() {
        const url = `/apis/wb_activities`;
        return this.http.get(url).pipe(catchError(this.handleError));
    }
}
