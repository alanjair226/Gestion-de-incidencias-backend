import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GoogleDriveService {
    private drive: any;

    constructor() {
      const CLIENT_ID = process.env.CLIENT_ID
      const CLIENT_SECRET = process.env.CLIENT_SECRET
      const REDIRECT_URI = process.env.REDIRECT_URI
      const REFRESH_TOKEN = process.env.REFRESH_TOKEN

        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        this.drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        });
    }

    async uploadFile(filePath: string, mimeType: string, fileName: string) {
        try {
            const response = await this.drive.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: mimeType,
                    parents:[process.env.FOLDER_INCIDENCE_IMAGE]
                },
                media: {
                    mimeType: mimeType,
                    body: fs.createReadStream(filePath)
                }
            });

            fs.unlink(filePath, (err) => {
              if (err) {
                  console.error("Failed to delete local file", err);
              } else {
                  console.log("Successfully deleted local file");
              }
          });

            console.log(response.data);
            return response.data.id;
        } catch (error) {
            console.error(error.message);
            throw new Error('Failed to upload file to Google Drive');
        }
    }

    async deleteFile(fileId: string) {
        try {
            const response = await this.drive.files.delete({
                fileId: fileId,
            });
            console.log(response.data, response.status);
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw new Error('Failed to delete file from Google Drive');
        }
    }

    async generatePublicUrl(fileId: string) {
        try {
            await this.drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            });

            const result = await this.drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink'
            });

            console.log(result.data);
            return result.data;
        } catch (error) {
            console.error(error.message);
            throw new Error('Failed to generate public URL');
        }
    }
}
