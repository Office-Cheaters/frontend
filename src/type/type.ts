interface answer {
  type: string;
  data: string;
}

interface file {
  extension: string;
  url: string;
}

export interface promptResponse {
  answer: answer | null;
  file: file | null;
  uuid: string;
}

export interface GoogleVerifyResponse {
  is_register: boolean;
  social_token: string;
  access: string;
  refresh: string;
}
