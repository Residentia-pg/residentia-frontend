import API from "../api/api";


/**
 * Login function supporting API integration + temp credentials fallback
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} role - OWNER | ADMIN | CLIENT
 */
export async function frontLogin(email, password, role) {
  if (!email || !password) {
    return { success: false, message: "Email & password required" };
  }

  try {
    // Determine endpoint based on role
    let endpoint = "";
    if (role === "CLIENT") endpoint = "/api/clients/login";
    else if (role === "OWNER") endpoint = "/api/owners/login";
    else if (role === "ADMIN") endpoint = "/api/admin/login"; // Assuming Admin Controller has login

    // Fallback if role not matched (or handle error)
    if (!endpoint) return { success: false, message: "Invalid role specified" };

    const res = await API.post(endpoint, {
      email,
      password,
    });

    // Backend returns the User object directly e.g. { id, name, email, ... }
    // It does not seem to return a 'token' field in current implementation.
    // We will verify if ID exists to confirm success.
    if (res.data && (res.data.id || res.data.ownerId || res.data.adminId)) {
      // Create a mock token or use ID for simple auth if backend doesn't use JWT yet
      // For now, we'll store the whole object.
      const user = res.data;
      const token = "mock-token-" + (user.id || user.ownerId || Date.now());

      const authData = {
        email: user.email,
        role,
        isLoggedIn: true,
        token: token, // Storing mock token to satisfy axios interceptor
        user: {
          id: user.id || user.ownerId,
          name: user.name || user.firstName, // Adjust based on actual User entity
          email: user.email
        },
      };
      localStorage.setItem("pg_auth", JSON.stringify(authData));
      return { success: true, role, data: res.data };
    }

    return { success: false, message: "Invalid credentials" };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred during login"
    };
  }
}

/**
 * Get authenticated user from localStorage
 */
export function getAuthUser() {
  const data = localStorage.getItem("pg_auth");
  return data ? JSON.parse(data) : null;
}

/**
 * Clear auth data and logout user
 */
export function logout() {
  localStorage.removeItem("pg_auth");
  localStorage.removeItem("ownerEmail");
  localStorage.removeItem("ownerToken");
  localStorage.removeItem("ownerId");
}