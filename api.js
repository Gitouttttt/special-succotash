// Nuvion API Simulation - Authentication Endpoints
// This is a mock API for demonstration purposes

class NuvionAPI {
    constructor() {
        this.baseURL = 'https://api.nuvion.ai'; // Replace with actual API URL
        this.users = new Map(); // In-memory storage for demo
        this.verificationCodes = new Map(); // Store verification codes
    }

    // Simulate API delay
    async delay(ms = 1000) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Generate verification code
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Send verification email (mock)
    async sendVerificationEmail(email, code) {
        console.log(`📧 Sending verification email to ${email} with code: ${code}`);
        
        // In a real application, this would integrate with an email service like:
        // - SendGrid
        // - AWS SES
        // - Mailgun
        // - Nodemailer with SMTP
        
        // Store code for verification
        this.verificationCodes.set(email, {
            code: code,
            timestamp: Date.now(),
            attempts: 0
        });
        
        // Simulate email sending delay
        await this.delay(500);
        
        return {
            success: true,
            message: 'Verification email sent successfully'
        };
    }

    // Verify email code
    async verifyEmailCode(email, code) {
        const storedCode = this.verificationCodes.get(email);
        
        if (!storedCode) {
            return {
                success: false,
                message: 'No verification code found for this email'
            };
        }
        
        // Check if code is expired (10 minutes)
        const isExpired = Date.now() - storedCode.timestamp > 10 * 60 * 1000;
        if (isExpired) {
            this.verificationCodes.delete(email);
            return {
                success: false,
                message: 'Verification code has expired'
            };
        }
        
        // Check attempt limit
        if (storedCode.attempts >= 3) {
            this.verificationCodes.delete(email);
            return {
                success: false,
                message: 'Too many verification attempts'
            };
        }
        
        // Increment attempts
        storedCode.attempts++;
        
        if (storedCode.code !== code) {
            return {
                success: false,
                message: 'Invalid verification code'
            };
        }
        
        // Code is valid, remove it
        this.verificationCodes.delete(email);
        
        return {
            success: true,
            message: 'Email verified successfully'
        };
    }

    // Sign up user
    async signUp(userData) {
        const { name, email, password } = userData;
        
        // Check if user already exists
        if (this.users.has(email)) {
            return {
                success: false,
                message: 'User already exists with this email'
            };
        }
        
        // Validate password strength
        if (password.length < 8) {
            return {
                success: false,
                message: 'Password must be at least 8 characters long'
            };
        }
        
        // Generate verification code
        const verificationCode = this.generateVerificationCode();
        
        // Send verification email
        const emailResult = await this.sendVerificationEmail(email, verificationCode);
        
        if (!emailResult.success) {
            return emailResult;
        }
        
        // Store user data (without password in real app, use hashed password)
        this.users.set(email, {
            id: 'user_' + Date.now(),
            name,
            email,
            password: password, // In real app, store hashed password
            verified: false,
            createdAt: new Date().toISOString()
        });
        
        return {
            success: true,
            message: 'User created successfully. Please verify your email.',
            verificationCode: verificationCode // Only for development
        };
    }

    // Sign in user
    async signIn(email, password) {
        const user = this.users.get(email);
        
        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        
        if (user.password !== password) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        
        if (!user.verified) {
            return {
                success: false,
                message: 'Please verify your email before signing in'
            };
        }
        
        // Generate JWT token (in real app)
        const token = 'jwt_token_' + Date.now();
        
        return {
            success: true,
            message: 'Sign in successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`
            },
            token: token
        };
    }

    // Verify email and activate account
    async verifyEmail(email, code) {
        const verificationResult = await this.verifyEmailCode(email, code);
        
        if (!verificationResult.success) {
            return verificationResult;
        }
        
        // Mark user as verified
        const user = this.users.get(email);
        if (user) {
            user.verified = true;
            user.verifiedAt = new Date().toISOString();
        }
        
        return {
            success: true,
            message: 'Email verified successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`
            }
        };
    }

    // Resend verification code
    async resendVerificationCode(email) {
        const user = this.users.get(email);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        
        if (user.verified) {
            return {
                success: false,
                message: 'Email already verified'
            };
        }
        
        // Generate new verification code
        const verificationCode = this.generateVerificationCode();
        
        // Send verification email
        const emailResult = await this.sendVerificationEmail(email, verificationCode);
        
        return {
            success: emailResult.success,
            message: emailResult.success ? 'Verification code sent successfully' : emailResult.message,
            verificationCode: verificationCode // Only for development
        };
    }

    // Google OAuth callback
    async handleGoogleOAuth(googleUser) {
        const profile = googleUser.getBasicProfile();
        const email = profile.getEmail();
        
        // Check if user exists
        let user = this.users.get(email);
        
        if (!user) {
            // Create new user
            user = {
                id: profile.getId(),
                name: profile.getName(),
                email: email,
                avatar: profile.getImageUrl(),
                provider: 'google',
                verified: true,
                createdAt: new Date().toISOString()
            };
            
            this.users.set(email, user);
        }
        
        // Generate JWT token (in real app)
        const token = 'jwt_token_' + Date.now();
        
        return {
            success: true,
            message: 'Google OAuth successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                provider: 'google'
            },
            token: token
        };
    }

    // Get user profile
    async getUserProfile(userId) {
        // In real app, this would query database with JWT token
        for (let user of this.users.values()) {
            if (user.id === userId) {
                return {
                    success: true,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`,
                        provider: user.provider || 'email',
                        verified: user.verified,
                        createdAt: user.createdAt
                    }
                };
            }
        }
        
        return {
            success: false,
            message: 'User not found'
        };
    }

    // Update user profile
    async updateUserProfile(userId, updates) {
        for (let user of this.users.values()) {
            if (user.id === userId) {
                Object.assign(user, updates);
                user.updatedAt = new Date().toISOString();
                
                return {
                    success: true,
                    message: 'Profile updated successfully',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        provider: user.provider || 'email'
                    }
                };
            }
        }
        
        return {
            success: false,
            message: 'User not found'
        };
    }

    // Delete user account
    async deleteUser(userId) {
        for (let [email, user] of this.users.entries()) {
            if (user.id === userId) {
                this.users.delete(email);
                return {
                    success: true,
                    message: 'Account deleted successfully'
                };
            }
        }
        
        return {
            success: false,
            message: 'User not found'
        };
    }
}

// Create global API instance
window.nuvionAPI = new NuvionAPI();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NuvionAPI;
}