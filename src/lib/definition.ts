export interface PredictionResult {
  className: string;
  probability: number;
}

export interface FruitData {
  id: string;
  namaBuah: string;
  manfaat: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginFormState {
  email: string;
  password: string;
}

export interface RegisterFormState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginApiResponse {
  token?: string;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterApiResponse {
  message?: string;
  user?: UserSafeData;
  error?: string;
}

export interface UserSafeData {
  id: string;
  email: string;
  name: string;
}

export interface SaveScanRequestBody {
  userId: string;
  buahId?: string;
  predictedBuahName: string;
  probability: number;
  imageUrl: string;
}

export interface SaveScanApiResponse {
  message: string;
  scan?: {
    id: string;
    userId: string;
    buahId?: string | null;
    predictedBuahName: string;
    probability: number;
    imageUrl: string;
    scannedAt: Date;
  };
  error?: string;
}

export type UserProfileData = UserSafeData;

export interface UpdateProfileRequestBody {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user?: UserProfileData;
  error?: string;
}
