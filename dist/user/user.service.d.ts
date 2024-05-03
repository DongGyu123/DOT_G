import { MailService } from '../mail/mail.service';
import { UserRequestDto } from './DTO/catch.request.dto';
import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly mailService;
    constructor(userRepository: UserRepository, mailService: MailService);
    signUp(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
}
