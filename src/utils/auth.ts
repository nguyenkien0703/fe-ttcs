export const checkRole = (role: string | undefined, roleTarget: string) => {
    if (role) return role === roleTarget
    return false
}
