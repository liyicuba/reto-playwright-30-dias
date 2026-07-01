// Provide a minimal declaration for `process` so TypeScript recognizes it
declare const process: { env: { [key: string]: string | undefined } };

export class Environment {

    static readonly ADMIN_USERNAME = Environment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Environment.getRequired('ADMIN_PASSWORD')
    static readonly EMPLOYEE_USERNAME = Environment.getRequired('EMPLOYEE_USERNAME')
    static readonly EMPLOYEE_PASSWORD = Environment.getRequired('EMPLOYEE_PASSWORD')
    static readonly WRONG_PASSWORD = Environment.getRequired('WRONG_PASSWORD')

    private static getRequired(key: string): string {
        const value = process.env[key]
        if (!value) {
            throw new Error(`Environment variable ${key} does not exist`)
        }
        return value
    }
}