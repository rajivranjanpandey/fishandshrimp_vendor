'use client';
import { useState, ChangeEvent, useEffect, useRef } from "react";
import styles from './modify.module.css';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getVendorProductDetails, updateVendorProductAssets } from "@/app/lib/product/action";
import { Product } from "@/types/product";
import { uploadMediaToCDN } from "@/app/lib/media/action";
import { useRouter } from "next/navigation";

export default function ModifyProduct({ params }: { params: any }) {
    const router = useRouter();
    const { id } = params;
    const [loadingStats, setLoadingStats] = useState<string | null>(null);
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const removedImagesRef = useRef([]);

    const hierarchy = [
        { href: '/', name: 'Dashboard' },
        { href: '/admin/product', name: 'Product' },
        { href: `/admin/product/${id}`, name: 'Modify Product' },

    ]
    useEffect(() => {
        setLoadingStats('Fetching details');
        fetch(`/api/product/${id}`).then(res => res.json()).then(res => {
            setProductDetails(res);
            setImages(res.product_assets);
            setLoadingStats(null);
        });


    }, [])
    const onAddImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setImages((prevImages) => [...prevImages, ...files]);
    };
    const onRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => {
            if (i === index) {
                if (prevImages[i].id)
                    removedImagesRef.current.push(prevImages[i].id);
                return false;
            } else {
                return true;
            }
        }));
    };
    const onSave = async () => {
        const formData = new FormData();
        console.log({ images, removedImagesRef: removedImagesRef.current });
        images.forEach((image) => { if (!image.id) { formData.append('assets', image) } });
        removedImagesRef.current.forEach((assetId) => formData.append('imagesToRemove', assetId));
        try {
            setLoadingStats('Updating assets');
            fetch(`/api/product/${id}`, {
                method: 'POST',
                body: formData,
            }).then(res => res.json()).then(res => {
                console.log('res::::::', res);
                setLoadingStats(null);
                if (Array.isArray(res.message) || (res.message === true)) {
                    removedImagesRef.current = [];
                    alert('Assets updated successdully');
                    router.replace('/admin/product');
                } else {
                    alert('Error while saving assets');
                }
            });
        } catch (e) {
            console.log('error', e);
        }


        // const uploadedImagesPromise = images.map((image, index) => {
        //     const imageFile = image as File;
        //     return uploadMediaToCDN(imageFile);
        // });
        // console.log(uploadedImagesPromise);
        // const uploadedImages: any = await Promise.all(uploadedImagesPromise);
        // console.log({ uploadedImages });
        // updateVendorProductAssets({
        //     productId: id,
        //     assets: uploadedImages.map((asset: { url: string, uploaded: boolean }, index: number) => ({ url: asset.url, position: index + 1 }))
        // });
    };
    console.log({ images });
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Modify Product" hierarchy={hierarchy} />
            <h3>{productDetails?.name}</h3>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div className={styles.upload_store_img}>
                        <input
                            accept="image/*"
                            id={`upload-store-image`}
                            type="file"
                            // ref={ref => this.fileInput = ref}
                            onChange={onAddImage}
                        />
                        <label htmlFor={`upload-store-image`}>
                            <p>
                                Add Image
                            </p>
                        </label>
                    </div>

                    {/* <div>
                            
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Image*
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                multiple
                                onChange={onAddImage}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div> */}
                    <div className="mt-4">
                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image.id ? image.asset_url : URL.createObjectURL(image)}
                                            alt={`Uploaded preview ${index + 1}`}
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => onRemoveImage(index)}
                                            className="absolute top-0 right-0 mt-1 mr-1 text-white bg-red rounded-full p-1 z-10 rounded-full w-25 text-sm/[17px] cursor-pointer"
                                            style={{ zIndex: 10 }}
                                        >x</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-center mt-5">
                        <button
                            type="button"
                            onClick={onSave}
                            // className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 text-center"
                        >
                            {loadingStats || 'Save'}
                        </button>
                    </div>
                </div>
            </div>

        </DefaultLayout>
    );
}