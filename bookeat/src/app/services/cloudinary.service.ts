import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private cloudName = environment.cloudinary.cloudName;
  private uploadPreset = environment.cloudinary.uploadPreset;

  async upload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.secure_url as string;
  }
}
