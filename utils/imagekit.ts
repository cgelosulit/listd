import ImageKit from 'imagekit-javascript';
import { Configs } from '@/constants/Configs';

interface ImageKitConfigOptions {
  urlEndpoint: string;
  publicKey?: string;
  authenticationEndpoint?: string | null;
}

const { urlEndpoint, publicKey, authenticationEndpoint } = Configs.imageKit;

const imagekitConfigOptions: ImageKitConfigOptions = { urlEndpoint };

if (publicKey) {
  imagekitConfigOptions.publicKey = publicKey;
}

if (authenticationEndpoint !== null) {
  imagekitConfigOptions.authenticationEndpoint = authenticationEndpoint;
}

export const imagekit = new ImageKit(imagekitConfigOptions);
