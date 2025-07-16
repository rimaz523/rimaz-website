import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { HttpRequestHeaders } from '@shared/constants/app.constants'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

export function apimSubscriptionHeaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const newReq = req.clone({
    headers: req.headers.append(
      HttpRequestHeaders.apimSubscriptionKey,
      environment.integrationsApimSubscriptionKey,
    ),
  })

  return next(newReq)
}
