export function login(role) {
    const token = JSON.stringify({ role })
    localStorage.setItem("token", token)
  }
  
  export function logout() {
    localStorage.removeItem("token")
  }
  
  export function getRole() {
    const token = localStorage.getItem("token")
    if (!token) return null
    return JSON.parse(token).role
  }
  