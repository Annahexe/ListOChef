package com.listochef.model;

/**
 * Model that represents a generic tag in the system.
 *
 * Tags are used to classify and group entities such as recipes, allowing better
 * filtering and organization.
 */
public class Tag {

	private String id;
	private String tag;

	/**
	 * Empty constructor of the Tag class.
	 */
	public Tag() {
	}

	/**
	 * Parameterized constructor of the Tag class.
	 *
	 * @param id  Unique identifier of the tag.
	 * @param tag Name or value of the tag.
	 */
	public Tag(String id, String tag) {
		super();
		this.id = id;
		this.tag = tag;
	}

	/**
	 * Gets the tag ID.
	 *
	 * @return Tag ID.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the tag ID.
	 *
	 * @param id New tag ID.
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Gets the tag value.
	 *
	 * @return Tag value.
	 */
	public String getTag() {
		return tag;
	}

	/**
	 * Sets the tag value.
	 *
	 * @param tag New tag value.
	 */
	public void setTag(String tag) {
		this.tag = tag;
	}

}