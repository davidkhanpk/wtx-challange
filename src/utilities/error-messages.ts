import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { Controller, Injectable } from '@nestjs/common';

export enum ERROR_CODES {
    "INTERNAL_SERVER_ERROR" = 500,
}

export class ErrorMessages {
    constructor(private readonly i18n: I18nService) {}
    getExceptionMessageText(statusCode: number): string {
        switch(statusCode) {
            case ERROR_CODES.INTERNAL_SERVER_ERROR:
                return this.i18n.t('Errors.INTERNAL_SERVER_ERROR');
            // default:
            //     return this.i18n.t('Errors.INTERNAL_SERVER_ERROR');
        }
    }
}