export function seedTestUser() {
    const testUser = {userName: "demo", password : "demo123"};
    localStorage.setItem("testUser", JSON.stringify(testUser));
}