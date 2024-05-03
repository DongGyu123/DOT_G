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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mail_service_1 = require("../mail/mail.service");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository, mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
    async signUp(body) {
        const { id, password, password_again, email, name } = body;
        const isUserExist = await this.userRepository.existsByEmail(email);
        const isIDExist = await this.userRepository.existsByID(id);
        if (password !== password_again) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다. 다시 비밀번호를 작성해주세요.');
        }
        if (isUserExist) {
            throw new common_1.UnauthorizedException('해당 이메일은 이미 사용중입니다!');
        }
        this.mailService.sendEmail(email);
        console.log('here is eamil: ' + email);
        const hashPassword = await bcrypt.hash(password, 10);
        if (isIDExist) {
            throw new common_1.UnauthorizedException('해당 아이디는 이미 사용중입니다!');
        }
        const user = await this.userRepository.create({
            id,
            password: hashPassword,
            password_again,
            email,
            name,
        });
        console.log('readonlydata', user.readOnlyData);
        return user.readOnlyData;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map