package main.controller;

import main.dao.DAOUser;
import main.model.User;

import java.util.List;

public class ControllerUser {
	static DAOUser DAOUser = new DAOUser();

	public static List<User> getUsers() {
		List<User> users = DAOUser.findAll();
		return users;
	}

	public static User getUser(Long id) {
		if (id == null)
			return null;
		return DAOUser.getUser(id);
	}

	public static User login(String login, String password) {
		return DAOUser.login(login, password);
	}

	public static User create(User user) {
		User u = DAOUser.getUserByLogin(user.getEmail());
		if (u == null)
			return DAOUser.create(user);
		return null;
	}

	public static User update(User user) {
		try {
			return DAOUser.update(user);
		} catch (Exception e) {
			return null;
		}
	}

	public static void delete(User user) {
		DAOUser.delete(user);
	}

	public static User updateUserProfile(User user, User modifications) {
		if (modifications.getEmail() != null)
			user.setEmail(modifications.getEmail());
		if (modifications.getPassword() != null)
			user.setPassword(modifications.getPassword());
		if (modifications.getFirstname() != null)
			user.setFirstname(modifications.getFirstname());
		if (modifications.getLastname() != null)
			user.setLastname(modifications.getLastname());
		try {
			return DAOUser.update(user);
		} catch (Exception e) {
			return null;
		}
	}
}
