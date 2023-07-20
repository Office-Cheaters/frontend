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
