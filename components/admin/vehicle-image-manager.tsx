'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2, Upload, Loader2, GripVertical } from 'lucide-react';

type VehicleImage = {
  id: string;
  imageUrl: string;
  publicId: string | null;
  altText: string | null;
  sortOrder: number;
};

export function VehicleImageManager({ 
  vehicleId, 
  images: initialImages
}: { 
  vehicleId: string; 
  images: VehicleImage[];
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [images, setImages] = useState(initialImages);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      // Upload all files in parallel
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`/api/admin/vehicles/${vehicleId}/images`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        return response.json();
      });

      await Promise.all(uploadPromises);
      router.refresh();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleDrop = async (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    // Update local state immediately for smooth UX
    setImages(newImages);
    setDraggedIndex(null);

    // Update sort order in database
    try {
      const updates = newImages.map((img, idx) => ({
        id: img.id,
        sortOrder: idx,
      }));

      const response = await fetch(`/api/admin/vehicles/${vehicleId}/images/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: updates }),
      });

      if (!response.ok) {
        throw new Error('Failed to reorder images');
      }

      router.refresh();
    } catch (error) {
      console.error('Reorder error:', error);
      alert('Failed to reorder images');
      setImages(initialImages); // Revert on error
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setDeleting(imageId);

    try {
      const response = await fetch(
        `/api/admin/vehicles/${vehicleId}/images?imageId=${imageId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Vehicle Images</h3>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button variant="outline" size="sm" disabled={uploading} asChild>
            <span>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </>
              )}
            </span>
          </Button>
        </label>
      </div>

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-white/10 rounded-lg p-12 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
          <p className="text-zinc-400 mb-2">No images uploaded yet</p>
          <p className="text-sm text-zinc-500">Click "Upload Images" to add photos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              draggable
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className={`relative group bg-zinc-800 rounded-lg overflow-hidden aspect-square cursor-move ${
                draggedIndex === index ? 'opacity-50' : ''
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || 'Vehicle image'}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 p-1 rounded cursor-grab active:cursor-grabbing">
                <GripVertical className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.id)}
                  disabled={deleting === image.id}
                >
                  {deleting === image.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
              {index === 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                  PRIMARY
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
