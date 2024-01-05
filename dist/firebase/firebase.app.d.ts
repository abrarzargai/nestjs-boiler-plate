import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UserCredential } from 'firebase/auth';
export declare class FireBaseApp {
    private AdminApp;
    admin(): import("firebase-admin/lib/auth/auth").Auth;
    deleteUser(uid: string): Promise<boolean>;
    signUp(email: string, password: string): Promise<UserRecord>;
    login(email: string, password: string): Promise<UserCredential>;
}
