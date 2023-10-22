import { RegisterOptions } from "react-hook-form";

class CredentialsModel {
	// public email: string;
	public username: string;
    public password: string;

    // public static emailValidation: RegisterOptions<CredentialsModel, "email"> = {
    //     required: { value: true, message: "Missing email." },
    //     pattern: { value: /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/, message: "Invalid email" }
    // }

    public static passwordValidation: RegisterOptions<CredentialsModel, "password"> = {
        required: { value: true, message: "Missing password." },
        minLength: { value: 4, message: "Password too short" },
        maxLength: { value: 30, message: "Password too long" }
    }
    
    public static usernameValidation: RegisterOptions<CredentialsModel, "username"> = {
        required: { value: true, message: "Missing password." },
        minLength: { value: 1, message: "Password too short" },
        maxLength: { value: 30, message: "Password too long" }
    }
}

export default CredentialsModel;
