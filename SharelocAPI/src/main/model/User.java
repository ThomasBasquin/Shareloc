package main.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	@Column(name = "email")
	private String email;
	@JsonIgnore
	@Column(name = "password")
	private String password;
	@Column(name = "lastname")
	private String lastname;
	@Column(name = "firstname")
	private String firstname;

	@JsonIgnore
	@ManyToMany(mappedBy = "members")
	private Collocation collocations;

	public User(String email, String password, String lastname, String firstname,Collocation collocation) {
		super();
		this.email = email;
		this.password = password;
		this.lastname = lastname;
		this.firstname = firstname;
		this.collocations = collocation;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore
	@Transient
	public String getPassword() {
		return password;
	}

	@JsonProperty("password")
	public void setPassword(String password) {
		this.password = password;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public Collocation getCollocations() {
		return collocations;
	}
}
