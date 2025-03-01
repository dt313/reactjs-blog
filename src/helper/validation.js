class Validation {
    constructor() {
        this.error = '';
        this.field = '';
    }

    isRequire(errorMsg = 'Vui lòng nhập khung này') {
        if (this.error.trim().length > 0) {
            return this;
        }
        if (this.field.trim() === '') {
            this.error = errorMsg;
        }
        return this;
    }

    isEmail(errorMsg = 'Vui lòng nhập email ở khung này') {
        if (this.error.trim().length > 0) {
            return this;
        }
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(this.field)) {
            this.error = errorMsg;
        }
        return this;
    }

    minLength(min = 8, errorMsg = `Vui lòng nhập khung này lớn hơn ${min} kí tự`) {
        if (this.error.trim().length > 0) {
            return this;
        }

        if (this.field.length <= min) {
            this.error = errorMsg;
        }
        return this;
    }

    maxLength(max = 20, errorMsg = `Vui lòng nhập khung này nhỏ hơn ${max} kí tự`) {
        if (this.error.trim().length > 0) {
            return this;
        }

        if (this.field.length >= max) {
            this.error = errorMsg;
        }
        return this;
    }

    isConfirmPassWord(pwd, cfpwd, errorMsg = 'Mật khẩu không khớp') {
        if (this.error.trim().length > 0) {
            return this;
        }

        if (pwd !== cfpwd) {
            this.error = errorMsg;
        }

        return this;
    }

    isStrongPassword(errorMsg = 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt') {
        if (this.error.trim().length > 0) {
            return this;
        }

        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(this.field)) {
            this.error = errorMsg;
        }
        return this;
    }

    getResult() {
        return this.error;
    }

    init(field) {
        this.field = field;
        return this;
    }

    clear() {
        this.field = '';
        this.error = '';
    }
}

export default Validation;
