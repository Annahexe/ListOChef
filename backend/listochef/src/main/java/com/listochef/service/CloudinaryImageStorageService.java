package com.listochef.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.listochef.model.UploadResult;

@Service
public class CloudinaryImageStorageService {

  private Cloudinary cloudinary;

  public CloudinaryImageStorageService(
      @Value("${cloudinary.cloudName:}") String cloudName,
      @Value("${cloudinary.apiKey:}") String apiKey,
      @Value("${cloudinary.apiSecret:}") String apiSecret
  ) {
	 
	  
	  //si cloudName esta vacio no lo inicia
	    if (cloudName.isBlank() || apiKey.isBlank() || apiSecret.isBlank()) {
	        throw new IllegalStateException("Cloudinary credentials missing");
	    }

	    this.cloudinary = new Cloudinary(ObjectUtils.asMap(
	        "cloud_name", cloudName,
	        "api_key", apiKey,
	        "api_secret", apiSecret
	    ));
  }

  public UploadResult upload(MultipartFile file, String ownerId) {
    if (cloudinary == null) {
      throw new IllegalStateException("Cloudinary no configurado");
    }
    //evita archivos vacios,no permitidos, demasiado grandes abajo esta la funcion
    validateImage(file);

    try {
    	//sanitize limpia caractares raros del email para que no rompa las rutas
      String safeOwner = sanitize(ownerId);
      
      // UUID asegura que cada imagen tenga un nombre unico
      String publicId = "recipes/" + safeOwner + "/" + UUID.randomUUID();

      
      //para subir la imagen a cloudinary
      Map<?, ?> res = cloudinary.uploader().upload(
          file.getBytes(),
          ObjectUtils.asMap(
              "public_id", publicId,
              "resource_type", "image"
          )
      );

      String url = (String) res.get("secure_url");
      String key = (String) res.get("public_id");
      return new UploadResult(url, key);

    } catch (Exception e) {
      throw new RuntimeException("Error subiendo imagen a Cloudinary", e);
    }
  }

  private void validateImage(MultipartFile file) {
    if (file == null || file.isEmpty()) throw new IllegalArgumentException("Imagen vacía");
    
    String ct = file.getContentType() == null ? "" : file.getContentType().toLowerCase();
    
    if (!(ct.equals("image/jpeg") || ct.equals("image/png") || ct.equals("image/webp") || ct.equals("image/jpg"))) {
      throw new IllegalArgumentException("Tipo de imagen no permitido: " + ct);
    }
    if (file.getSize() > 5L * 1024 * 1024) {
      throw new IllegalArgumentException("Imagen demasiado grande (>5MB)");
    }
  }

  private String sanitize(String s) {
    if (s == null) return "unknown";
    return s.replaceAll("[^a-zA-Z0-9._-]", "_");
  }
}