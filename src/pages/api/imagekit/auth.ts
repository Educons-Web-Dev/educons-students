import { NextApiRequest, NextApiResponse } from 'next';
import ImageKit from 'imagekit';

const imageKit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL!,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const result = imageKit.getAuthenticationParameters();

  return res.send(result);
};

export default handler;
