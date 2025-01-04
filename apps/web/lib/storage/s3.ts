import { StorageClient, UploadOptions, UploadResult } from ".";
import { AwsClient } from 'aws4fetch';


export class S3StorageClient implements StorageClient {
  private client: AwsClient;

  constructor() {
    this.client = new AwsClient({
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || '',
      service: 's3',
      region: process.env.STORAGE_REGION || 'auto'
    })
  }

  async upload(key: string, body: string | Blob | Buffer, options?: UploadOptions | undefined): Promise<UploadResult> {
    let uploadBody;
    if (typeof body === "string") {
      if (this.isBase64(body)) {
        uploadBody = this.base64ToArrayBuffer(body, options);
      } else if (this.isUrl(body)) {
        uploadBody = await this.urlToBlob(body, options);
      } else {
        throw new Error("Invalid input: Not a base64 string or a valid URL");
      }
    } else {
      uploadBody = body;
    }

    const headers = {
      "Content-Length": uploadBody.size.toString(),
    };
    if (options?.contentType) headers["Content-Type"] = options.contentType;

    try {
      await this.client.fetch(`${process.env.STORAGE_PUT_ENDPOINT}/${key}`, {
        method: "PUT",
        headers,
        body: uploadBody,
      });

      return {
        url: `${process.env.STORAGE_FETCH_ENDPOINT}/${key}`,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
  async delete(key: string): Promise<void> {
    await this.client.fetch(`${process.env.STORAGE_ENDPOINT}/${key}`, {
      method: "DELETE",
    });
  }


  private base64ToArrayBuffer(base64: string, opts?: UploadOptions) {
    const base64Data = base64.replace(/^data:.+;base64,/, "");
    const paddedBase64Data = base64Data.padEnd(
      base64Data.length + ((4 - (base64Data.length % 4)) % 4),
      "=",
    );

    const binaryString = atob(paddedBase64Data);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blobProps = {};
    if (opts?.contentType) blobProps["type"] = opts.contentType;
    return new Blob([byteArray], blobProps);
  }

  private isBase64(str: string): boolean {
    const regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,([^\s]*)$/;
    return regex.test(str);
  }

  private isUrl(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }

  private async urlToBlob(url: string, opts?: UploadOptions): Promise<Blob> {
    let response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const blob = await response.blob();
    if (opts?.contentType) {
      return new Blob([blob], { type: opts.contentType });
    }
    return blob;
  }
}