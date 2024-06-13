import { uploadMediaToCDN } from "@/app/lib/media/action";
import { deleteVendorProductAssets, getVendorProductDetails, updateVendorProductAssets } from "@/app/lib/product/action";
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const response = await getVendorProductDetails({ id: params.id });
        if (response)
            return NextResponse.json(response, { status: 200 });
        else
            return NextResponse.json(null, { status: 500 });
    } catch (e) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const productId = params.id;
        const sentRequest = await request.formData();
        const assets: File[] = sentRequest.getAll('assets') as File[];
        const uploadedImagesPromise = assets.map((asset: File) => {
            return uploadMediaToCDN(asset);
        });
        const uploadedImages = await Promise.all(uploadedImagesPromise);
        console.log(uploadedImages);
        const payload = {
            productId,
            assets: uploadedImages.map((asset, index) => ({ url: asset[0].url, position: index }))
        }
        const response = await updateVendorProductAssets(payload);
        const imagesToRemove = sentRequest.getAll('imagesToRemove') as [] || [];
        let rmeoveImageResponse = true;
        if (imagesToRemove.length > 0) {
            rmeoveImageResponse = await deleteVendorProductAssets({ productId, assets: imagesToRemove });
        }
        console.log({ rmeoveImageResponse });
        if (response)
            return NextResponse.json(response);
        else
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } catch (e) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}