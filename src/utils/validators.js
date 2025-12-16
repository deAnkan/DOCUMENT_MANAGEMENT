

export function validateSignupBody(body) {
  const { name, email, password, role } = body;
  if (!name || !email || !password) {
    return "name, email and password are required";
  }
  if (password.length < 6) {
    return "password must be at least 6 characters";
  }
  if (role && !["user","hr","accountant"].includes(role)) {
    return "invalid role";
  }
  return null;
}

export function validateSigninBody(body) {
  const { email, password } = body;
  if (!email || !password) return "email and password are required";
  return null;
}