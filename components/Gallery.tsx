"use client";

import { useState } from "react";
import Image from "next/image";
import { ExhibitImage, exhibitImages } from "@/lib/images";

interface GalleryProps {
  onImageSelect?: (image: ExhibitImage) => void;
  selectedImageId?: string | null;
}

export default function Gallery({ onImageSelect, selectedImageId }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ExhibitImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: ExhibitImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleSelectForChat = (image: ExhibitImage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onImageSelect) {
      onImageSelect(image);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-heading text-xl font-semibold text-primary">
          展品图集
        </h2>
        <span className="text-sm text-text-secondary">
          {exhibitImages.length} 件展品
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {exhibitImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative cursor-pointer rounded-lg overflow-hidden bg-surface transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${
                selectedImageId === image.id ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleImageClick(image)}
            >
              {/* Image */}
              <div className="relative aspect-square w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {image.title}
                  </p>
                </div>
              </div>

              {/* Select Button */}
              <button
                onClick={(e) => handleSelectForChat(image, e)}
                className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-md transition-all duration-200 ${
                  selectedImageId === image.id
                    ? "bg-primary text-black font-medium"
                    : "bg-black/50 text-text-primary opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-black"
                }`}
              >
                {selectedImageId === image.id ? "已选中" : "选中"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface/80 text-text-primary hover:bg-primary hover:text-black transition-colors duration-200"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative max-w-4xl max-h-[85vh] mx-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={800}
                className="max-h-[85vh] w-auto h-auto object-contain rounded-lg"
                priority
              />
            </div>

            {/* Info */}
            <div className="mt-4 p-4 bg-surface rounded-lg">
              <h3 className="font-heading text-lg font-semibold text-primary">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="mt-1 text-sm text-text-secondary">
                  {selectedImage.description}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={(e) => {
                  handleSelectForChat(selectedImage, e);
                  closeModal();
                }}
                className="flex-1 px-4 py-2 bg-primary text-black font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
              >
                附加到对话
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
