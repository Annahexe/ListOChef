package com.listochef.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.listochef.model.User;
import com.listochef.repository.UserRepository;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JavaMailSender mailSender;
	
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

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

	// 🔹 Crear usuario
	public void register(User user) {


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

		userRepository.register(user);
	}
	
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public void forgotPassword(String email) {
        if (userRepository.findByEmail(email).isEmpty()) return;

        String codigo = String.format("%06d", new Random().nextInt(999999));
        resetCodes.put(email, codigo);

        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(email);
        mensaje.setSubject("ListoChef - Recuperación de contraseña");
        mensaje.setText("Tu código de recuperación es: " + codigo);
        mailSender.send(mensaje);
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
	
	
}
