package com.listochef;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;


/**
 * Main entry point of the ListOChef Spring Boot application.
 *
 * This class bootstraps the application and logs startup information such as:
 * active profile, server port, and database connection status.
 */
@SpringBootApplication
public class Main {

    private static final Logger log = LoggerFactory.getLogger(Main.class);

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    /**
     * Main method that launches the Spring Boot application.
     *
     * @param args Command-line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    /**
     * Logs application startup information once the context is initialized.
     *
     * This includes:
     * - Active Spring profile
     * - Server port
     * - MongoDB connection status
     *
     * @param env Spring Environment used to read configuration properties.
     * @return CommandLineRunner that executes after startup.
     */
    @Bean
    public CommandLineRunner startupInfo(Environment env) {
        return args -> {
            log.info("========================================");
            log.info("🚀 ListOChef started successfully");
            log.info("========================================");
            log.info("📌 Profile: {}", activeProfile);
            log.info("🌐 Port: {}", env.getProperty("server.port"));
            log.info("🗄️ MongoDB: OK");
            log.info("========================================");
        };
    }
}