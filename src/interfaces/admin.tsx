export interface Admin {
  access_token: string;
  refresh_token: string
  user_profile: UserProfile
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  provider: string;
  created_at: string;
  updated_at: string; 
}
