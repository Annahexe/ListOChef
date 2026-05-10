package com.listochef.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * MongoDB configuration class for the application.
 *
 * This class is responsible for configuring the connection to MongoDB Atlas,
 * exposing the MongoClient, MongoDatabase, and security-related beans such as
 * the password encoder.
 */
@Configuration
public class MongoConfig {

	@Value("${spring.data.mongodb.uri}")
	private String mongoUri;

	@Value("${spring.data.mongodb.database}")
	private String databaseName;

	/**
	 * Creates and configures the MongoDB client using the connection URI.
	 *
	 * @return MongoClient instance connected to MongoDB Atlas.
	 */
	@Bean
	public MongoClient mongoClient() {
		return MongoClients.create(mongoUri);
	}

	/**
	 * Provides access to the configured MongoDB database.
	 *
	 * @param mongoClient MongoDB client instance.
	 * @return MongoDatabase instance.
	 */
	@Bean
	public MongoDatabase mongoDatabase(MongoClient mongoClient) {
		return mongoClient.getDatabase(databaseName);
	}

	/**
	 * Provides the password encoder used for hashing user passwords.
	 *
	 * BCrypt is used to ensure secure password storage.
	 *
	 * @return PasswordEncoder implementation.
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}