export interface ApiResponse<T> {
  success: boolean;
  kode: number;
  message: string;
  data: T;
}

export function successResponse<T>(
  message: string,
  data: T,
  kode = 200,
): ApiResponse<T> {
  return {
    success: true,
    kode,
    message,
    data,
  };
}

export function errorResponse<T>(
  message: string,
  data: T,
  kode = 400,
): ApiResponse<T> {
  return {
    success: false,
    kode,
    message,
    data,
  };
}
