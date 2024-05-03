import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
export declare class ListController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
}
