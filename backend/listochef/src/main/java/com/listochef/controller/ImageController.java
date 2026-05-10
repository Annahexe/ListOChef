package com.listochef.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.listochef.model.UploadResult;
import com.listochef.service.CloudinaryImageStorageService;

/**
 * Controller responsible for handling image uploads in the system.
 *
 * This controller manages the upload of images associated with users or
 * entities, delegating the storage process to an external cloud storage
 * service.
 */
@RestController
public class ImageController {

	private final CloudinaryImageStorageService cloudinaryService;

	/**
	 * Constructor of the ImageController.
	 *
	 * @param cloudinaryService Service responsible for uploading and storing images
	 *                          in the cloud.
	 */
	public ImageController(CloudinaryImageStorageService cloudinaryService) {
		this.cloudinaryService = cloudinaryService;
	}

	/**
	 * Uploads an image to cloud storage.
	 *
	 * Endpoint: POST /ListOChef/imageUpload
	 *
	 * @param image Image file uploaded by the user.
	 * @param email Email of the user associated with the upload.
	 * @return UploadResult containing information about the uploaded image.
	 */
	@PostMapping("/ListOChef/imageUpload")
	public ResponseEntity<UploadResult> upload(@RequestParam("image") MultipartFile image,
			@RequestParam("email") String email) {
		UploadResult res = cloudinaryService.upload(image, email);
		return ResponseEntity.ok(res);
	}
}