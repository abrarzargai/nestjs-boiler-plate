"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireBaseApp = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const auth_1 = require("firebase/auth");
let FireBaseApp = class FireBaseApp {
    admin() {
        return this.AdminApp.auth();
    }
    async deleteUser(uid) {
        (0, auth_1.getAuth)();
        return admin
            .auth()
            .deleteUser(uid)
            .then(() => { return true; })
            .catch((error) => { throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST); });
    }
    async signUp(email, password) {
        (0, auth_1.getAuth)();
        return admin
            .auth()
            .createUser({ email, password })
            .then(async (userCredential) => userCredential)
            .catch((error) => { throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST); });
    }
    async login(email, password) {
        const auth = (0, auth_1.getAuth)();
        return (0, auth_1.signInWithEmailAndPassword)(auth, email, password)
            .then((userCredential) => userCredential)
            .catch((error) => { throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST); });
    }
};
exports.FireBaseApp = FireBaseApp;
exports.FireBaseApp = FireBaseApp = __decorate([
    (0, common_1.Injectable)()
], FireBaseApp);
//# sourceMappingURL=firebase.app.js.map