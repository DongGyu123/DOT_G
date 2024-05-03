"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const interceptors_1 = require("../common/interceptors");
const auth_service_1 = require("../auth/auth.service");
const login_request_dto_1 = require("../auth/dto/login.request.dto");
const mail_service_1 = require("../mail/mail.service");
const user_repository_1 = require("./user.repository");
const email_validator_1 = require("../mail/email.validator");
let UserController = class UserController {
    constructor(UserService, UserRepository, authService, mailService, emailValidator) {
        this.UserService = UserService;
        this.UserRepository = UserRepository;
        this.authService = authService;
        this.mailService = mailService;
        this.emailValidator = emailValidator;
        this.sharedVariable = {
            id: "",
            password: ['', ''],
            email: "",
            nickname: "",
        };
    }
    getCurrentUser() {
        return 'current user';
    }
    async enter() {
        this.sharedVariable.id = "";
        this.sharedVariable.password = ["", ""];
        this.sharedVariable.email = "";
        this.sharedVariable.nickname = "";
        return this.sharedVariable;
    }
    async signUp(body) {
        console.log("회원가입", body);
        if (body.password !== body.password_again) {
            return '비밀번호를 올바르게 입력하세요.';
        }
        else if (body.password === '' || body.password_again === '') {
            return '입력란을 올바르게 기입하세요.';
        }
        else {
            this.sharedVariable.password[0] = body.password;
            this.sharedVariable.password[1] = body.password_again;
            if (this.sharedVariable.id && this.sharedVariable.email && this.sharedVariable.nickname && this.sharedVariable.password[0] && this.sharedVariable.password[1]) {
                return this.UserService.signUp({
                    id: this.sharedVariable.id,
                    password: this.sharedVariable.password[0],
                    password_again: this.sharedVariable.password[1],
                    email: this.sharedVariable.email,
                    name: this.sharedVariable.nickname,
                });
            }
            else {
                return '입력란을 올바르게 기입하세요.';
            }
        }
    }
    async ID_Check(body) {
        console.log('input', body);
        if (body.id === "") {
            return '아이디를 입력해주세요.';
        }
        else {
            const find = await this.UserRepository.existsByID(body.id);
            if (find === true) {
                return '해당 아이디는 이미 존재합니다.';
            }
            else {
                this.sharedVariable.id = body.id;
                return this.sharedVariable;
            }
        }
    }
    async Email_Check(body) {
        console.log('email', body);
        const conditionMet = await this.UserRepository.existsByEmail(body.email);
        if (conditionMet === true) {
            return '해당 이메일은 이미 존재합니다.';
        }
        else {
            this.mailService.sendEmail(body.email);
            this.sharedVariable.email = body.email;
            return this.sharedVariable;
        }
    }
    async Nickname_Check(body) {
        console.log('input', body);
        const conditionMet = await this.UserRepository.existsByName(body.nickname);
        if (conditionMet === true) {
            return '다른 유저가 이미 해당 닉네임을 사용하고 있습니다.';
        }
        else if (body.nickname === '') {
            return '닉네임을 입력해주세요.';
        }
        else {
            this.sharedVariable.nickname = body.nickname;
            return this.sharedVariable;
        }
    }
    async logIn(body) {
        console.log('body= ', body);
        return this.authService.jwtLogIn(body);
    }
    async test() {
        return "hello world";
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "enter", null);
__decorate([
    (0, common_1.Post)('signup/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signup/create/ID'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ID_Check", null);
__decorate([
    (0, common_1.Post)('signup/create/email'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_validator_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Email_Check", null);
__decorate([
    (0, common_1.Post)('signup/create/name'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Nickname_Check", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logIn", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "test", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseInterceptors)(interceptors_1.SuccessInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_repository_1.UserRepository,
        auth_service_1.AuthService,
        mail_service_1.MailService,
        email_validator_1.CreateUserDto])
], UserController);
//# sourceMappingURL=user.controller.js.map