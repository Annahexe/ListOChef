package com.listochef.model;

/**
 * Model that represents the result of an image upload operation.
 *
 * This class contains information returned after uploading an image, including
 * the public URL and the internal storage key.
 */
public class UploadResult {

	private String imageUrl;
	private String imageKey;

	/**
	 * Empty constructor of the UploadResult class.
	 */
	public UploadResult() {
	}

	/**
	 * Parameterized constructor of the UploadResult class.
	 *
	 * @param imageUrl Public URL of the uploaded image.
	 * @param imageKey Internal key or identifier of the stored image.
	 */
	public UploadResult(String imageUrl, String imageKey) {
		this.imageUrl = imageUrl;
		this.imageKey = imageKey;
	}

	/**
	 * Gets the image URL.
	 *
	 * @return Public image URL.
	 */
	public String getImageUrl() {
		return imageUrl;
	}

	/**
	 * Sets the image URL.
	 *
	 * @param imageUrl New image URL.
	 */
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	/**
	 * Gets the image storage key.
	 *
	 * @return Image key.
	 */
	public String getImageKey() {
		return imageKey;
	}

	/**
	 * Sets the image storage key.
	 *
	 * @param imageKey New image key.
	 */
	public void setImageKey(String imageKey) {
		this.imageKey = imageKey;
	}

}