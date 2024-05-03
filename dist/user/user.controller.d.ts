import { UserService } from './user.service';
import { Token_in_DTO } from './DTO/catch.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { MailService } from 'src/mail/mail.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../mail/email.validator';
export declare class UserController {
    private readonly UserService;
    private readonly UserRepository;
    private readonly authService;
    private readonly mailService;
    private readonly emailValidator;
    constructor(UserService: UserService, UserRepository: UserRepository, authService: AuthService, mailService: MailService, emailValidator: CreateUserDto);
    private sharedVariable;
    getCurrentUser(): string;
    enter(): Promise<Token_in_DTO>;
    signUp(body: any): Promise<{
        id: string;
        email: string;
        name: string;
    } | "비밀번호를 올바르게 입력하세요." | "입력란을 올바르게 기입하세요.">;
    ID_Check(body: any): Promise<Token_in_DTO | "아이디를 입력해주세요." | "해당 아이디는 이미 존재합니다.">;
    Email_Check(body: CreateUserDto): Promise<Token_in_DTO | "해당 이메일은 이미 존재합니다.">;
    Nickname_Check(body: any): Promise<Token_in_DTO | "다른 유저가 이미 해당 닉네임을 사용하고 있습니다." | "닉네임을 입력해주세요.">;
    logIn(body: LoginRequestDto): Promise<{
        token: string;
    }>;
    test(): Promise<string>;
}
