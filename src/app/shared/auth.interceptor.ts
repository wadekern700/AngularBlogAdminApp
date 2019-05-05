import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    // intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    //     console.log("In Auth Interceptor")
    //     const copiedreq = req.clone({ params: req.params.set('auth', this.aService.getToken()) });
    //     return next.handle(copiedreq).pipe(
    //         tap(event => console.log(event))
    //         , catchError(err => {

    //             if (err instanceof HttpErrorResponse) {
    //                 if (err.status === 401) {
    //                     console.log('this should print your error!', err);
    //                     return Observable.throw(err);
    //                 }
    //             };
    //         }));
    // }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        ///  console.log('Intercepted!', req);
        //  const copiedReq = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*'), params: req.params.set('auth', this.aService.getToken()) });
        return next.handle(req);
    }
    constructor(private aService: AuthService) { }

}
