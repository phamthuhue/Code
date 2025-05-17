import bcryptjs from "bcryptjs";

export const hassPassword = (password = "1234", lenght = 10) => {
    // Hash password
    const salt = bcryptjs.genSaltSync(lenght);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
};
