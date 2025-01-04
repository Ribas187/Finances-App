import { S3StorageClient } from "./s3";

export type UploadOptions = {
  contentType: string;
}

export type UploadResult = {
  url: string;
}

export interface StorageClient {
  upload(key: string, body: Blob | Buffer | string, options?: UploadOptions): Promise<UploadResult>;
  delete(key: string): Promise<void>;
}

export const storage = new S3StorageClient();