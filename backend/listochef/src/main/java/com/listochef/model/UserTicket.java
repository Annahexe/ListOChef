package com.listochef.model;

import java.util.Date;

public class UserTicket {

	private String id;
	private String ticketPictureUri;
	private String supermarket;
	private Date ticketDate;
	private int amountProducts;
	private double totalPrice;

	public UserTicket() {
	}

	public UserTicket(String id, String ticketPictureUri, String supermarket, Date ticketDate, int amountProducts,
			int totalPrice) {
		super();
		this.id = id;
		this.ticketPictureUri = ticketPictureUri;
		this.supermarket = supermarket;
		this.ticketDate = ticketDate;
		this.amountProducts = amountProducts;
		this.totalPrice = totalPrice;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTicketPictureUri() {
		return ticketPictureUri;
	}

	public void setTicketPictureUri(String ticketPictureUri) {
		this.ticketPictureUri = ticketPictureUri;
	}

	public String getSupermarket() {
		return supermarket;
	}

	public void setSupermarket(String supermarket) {
		this.supermarket = supermarket;
	}

	public Date getTicketDate() {
		return ticketDate;
	}

	public void setTicketDate(Date ticketDate) {
		this.ticketDate = ticketDate;
	}

	public int getAmountProducts() {
		return amountProducts;
	}

	public void setAmountProducts(int amountProducts) {
		this.amountProducts = amountProducts;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	

}
