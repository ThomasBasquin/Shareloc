package main.model;

import java.sql.Blob;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.JoinColumn;

@Entity
@Table(name = "achieved_service")
public class AchievedService {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	@JoinColumn(name = "author", nullable = false)
	private User author;

	@ManyToOne
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	@JoinColumn(name = "beneficiary", nullable = false)
	private User beneficiary;

	@Column(name = "picture")
	private Blob picture;

	@ManyToOne
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	@JoinColumn(name = "service", nullable = false)
	private Service service;

	@Column(name = "creation_date")
	private Date creationDate;

	@JsonSerialize
	@Enumerated(EnumType.STRING)
	@Column(name = "validated")
	private Boolean validated;

	public AchievedService() {
		this.validated = false;
		this.creationDate = new Date();
	}

	public AchievedService(User author, Blob picture, Service service,User user) {
		super();
		this.author = author;
		this.picture = picture;
		this.service = service;
		this.validated = false;
		this.creationDate = new Date();
		this.beneficiary = user;
	}

	public Long getId() {
		return id;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public Blob getPicture() {
		return picture;
	}

	public void setPicture(Blob picture) {
		this.picture = picture;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Boolean isValidated() {
		return validated;
	}

	public void setValidated(Boolean validated) {
		this.validated = validated;
	}

	public User getBeneficiaries() {
		return beneficiary;
	}
}