package com.listochef.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.listochef.model.UploadResult;
import com.listochef.service.CloudinaryImageStorageService;

@RestController
public class ImageController {

  private final CloudinaryImageStorageService cloudinaryService;

  public ImageController(CloudinaryImageStorageService cloudinaryService) {
    this.cloudinaryService = cloudinaryService;
  }

  @PostMapping("/ListOChef/imageUpload")
  public ResponseEntity<UploadResult> upload(
      @RequestParam("image") MultipartFile image,
      @RequestParam("email") String email
  ) {
    UploadResult res = cloudinaryService.upload(image, email);
    return ResponseEntity.ok(res);
  }
}