package com.listochef.model;

import java.util.Date;

/**
 * Model that represents a user ticket in the system.
 *
 * This class stores information about a supermarket receipt uploaded by the
 * user, including image data, purchase details, and summary information such as
 * total price and number of products.
 */
public class UserTicket {

	private String id;
	private String ticketPictureUri;
	private String ticketPicturePublicId;
	private String supermarket;
	private Date ticketDate;
	private int amountProducts;
	private double totalPrice;

	/**
	 * Empty constructor of the UserTicket class.
	 */
	public UserTicket() {
	}

	/**
	 * Parameterized constructor of the UserTicket class.
	 *
	 * @param id                    Unique identifier of the ticket.
	 * @param ticketPictureUri      URL of the uploaded ticket image.
	 * @param ticketPicturePublicId Public storage identifier of the image.
	 * @param supermarket           Name of the supermarket where the purchase was
	 *                              made.
	 * @param ticketDate            Date of the purchase.
	 * @param amountProducts        Total number of products in the ticket.
	 * @param totalPrice            Total price of the purchase.
	 */
	public UserTicket(String id, String ticketPictureUri, String ticketPicturePublicId, String supermarket,
			Date ticketDate, int amountProducts, int totalPrice) {

		super();
		this.id = id;
		this.ticketPictureUri = ticketPictureUri;
		this.ticketPicturePublicId = ticketPicturePublicId;
		this.supermarket = supermarket;
		this.ticketDate = ticketDate;
		this.amountProducts = amountProducts;
		this.totalPrice = totalPrice;
	}

	/**
	 * Gets the ticket ID.
	 *
	 * @return Ticket ID.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the ticket ID.
	 *
	 * @param id New ticket ID.
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Gets the ticket image URL.
	 *
	 * @return Ticket image URL.
	 */
	public String getTicketPictureUri() {
		return ticketPictureUri;
	}

	/**
	 * Sets the ticket image URL.
	 *
	 * @param ticketPictureUri New image URL.
	 */
	public void setTicketPictureUri(String ticketPictureUri) {
		this.ticketPictureUri = ticketPictureUri;
	}

	/**
	 * Gets the public image identifier.
	 *
	 * @return Public image ID.
	 */
	public String getTicketPicturePublicId() {
		return ticketPicturePublicId;
	}

	/**
	 * Sets the public image identifier.
	 *
	 * @param ticketPicturePublicId New public image ID.
	 */
	public void setTicketPicturePublicId(String ticketPicturePublicId) {
		this.ticketPicturePublicId = ticketPicturePublicId;
	}

	/**
	 * Gets the supermarket name.
	 *
	 * @return Supermarket name.
	 */
	public String getSupermarket() {
		return supermarket;
	}

	/**
	 * Sets the supermarket name.
	 *
	 * @param supermarket New supermarket name.
	 */
	public void setSupermarket(String supermarket) {
		this.supermarket = supermarket;
	}

	/**
	 * Gets the ticket date.
	 *
	 * @return Date of the ticket.
	 */
	public Date getTicketDate() {
		return ticketDate;
	}

	/**
	 * Sets the ticket date.
	 *
	 * @param ticketDate New ticket date.
	 */
	public void setTicketDate(Date ticketDate) {
		this.ticketDate = ticketDate;
	}

	/**
	 * Gets the number of products in the ticket.
	 *
	 * @return Number of products.
	 */
	public int getAmountProducts() {
		return amountProducts;
	}

	/**
	 * Sets the number of products in the ticket.
	 *
	 * @param amountProducts New product count.
	 */
	public void setAmountProducts(int amountProducts) {
		this.amountProducts = amountProducts;
	}

	/**
	 * Gets the total price of the ticket.
	 *
	 * @return Total price.
	 */
	public double getTotalPrice() {
		return totalPrice;
	}

	/**
	 * Sets the total price of the ticket.
	 *
	 * @param totalPrice New total price.
	 */
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

}