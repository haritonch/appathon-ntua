package com.example.restservice;

public class ArtObject {
	private final long objectID;
	private final String primaryImageSmall;
	private final String title;
	private final String department;
	private final String artistDisplayName;
	private final String objectURL;
	private final String country;

	public ArtObject() {
		this.objectID = 437549;
		this.primaryImageSmall = "https://images.metmuseum.org/CRDImages/ep/web-large/DP145911.jpg";
		this.title = "Wheat Fields";
		this.department = "European Paintings";
		this.artistDisplayName = "Jacob van Ruisdael";
		this.objectURL = "https://www.metmuseum.org/art/collection/search/437549";
		this.country = "";
	}

	public long getObjectID() {
		return this.objectID;
	}

	public String getPrimaryImageSmall() {
		return this.primaryImageSmall;
	}

	public String getTitle() {
		return this.title;
	}

	public String getDepartment() {
		return this.department;
	}

	public String getArtistDisplayName() {
		return this.artistDisplayName;
	}

	public String getObjectURL() {
		return this.objectURL;
	}

	public String getCountry() {
		return this.country;
	}
}
