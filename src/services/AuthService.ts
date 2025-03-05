export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(username: string, password: string): Promise<User> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, accept any non-empty credentials
        if (!username || !password) {
          reject(new Error('Invalid credentials'));
          return;
        }

        const user: User = {
          id: '1',
          username,
          email: `${username}@example.com`,
          role: username.includes('admin') ? 'admin' : 'user'
        };

        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      }, 500);
    });
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  public getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }

    return null;
  }

  public isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export default AuthService; 