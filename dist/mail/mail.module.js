"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const mail_service_1 = require("./mail.service");
const mail_controller_1 = require("./mail.controller");
const email_validator_1 = require("./email.validator");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: parseInt(process.env.GMAILPORT),
                        auth: {
                            user: process.env.EMAILADDRESS,
                            pass: process.env.EMAILPASSWORD,
                        },
                    },
                    defaults: {
                        from: `'Waa' <${process.env.EMAILADDRESS}>`,
                    },
                }),
            }),
        ],
        controllers: [mail_controller_1.MailController],
        providers: [mail_service_1.MailService, email_validator_1.CreateUserDto],
        exports: [email_validator_1.CreateUserDto],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map