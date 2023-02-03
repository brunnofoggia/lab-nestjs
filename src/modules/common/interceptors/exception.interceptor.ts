import QueryErrorMessage from '@database/errors';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError(_err => {
                    let err;
                    console.log('exception', _err);
                    switch (true) {
                        case _err instanceof HttpException:
                            err = throwError(() => _err);
                            break;
                        case _err instanceof QueryFailedError:
                            console.log('query failed', _err);
                            err = throwError(() => new HttpException(
                                QueryErrorMessage({ code: _.result(_err, 'code') + '' }), HttpStatus.UNPROCESSABLE_ENTITY)
                            );
                            break;
                        default:
                            err = throwError(() => new BadGatewayException());
                    }

                    return err;
                }),
            );
    }
}
