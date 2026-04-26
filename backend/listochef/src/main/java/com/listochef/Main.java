package com.listochef;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;


@SpringBootApplication
public class Main {

	 private static final Logger log = LoggerFactory.getLogger(Main.class);

	    @Value("${spring.profiles.active:default}")
	    private String activeProfile;

	    @Value("${jwt.secret}")
	    private String jwtSecret;

	    @Value("${spring.data.mongodb.uri}")
	    private String mongoUri;

	    public static void main(String[] args) {
	        SpringApplication.run(Main.class, args);
	    }
	    
	    @Bean
	    public CommandLineRunner startupInfo(Environment env) {
	        return args -> {
	            log.info("========================================");
	            log.info("🚀 ListOChef iniciado correctamente");
	            log.info("========================================");
	            log.info("📌 Perfil: {}", activeProfile);
	            log.info("🌐 Puerto: {}", env.getProperty("server.port"));
	            log.info("🗄️ MongoDB: OK");
	            log.info("========================================");
	        };
	    }

}

