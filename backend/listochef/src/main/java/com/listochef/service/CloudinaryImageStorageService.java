package com.listochef.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.listochef.model.UploadResult;

/**
 * Service responsible for managing image storage using Cloudinary.
 *
 * This class handles: - Image upload with validation and transformations -
 * Image deletion from Cloudinary - Security sanitization of user identifiers
 */
@Service
public class CloudinaryImageStorageService {

	private Cloudinary cloudinary;

	/**
	 * Constructor of CloudinaryImageStorageService.
	 *
	 * Initializes the Cloudinary client using configuration properties.
	 *
	 * @param cloudName Cloudinary cloud name.
	 * @param apiKey    Cloudinary API key.
	 * @param apiSecret Cloudinary API secret.
	 * @throws IllegalStateException if any required credential is missing.
	 */
	public CloudinaryImageStorageService(@Value("${cloudinary.cloudName:}") String cloudName,
			@Value("${cloudinary.apiKey:}") String apiKey, @Value("${cloudinary.apiSecret:}") String apiSecret) {

		if (cloudName.isBlank() || apiKey.isBlank() || apiSecret.isBlank()) {
			throw new IllegalStateException("Cloudinary credentials missing");
		}

		this.cloudinary = new Cloudinary(
				ObjectUtils.asMap("cloud_name", cloudName, "api_key", apiKey, "api_secret", apiSecret));
	}

	/**
	 * Uploads an image to Cloudinary.
	 *
	 * This method: - Validates the image file (type, size, emptiness) - Sanitizes
	 * the owner identifier - Generates a unique public ID - Applies automatic image
	 * optimization transformations
	 *
	 * @param file    Image file to upload.
	 * @param ownerId Identifier of the image owner (used in path structure).
	 * @return UploadResult containing the image URL and public ID.
	 * @throws RuntimeException if upload fails.
	 */
	public UploadResult upload(MultipartFile file, String ownerId) {

		validateImage(file);

		try {
			String safeOwner = sanitize(ownerId);
			String publicId = "recipes/" + safeOwner + "/" + UUID.randomUUID();

			Map options = ObjectUtils.asMap("public_id", publicId, "resource_type", "image", "transformation",
					"w_1600,h_1600,c_limit", "quality", "auto:good", "fetch_format", "auto");

			Map<?, ?> res = cloudinary.uploader().upload(file.getBytes(), options);

			String url = (String) res.get("secure_url");
			String key = (String) res.get("public_id");

			return new UploadResult(url, key);

		} catch (Exception e) {
			throw new RuntimeException("Error uploading image to Cloudinary", e);
		}
	}

	/**
	 * Validates an image before uploading it.
	 *
	 * Checks: - File is not empty - File type is allowed (JPEG, PNG, WEBP, HEIC,
	 * HEIF) - File size does not exceed 10MB
	 *
	 * @param file Image file to validate.
	 * @throws IllegalArgumentException if validation fails.
	 */
	private void validateImage(MultipartFile file) {
		if (file == null || file.isEmpty())
			throw new IllegalArgumentException("Empty image");

		String ct = file.getContentType();

		boolean validMime = ct != null && (ct.equals("image/jpeg") || ct.equals("image/jpg") || ct.equals("image/png")
				|| ct.equals("image/webp") || ct.equals("image/heic") || ct.equals("image/heif"));

		if (!validMime) {
			throw new IllegalArgumentException("Unsupported image type: " + ct);
		}

		if (file.getSize() > 25L * 1024 * 1024) {
			throw new IllegalArgumentException("Image too large (>25MB)");
		}
	}

	/**
	 * Sanitizes a string to make it safe for use in file paths or identifiers.
	 *
	 * Replaces invalid characters with underscores.
	 *
	 * @param s Input string (e.g. email).
	 * @return Sanitized string safe for URLs/paths.
	 */
	private String sanitize(String s) {
		if (s == null)
			return "unknown";
		return s.replaceAll("[^a-zA-Z0-9._-]", "_");
	}

	/**
	 * Deletes an image from Cloudinary using its public ID.
	 *
	 * @param publicId Public identifier of the image.
	 * @throws IllegalArgumentException if publicId is invalid.
	 * @throws RuntimeException         if deletion fails.
	 */
	public void deleteImage(String publicId) {

		if (publicId == null || publicId.isBlank()) {
			throw new IllegalArgumentException("Invalid public ID");
		}

		try {
			Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

			String status = (String) result.get("result");

			if (!"ok".equals(status) && !"not found".equals(status)) {
				throw new RuntimeException("Could not delete image: " + status);
			}

		} catch (Exception e) {
			throw new RuntimeException("Error deleting image from Cloudinary", e);
		}
	}
}