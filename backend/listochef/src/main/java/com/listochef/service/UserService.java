package com.listochef.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.listochef.model.UploadResult;
import com.listochef.model.User;
import com.listochef.model.UserIngredient;
import com.listochef.model.UserTicket;
import com.listochef.repository.UserRepository;
import com.mongodb.client.result.UpdateResult;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;
import org.springframework.core.io.ClassPathResource;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JavaMailSender mailSender;
    private final CloudinaryImageStorageService cloudinaryService;

	private final List<String> avatars = List.of(
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983965/1_vlhqym.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983965/2_wlsxdh.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983967/3_ehgpzd.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983967/4_elzyhh.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983968/5_hqkvck.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983969/6_jzifd3.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983970/7_dfnd3q.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983970/8_sjjl3d.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983970/9_y6jtqh.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983970/10_x1jd1r.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983971/11_ip1kwm.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983974/12_zoaoyc.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983974/13_bwb7kt.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983975/14_aerxvk.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983975/15_shefhb.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983978/16_dnl6ph.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983979/17_eklplf.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983980/18_rgs97k.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983982/19_x2bphu.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983983/20_rwjtrp.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983984/21_quvdzq.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983985/22_cpgkxy.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983986/23_qnz1sb.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983988/24_i3f6hs.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983989/25_cptnsj.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983989/26_ra17b0.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983989/27_qsxlpy.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983990/28_fulo9j.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983992/29_jjlikc.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983962/30_n27ufy.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983962/31_ykfdbj.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983962/32_pdzi5q.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983962/33_ahh4ef.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983963/34_mchgq6.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983963/35_qyc3dc.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983964/36_z5q1xl.png",
	        "https://res.cloudinary.com/druphhiyv/image/upload/v1772983965/37_rrkluo.png"	        
);
	
	private final Map<String, String> resetCodes = new HashMap<>();
	
	
	private String getRandomAvatar() {
		int randomIndex = (int) (Math.random() * avatars.size());
		return avatars.get(randomIndex);
	}

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JavaMailSender mailSender,
			CloudinaryImageStorageService cloudinaryService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
        this.cloudinaryService = cloudinaryService;

    }

	// 🔹 Crear usuario
	public void register(User user) {


		if (user.getEmail() != null) {
	        user.setEmail(user.getEmail().toLowerCase().trim());
	    }
		
		if (user.getEmail() == null || user.getEmail().isBlank()) {
			throw new IllegalArgumentException("User email cannot be empty");
		}

		if (user.getPassword() == null || user.getPassword().isBlank()) {
			throw new IllegalArgumentException("User password cannot be empty");
		}

		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new RuntimeException("User already exists");
		}
		
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(hashedPassword);
        
        user.setAvatar(getRandomAvatar());
        
        user.setMyGroceryList(new ArrayList<>());
        
        user.setMyPantryList(new ArrayList<>());

		userRepository.register(user);
	}
	
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public void forgotPassword(String email) {
		System.out.println("forgotPassword llamado con email: " + email);
	    
	    boolean exists = userRepository.findByEmail(email).isPresent();
	    System.out.println("Usuario existe: " + exists);
	    
	    if (!exists) {
	        System.out.println("Usuario no encontrado, saliendo sin enviar email");
	        return;
	    }
	    String codigo = String.format("%06d", new Random().nextInt(999999));
	    resetCodes.put(email, codigo);

	    try {
	        MimeMessage mensaje = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

	        helper.setTo(email);
	        helper.setSubject("ListoChef - Password Recovery");

	        String html = """
	        	    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 10px;">
	        	        <div style="text-align: center; margin-bottom: 24px;">
	        	            <img src="https://res.cloudinary.com/druphhiyv/image/upload/v1777107618/logo_qgbjc3.png" width="80" alt="ListoChef Logo"/>
	        	        </div>
	        	        <p>Hello,</p>
	        	        <p>We have received a request to reset your password on <strong>ListoChef</strong>.</p>
	        	        <p>Here is your verification code:</p>
	        	        <div style="text-align: center; margin: 24px 0;">
	        	            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2e7d32;">%s</span>
	        	        </div>
	        	        <p>Enter it in the app to continue. For security reasons, this code will expire in a few minutes.</p>
	        	        <p>If you did not make this request, you can ignore this message and your password will remain unchanged.</p>
	        	        <br/>
	        	        <p>Thank you,<br/><strong>The ListoChef Team</strong></p>
	        	    </div>
	        	    """.formatted(codigo);

	        helper.setText(html, true);
	        mailSender.send(mensaje);

	    } catch (Exception e) {
	        e.printStackTrace();
	        System.out.println("Error enviando email: " + e.getMessage());
	    }
	}
	
	public void resetPassword(String email, String code, String newPassword) {
        if (!resetCodes.containsKey(email) || !resetCodes.get(email).equals(code)) {
            throw new RuntimeException("Código inválido o expirado");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.setPassword(user);

        resetCodes.remove(email);
    }
	
	
	public void changePassword(String email, String currentPassword, String newPassword) {
	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

	    if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
	        throw new RuntimeException("La contraseña actual no es correcta");
	    }

	    user.setPassword(passwordEncoder.encode(newPassword));
	    userRepository.setPassword(user);
	}
	
	public void editProfile(String email, Map<String, String> body) {
	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

	    if (body.get("name") != null && !body.get("name").isBlank()) {
	        user.setName(body.get("name"));
	    }

	    if (body.get("surname") != null && !body.get("surname").isBlank()) {
	        user.setSurname(body.get("surname"));
	    }

	    if (body.get("newPassword") != null && !body.get("newPassword").isBlank()) {
	        user.setPassword(passwordEncoder.encode(body.get("newPassword")));
	    }

	    userRepository.editProfile(user);
	}
	
	public boolean toggleRecipeSaved(String email, String recipeId) {

	    UpdateResult result = userRepository.deleteFromRecipesSaved(email, recipeId);

	    if (result.getModifiedCount() == 0) {
	    	userRepository.addToRecipesSaved(email, recipeId);
	        return true;
	    }

	    return false;
	}
	
	public void removeFromGroceryList(String email, String ingredientName) {
	    userRepository.removeFromGroceryList(email, ingredientName);
	}
	
	public void updatePantryList(String email, List<UserIngredient> userIngredients) {

	    if (userIngredients == null) {
	        throw new IllegalArgumentException("Lista nula");
	    }

	    // borra ingredientes con cantidad 0
	    userIngredients.removeIf(i -> i.getIngredientAmount() == 0);

	    // Set = libreta de nombres ya vistos
	    Set<String> names = new HashSet<>();

	    for (UserIngredient i : userIngredients) {

	        if (i.getIngredientName() == null || i.getIngredientName().isBlank()) {
	            throw new IllegalArgumentException("Nombre inválido");
	        }

	        if (i.getIngredientAmount() < 0) {
	            throw new IllegalArgumentException("Cantidad inválida");
	        }
	        
	        // si veo uno nuevo → lo anoto, si ya estaba anotado → error
	        if (!names.add(i.getIngredientName().toLowerCase())) {
	            throw new IllegalArgumentException(
	                "Ingrediente duplicado: " + i.getIngredientName()
	            );
	        }
	    }

	    userRepository.updatePantryList(email, userIngredients);
	}	

	public void removeFromPantryList(String email, String ingredientName) {
	    userRepository.removeFromPantryList(email, ingredientName);
	}
	
	public void updateGroceryList(String email, List<UserIngredient> ingredients) {
	    userRepository.updateGroceryList(email, ingredients);
	}
	
	public UserTicket createTicket(String email, UserTicket newTicket, MultipartFile photo) {
		
        // Si tiene foto, la sube
        if (photo != null && !photo.isEmpty()) {
            UploadResult res = cloudinaryService.upload(photo, email);
            newTicket.setTicketPictureUri(res.getImageUrl());
            newTicket.setTicketPicturePublicId(res.getImageKey());
        }
        
        return userRepository.createTicket(email, newTicket);
	}
	
	public void deleteTicket(String email, String ticketId) {
		
	    UserTicket ticket = userRepository.findTicketById(email, ticketId);

	    if (ticket == null) {
	        throw new RuntimeException("Ticket no encontrado");
	    }

	    if (ticket.getTicketPicturePublicId() != null || ticket.getTicketPicturePublicId() != "") {
	        cloudinaryService.deleteImage(ticket.getTicketPicturePublicId());
	    }

	    userRepository.deleteTicket(email, ticketId);
	};
	
	public void deleteUser(String userEmail) {
		
	    User user = userRepository.findByEmail(userEmail)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	    
	    // borrar imágenes de tickets
	    if (user.getMyTicketsList() != null) {
	        for (UserTicket t : user.getMyTicketsList()) {
	            if (t.getTicketPicturePublicId() != null) {
	                cloudinaryService.deleteImage(t.getTicketPicturePublicId());
	            }
	        }
	    }
	    
	    userRepository.deleteUser(user.getId());
	}
	
	public List<User> getUsers() {
	    return userRepository.getUsers();
	}
	
}
