import type { UserModel } from '../models/UserModel';

export class UserFactory {

    private static defaultPassword = 'Password123!';

    private static base(override?: Partial<UserModel>): UserModel {

        const defaults: UserModel = {
            username: 'lina' + crypto.randomUUID().slice(0, 5),
            employeeName: 'Test',
            password: this.defaultPassword,
            confirmPassword: this.defaultPassword,
            role: 'ESS',
            status: 'Enabled',
        };

        return { ...defaults, ...override || {} };
    }

    static createEmployeeESS(override?: Partial<UserModel>): UserModel {
        return this.base({ role: 'ESS', status: 'Enabled', ...override });
    }

    static createAdmin(override?: Partial<UserModel>): UserModel {
        return this.base({ role: 'Admin', status: 'Enabled', ...override });
    }

    static createDisabledAdmin(override?: Partial<UserModel>): UserModel {
        return this.base({ role: 'Admin', status: 'Disabled', ...override });
    }

    static createAdminWrongPassword(override?: Partial<UserModel>): UserModel {
        return this.base({ role: 'Admin', status: 'Enabled', confirmPassword: 'wrongPassword123!', ...override });
    }

}