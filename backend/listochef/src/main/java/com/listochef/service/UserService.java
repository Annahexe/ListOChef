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

/**
 * Service responsible for managing user-related operations.
 *
 * This class handles:
 * - User registration and profile management
 * - Authentication-related updates (password reset/change)
 * - Grocery and pantry list management
 * - Recipe saved toggling
 * - Ticket creation and deletion
 * - User deletion and cleanup operations
 */
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
			"https://res.cloudinary.com/druphhiyv/image/upload/v1772983965/37_rrkluo.png");

	private final Map<String, String> resetCodes = new HashMap<>();

	private String getRandomAvatar() {
		int randomIndex = (int) (Math.random() * avatars.size());
		return avatars.get(randomIndex);
	}

	/**
	 * Constructor of UserService.
	 *
	 * @param userRepository    Repository for user persistence.
	 * @param passwordEncoder   Encoder used for password hashing and validation.
	 * @param mailSender        Service used to send email notifications.
	 * @param cloudinaryService Service used for image upload and deletion.
	 */
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JavaMailSender mailSender,
			CloudinaryImageStorageService cloudinaryService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.mailSender = mailSender;
		this.cloudinaryService = cloudinaryService;

	}

	/**
	 * Registers a new user in the system.
	 *
	 * This method: - Validates required fields - Normalizes email - Hashes the
	 * password - Assigns a random avatar - Initializes empty lists (grocery and
	 * pantry)
	 *
	 * @param user User object to register.
	 * @throws IllegalArgumentException if required fields are missing.
	 * @throws RuntimeException         if user already exists.
	 */
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

	/**
	 * Retrieves a user by email.
	 *
	 * @param email User email.
	 * @return Optional containing the user if found.
	 */
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	/**
	 * Sends a password recovery email with a verification code.
	 *
	 * This method: - Generates a 6-digit reset code - Stores it temporarily in
	 * memory - Sends an HTML email to the user
	 *
	 * @param email User email requesting password recovery.
	 */
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
					"""
					.formatted(codigo);

			helper.setText(html, true);
			mailSender.send(mensaje);

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error enviando email: " + e.getMessage());
		}
	}

	/**
	 * Resets a user's password using a verification code.
	 *
	 * @param email       User email.
	 * @param code        Verification code sent by email.
	 * @param newPassword New password to set.
	 * @throws RuntimeException if code is invalid or user is not found.
	 */
	public void resetPassword(String email, String code, String newPassword) {
		if (!resetCodes.containsKey(email) || !resetCodes.get(email).equals(code)) {
			throw new RuntimeException("Código inválido o expirado");
		}

		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.setPassword(user);

		resetCodes.remove(email);
	}

	/**
	 * Changes the password for an authenticated user.
	 *
	 * @param email           User email.
	 * @param currentPassword Current password for validation.
	 * @param newPassword     New password to set.
	 */
	public void changePassword(String email, String currentPassword, String newPassword) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

		if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
			throw new RuntimeException("La contraseña actual no es correcta");
		}

		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.setPassword(user);
	}

	/**
	 * Updates user profile information.
	 *
	 * Supports updating: - Name - Surname - Password
	 *
	 * @param email User email.
	 * @param body  Map containing profile fields to update.
	 */
	public void editProfile(String email, Map<String, String> body) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

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

	/**
	 * Toggles a recipe in the user's saved recipes list.
	 *
	 * If the recipe is already saved, it is removed. Otherwise, it is added.
	 *
	 * @param email    User email.
	 * @param recipeId Recipe identifier.
	 * @return true if recipe was added, false if removed.
	 */
	public boolean toggleRecipeSaved(String email, String recipeId) {

		UpdateResult result = userRepository.deleteFromRecipesSaved(email, recipeId);

		if (result.getModifiedCount() == 0) {
			userRepository.addToRecipesSaved(email, recipeId);
			return true;
		}

		return false;
	}

	/**
	 * Removes an ingredient from the user's grocery list.
	 *
	 * @param email          User email.
	 * @param ingredientName Name of the ingredient to remove.
	 */
	public void removeFromGroceryList(String email, String ingredientName) {
		userRepository.removeFromGroceryList(email, ingredientName);
	}

	/**
	 * Updates the user's pantry list.
	 *
	 * This method: - Removes invalid or empty ingredients - Prevents duplicate
	 * ingredient names - Validates ingredient quantities
	 *
	 * @param email           User email.
	 * @param userIngredients List of pantry ingredients.
	 */
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
				throw new IllegalArgumentException("Ingrediente duplicado: " + i.getIngredientName());
			}
		}

		userRepository.updatePantryList(email, userIngredients);
	}

	/**
	 * Removes an ingredient from the pantry list.
	 *
	 * @param email          User email.
	 * @param ingredientName Ingredient name to remove.
	 */
	public void removeFromPantryList(String email, String ingredientName) {
		userRepository.removeFromPantryList(email, ingredientName);
	}

	/**
	 * Updates the user's grocery list.
	 *
	 * @param email       User email.
	 * @param ingredients List of ingredients.
	 */
	public void updateGroceryList(String email, List<UserIngredient> ingredients) {
		userRepository.updateGroceryList(email, ingredients);
	}

	/**
	 * Creates a new purchase ticket.
	 *
	 * This method: - Uploads ticket image if provided - Stores ticket data in
	 * database
	 *
	 * @param email     User email.
	 * @param newTicket Ticket data.
	 * @param photo     Optional image file.
	 * @return Created UserTicket object.
	 */
	public UserTicket createTicket(String email, UserTicket newTicket, MultipartFile photo) {

		// Si tiene foto, la sube
		if (photo != null && !photo.isEmpty()) {
			UploadResult res = cloudinaryService.upload(photo, email);
			newTicket.setTicketPictureUri(res.getImageUrl());
			newTicket.setTicketPicturePublicId(res.getImageKey());
		}

		return userRepository.createTicket(email, newTicket);
	}

	/**
	 * Deletes a user ticket.
	 *
	 * This method: - Finds the ticket - Deletes associated image from Cloudinary
	 * (if exists) - Removes ticket from database
	 *
	 * @param email    User email.
	 * @param ticketId Ticket identifier.
	 * @throws RuntimeException if ticket is not found.
	 */
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

	/**
	 * Deletes a user and all associated data.
	 *
	 * This includes: - User record - All uploaded ticket images
	 *
	 * @param userEmail Email of the user to delete.
	 */
	public void deleteUser(String userEmail) {

		User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));

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

	/**
	 * Retrieves all users in the system.
	 *
	 * @return List of users.
	 */
	public List<User> getUsers() {
		return userRepository.getUsers();
	}

}
